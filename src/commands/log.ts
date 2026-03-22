import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { select, input } from "@inquirer/prompts";
import { EVAL_MD_PATH } from "../lib/paths.js";
import { parseEvalMd, type TimelineEntry } from "../lib/parser.js";
import { addTimelineEntry, updateOverview } from "../lib/writer.js";

export async function log(): Promise<void> {
  if (!existsSync(EVAL_MD_PATH)) {
    console.log("\u25c6 aeval is not initialized. Run: aeval init");
    return;
  }

  console.log("");
  console.log("\u25c6 aeval \u2014 log session");
  console.log("");

  const rating = await select<TimelineEntry["rating"]>({
    message: "How was this session?",
    choices: [
      { name: "great", value: "great" },
      { name: "good", value: "good" },
      { name: "okay", value: "okay" },
      { name: "frustrating", value: "frustrating" },
    ],
  });

  const highlights = await input({
    message: "What went well? (optional)",
  });

  const improvements = await input({
    message: "What could improve? (optional)",
  });

  const trustChange = await select<"increased" | "same" | "decreased">({
    message: "Trust change?",
    choices: [
      { name: "increased", value: "increased" },
      { name: "same", value: "same" },
      { name: "decreased", value: "decreased" },
    ],
  });

  let content = readFileSync(EVAL_MD_PATH, "utf-8");
  const data = parseEvalMd(content);

  const today = new Date().toISOString().split("T")[0];
  const entry: TimelineEntry = {
    date: today,
    rating,
    highlights: highlights.trim(),
    improvements: improvements.trim(),
  };

  // Update content
  content = addTimelineEntry(content, entry);

  // Calculate new trust level
  let newTrust = data.trustLevel;
  if (trustChange === "increased" && newTrust < 5) newTrust++;
  if (trustChange === "decreased" && newTrust > 1) newTrust--;

  // Determine trajectory from recent ratings
  const recentRatings = [rating, ...data.timeline.slice(0, 2).map((t) => t.rating)];
  const trajectory = computeTrajectory(recentRatings);

  content = updateOverview(content, data.sessions + 1, newTrust, trajectory);

  writeFileSync(EVAL_MD_PATH, content, "utf-8");

  console.log("");
  console.log("\u25c6 Session logged");
  console.log(`  Sessions: ${data.sessions + 1} | Trust: ${newTrust}/5 | Trajectory: ${trajectory}`);
  console.log("");
}

function computeTrajectory(ratings: string[]): string {
  const score: Record<string, number> = {
    great: 4,
    good: 3,
    okay: 2,
    frustrating: 1,
  };

  if (ratings.length < 2) return "building";

  const recent = ratings.slice(0, 3).map((r) => score[r] || 2);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;

  if (avg >= 3.5) return "building";
  if (avg >= 2.5) return "stable";
  return "declining";
}
