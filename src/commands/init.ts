import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AEVAL_DIR, EVAL_MD_PATH } from "../lib/paths.js";

export async function init(): Promise<void> {
  if (existsSync(EVAL_MD_PATH)) {
    console.log("\u25c6 aeval is already initialized");
    console.log(`  ${EVAL_MD_PATH}`);
    return;
  }

  mkdirSync(AEVAL_DIR, { recursive: true });

  // Try to read the template from the package
  let template: string;
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const templatePath = join(__dirname, "..", "..", "template", "eval-starter.md");
    template = readFileSync(templatePath, "utf-8");
  } catch {
    // Fallback inline template
    template = [
      "# AI Relationship Metrics",
      "",
      "## Overview",
      "- Sessions: 0",
      "- First session: [not started]",
      "- Trust level: 3/5",
      "- Trajectory: building",
      "",
      "## Timeline",
      "<!-- Entries added automatically, newest first -->",
      "",
      "## Milestones",
      "- [none yet \u2014 milestones appear as your relationship grows]",
      "",
      "## Patterns",
      "- [observations about what works and what doesn't]",
      "",
    ].join("\n");
  }

  writeFileSync(EVAL_MD_PATH, template, "utf-8");
  console.log("\u25c6 aeval initialized");
  console.log(`  Created ${EVAL_MD_PATH}`);
}
