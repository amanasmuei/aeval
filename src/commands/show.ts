import { existsSync, readFileSync } from "node:fs";
import { EVAL_MD_PATH } from "../lib/paths.js";
import { parseEvalMd } from "../lib/parser.js";
import { ratingToStars } from "../lib/writer.js";

export async function show(): Promise<void> {
  if (!existsSync(EVAL_MD_PATH)) {
    console.log("\u25c6 aeval is not initialized. Run: aeval init");
    return;
  }

  const content = readFileSync(EVAL_MD_PATH, "utf-8");
  const data = parseEvalMd(content);

  console.log("");
  console.log("\u25c6 aeval \u2014 relationship metrics");
  console.log("");
  console.log(`  Sessions:    ${data.sessions}`);
  console.log(`  First:       ${data.firstSession}`);
  console.log(`  Trust:       ${data.trustLevel}/5`);
  console.log(`  Trajectory:  ${data.trajectory}`);

  if (data.timeline.length > 0) {
    console.log("");
    console.log("  Recent:");
    const recent = data.timeline.slice(0, 3);
    for (const entry of recent) {
      const stars = ratingToStars(entry.rating);
      const note = entry.highlights ? ` \u2014 ${entry.highlights}` : "";
      console.log(`    ${entry.date}  ${stars}  ${entry.rating}${note}`);
    }
  }

  if (data.milestones.length > 0) {
    console.log("");
    console.log("  Milestones:");
    for (const m of data.milestones.slice(0, 5)) {
      console.log(`    ${m}`);
    }
  }

  console.log("");
}
