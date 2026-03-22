import { init } from "./commands/init.js";
import { show } from "./commands/show.js";
import { log } from "./commands/log.js";
import { report } from "./commands/report.js";
import { milestone } from "./commands/milestone.js";
import { doctor } from "./commands/doctor.js";

const args = process.argv.slice(2);
const command = args[0] || "";

async function main(): Promise<void> {
  switch (command) {
    case "init":
      await init();
      break;
    case "log":
      await log();
      break;
    case "report":
      await report();
      break;
    case "milestone":
      await milestone(args.slice(1).join(" "));
      break;
    case "doctor":
      await doctor();
      break;
    case "":
    case "show":
      await show();
      break;
    case "--help":
    case "-h":
      printHelp();
      break;
    case "--version":
    case "-v":
      console.log("0.1.0");
      break;
    default:
      console.log(`Unknown command: ${command}`);
      printHelp();
      process.exitCode = 1;
  }
}

function printHelp(): void {
  console.log("");
  console.log("\u25c6 aeval \u2014 the portable evaluation layer for AI companions");
  console.log("");
  console.log("  Usage: aeval [command]");
  console.log("");
  console.log("  Commands:");
  console.log("    (default)        Show current metrics");
  console.log("    init             Create ~/.aeval/eval.md");
  console.log("    log              Log a session (interactive)");
  console.log("    report           Show relationship report");
  console.log("    milestone <text> Record a milestone");
  console.log("    doctor           Health check");
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

export { parseEvalMd } from "./lib/parser.js";
export type { EvalData, TimelineEntry } from "./lib/parser.js";
export { generateEvalMd, addTimelineEntry, addMilestone, updateOverview, ratingToStars } from "./lib/writer.js";
export { AEVAL_DIR, EVAL_MD_PATH } from "./lib/paths.js";
