import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { EVAL_MD_PATH } from "../lib/paths.js";
import { addMilestone } from "../lib/writer.js";

export async function milestone(text: string): Promise<void> {
  if (!existsSync(EVAL_MD_PATH)) {
    console.log("\u25c6 aeval is not initialized. Run: aeval init");
    return;
  }

  if (!text.trim()) {
    console.log("\u25c6 Usage: aeval milestone <text>");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const entry = `${today}  ${text.trim()}`;

  let content = readFileSync(EVAL_MD_PATH, "utf-8");
  content = addMilestone(content, entry);
  writeFileSync(EVAL_MD_PATH, content, "utf-8");

  console.log("");
  console.log("\u25c6 Milestone recorded");
  console.log(`  ${entry}`);
  console.log("");
}
