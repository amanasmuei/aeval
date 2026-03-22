import { existsSync, readFileSync } from "node:fs";
import { AEVAL_DIR, EVAL_MD_PATH } from "../lib/paths.js";
import { parseEvalMd } from "../lib/parser.js";

export async function doctor(): Promise<void> {
  console.log("");
  console.log("\u25c6 aeval doctor");
  console.log("");

  let issues = 0;

  // Check directory exists
  if (!existsSync(AEVAL_DIR)) {
    console.log("  \u2717 ~/.aeval/ directory not found");
    console.log("    Run: aeval init");
    issues++;
  } else {
    console.log("  \u2713 ~/.aeval/ directory exists");
  }

  // Check eval.md exists
  if (!existsSync(EVAL_MD_PATH)) {
    console.log("  \u2717 eval.md not found");
    console.log("    Run: aeval init");
    issues++;
  } else {
    console.log("  \u2713 eval.md exists");

    // Check eval.md is parseable
    try {
      const content = readFileSync(EVAL_MD_PATH, "utf-8");
      const data = parseEvalMd(content);

      // Check required sections
      if (!content.includes("## Overview")) {
        console.log("  \u2717 Missing ## Overview section");
        issues++;
      } else {
        console.log("  \u2713 Overview section present");
      }

      if (!content.includes("## Timeline")) {
        console.log("  \u2717 Missing ## Timeline section");
        issues++;
      } else {
        console.log("  \u2713 Timeline section present");
      }

      if (!content.includes("## Milestones")) {
        console.log("  \u2717 Missing ## Milestones section");
        issues++;
      } else {
        console.log("  \u2713 Milestones section present");
      }

      if (!content.includes("## Patterns")) {
        console.log("  \u2717 Missing ## Patterns section");
        issues++;
      } else {
        console.log("  \u2713 Patterns section present");
      }

      // Trust level range
      if (data.trustLevel < 1 || data.trustLevel > 5) {
        console.log(`  \u2717 Trust level out of range: ${data.trustLevel}`);
        issues++;
      } else {
        console.log(`  \u2713 Trust level valid: ${data.trustLevel}/5`);
      }

      // Session count
      console.log(`  \u2713 Sessions: ${data.sessions}`);
      console.log(`  \u2713 Timeline entries: ${data.timeline.length}`);
    } catch (err) {
      console.log("  \u2717 eval.md is not parseable");
      console.log(`    ${err instanceof Error ? err.message : String(err)}`);
      issues++;
    }
  }

  console.log("");
  if (issues === 0) {
    console.log("  All checks passed");
  } else {
    console.log(`  ${issues} issue${issues !== 1 ? "s" : ""} found`);
  }
  console.log("");
}
