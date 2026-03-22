import type { EvalData, TimelineEntry } from "./parser.js";

const RATING_STARS: Record<TimelineEntry["rating"], string> = {
  great: "\u2605\u2605\u2605\u2605\u2605",
  good: "\u2605\u2605\u2605\u2605\u2606",
  okay: "\u2605\u2605\u2605\u2606\u2606",
  frustrating: "\u2605\u2605\u2606\u2606\u2606",
};

export function ratingToStars(rating: TimelineEntry["rating"]): string {
  return RATING_STARS[rating];
}

export function generateEvalMd(data: EvalData): string {
  const lines: string[] = [];

  lines.push("# AI Relationship Metrics");
  lines.push("");
  lines.push("## Overview");
  lines.push(`- Sessions: ${data.sessions}`);
  lines.push(
    `- First session: ${data.firstSession === "not started" ? "[not started]" : data.firstSession}`
  );
  lines.push(`- Trust level: ${data.trustLevel}/5`);
  lines.push(`- Trajectory: ${data.trajectory}`);
  lines.push("");
  lines.push("## Timeline");
  lines.push("<!-- Entries added automatically, newest first -->");

  for (const entry of data.timeline) {
    const stars = ratingToStars(entry.rating);
    let line = `- ${entry.date}  ${stars}  ${entry.rating}`;
    if (entry.highlights) {
      line += ` \u2014 ${entry.highlights}`;
    }
    if (entry.improvements) {
      line += ` | ${entry.improvements}`;
    }
    lines.push(line);
  }

  lines.push("");
  lines.push("## Milestones");

  if (data.milestones.length === 0) {
    lines.push(
      "- [none yet \u2014 milestones appear as your relationship grows]"
    );
  } else {
    for (const milestone of data.milestones) {
      lines.push(`- ${milestone}`);
    }
  }

  lines.push("");
  lines.push("## Patterns");

  if (data.patterns.length === 0) {
    lines.push("- [observations about what works and what doesn't]");
  } else {
    for (const pattern of data.patterns) {
      lines.push(`- ${pattern}`);
    }
  }

  lines.push("");

  return lines.join("\n");
}

export function addTimelineEntry(
  content: string,
  entry: TimelineEntry
): string {
  const stars = ratingToStars(entry.rating);
  let line = `- ${entry.date}  ${stars}  ${entry.rating}`;
  if (entry.highlights) {
    line += ` \u2014 ${entry.highlights}`;
  }
  if (entry.improvements) {
    line += ` | ${entry.improvements}`;
  }

  // Insert after the timeline comment
  return content.replace(
    /(<!-- Entries added automatically, newest first -->)/,
    `$1\n${line}`
  );
}

export function addMilestone(content: string, milestone: string): string {
  const placeholder =
    "- [none yet \u2014 milestones appear as your relationship grows]";
  if (content.includes(placeholder)) {
    return content.replace(placeholder, `- ${milestone}`);
  }

  // Add after ## Milestones heading
  return content.replace(/(## Milestones\n)/, `$1- ${milestone}\n`);
}

export function updateOverview(
  content: string,
  sessions: number,
  trust: number,
  trajectory: string
): string {
  let result = content;
  result = result.replace(/- Sessions:\s*\d+/, `- Sessions: ${sessions}`);
  result = result.replace(
    /- Trust level:\s*\d\/5/,
    `- Trust level: ${trust}/5`
  );
  result = result.replace(
    /- Trajectory:\s*.+/,
    `- Trajectory: ${trajectory}`
  );

  // Update first session date if it was "not started"
  if (result.includes("- First session: [not started]") && sessions > 0) {
    const today = new Date().toISOString().split("T")[0];
    result = result.replace(
      /- First session:\s*\[not started\]/,
      `- First session: ${today}`
    );
  }

  return result;
}
