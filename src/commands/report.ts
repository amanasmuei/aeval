import { existsSync, readFileSync } from "node:fs";
import { EVAL_MD_PATH } from "../lib/paths.js";
import { parseEvalMd } from "../lib/parser.js";
import { ratingToStars } from "../lib/writer.js";

export async function report(): Promise<void> {
  if (!existsSync(EVAL_MD_PATH)) {
    console.log("\u25c6 aeval is not initialized. Run: aeval init");
    return;
  }

  const content = readFileSync(EVAL_MD_PATH, "utf-8");
  const data = parseEvalMd(content);

  console.log("");
  console.log("\u25c6 aeval \u2014 relationship report");
  console.log("");

  // Calculate days since first session
  let sinceStr = "";
  if (data.firstSession !== "not started") {
    const first = new Date(data.firstSession);
    const now = new Date();
    const days = Math.floor(
      (now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)
    );
    sinceStr = ` (${days} day${days !== 1 ? "s" : ""})`;
  }

  console.log(`  Sessions:    ${data.sessions}`);
  if (data.firstSession !== "not started") {
    console.log(`  Since:       ${data.firstSession}${sinceStr}`);
  }
  console.log(`  Trust:       ${data.trustLevel}/5`);
  console.log(`  Trajectory:  ${data.trajectory}`);

  if (data.timeline.length > 0) {
    console.log("");
    console.log("  Recent sessions:");
    const recent = data.timeline.slice(0, 5);
    for (const entry of recent) {
      const stars = ratingToStars(entry.rating);
      const note = entry.highlights ? ` \u2014 ${entry.highlights}` : "";
      console.log(`    ${entry.date}  ${stars}  ${entry.rating}${note}`);
    }
  }

  if (data.milestones.length > 0) {
    console.log("");
    console.log("  Milestones:");
    for (const m of data.milestones) {
      console.log(`    ${m}`);
    }
  }

  if (data.patterns.length > 0) {
    console.log("");
    console.log("  Patterns:");
    for (const p of data.patterns) {
      console.log(`    - ${p}`);
    }
  }

  if (data.sessions === 0) {
    console.log("");
    console.log("  No sessions logged yet. Run: aeval log");
  }

  console.log("");
}
