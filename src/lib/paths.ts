import { homedir } from "node:os";
import { join } from "node:path";

export const AEVAL_DIR = join(homedir(), ".aeval");
export const EVAL_MD_PATH = join(AEVAL_DIR, "eval.md");
