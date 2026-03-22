import { describe, it, expect } from "vitest";
import {
  generateEvalMd,
  addTimelineEntry,
  addMilestone,
  updateOverview,
  ratingToStars,
} from "../src/lib/writer.js";
import { parseEvalMd, type EvalData, type TimelineEntry } from "../src/lib/parser.js";

describe("ratingToStars", () => {
  it("returns correct stars for each rating", () => {
    expect(ratingToStars("great")).toBe("\u2605\u2605\u2605\u2605\u2605");
    expect(ratingToStars("good")).toBe("\u2605\u2605\u2605\u2605\u2606");
    expect(ratingToStars("okay")).toBe("\u2605\u2605\u2605\u2606\u2606");
    expect(ratingToStars("frustrating")).toBe("\u2605\u2605\u2606\u2606\u2606");
  });
});

describe("generateEvalMd", () => {
  it("generates valid markdown from empty data", () => {
    const data: EvalData = {
      sessions: 0,
      firstSession: "not started",
      trustLevel: 3,
      trajectory: "building",
      timeline: [],
      milestones: [],
      patterns: [],
    };

    const md = generateEvalMd(data);
    expect(md).toContain("# AI Relationship Metrics");
    expect(md).toContain("- Sessions: 0");
    expect(md).toContain("- First session: [not started]");
    expect(md).toContain("- Trust level: 3/5");
    expect(md).toContain("[none yet");
  });

  it("generates valid markdown with populated data", () => {
    const data: EvalData = {
      sessions: 3,
      firstSession: "2026-03-20",
      trustLevel: 4,
      trajectory: "building",
      timeline: [
        {
          date: "2026-03-22",
          rating: "great",
          highlights: "good session",
          improvements: "",
        },
      ],
      milestones: ["2026-03-22  First milestone"],
      patterns: ["AI works well with clear instructions"],
    };

    const md = generateEvalMd(data);
    expect(md).toContain("- Sessions: 3");
    expect(md).toContain("- First session: 2026-03-20");
    expect(md).toContain("great");
    expect(md).toContain("First milestone");
    expect(md).toContain("AI works well with clear instructions");
  });

  it("round-trips through parse and generate", () => {
    const data: EvalData = {
      sessions: 5,
      firstSession: "2026-03-15",
      trustLevel: 4,
      trajectory: "building",
      timeline: [
        {
          date: "2026-03-22",
          rating: "great",
          highlights: "productive debugging",
          improvements: "",
        },
        {
          date: "2026-03-21",
          rating: "good",
          highlights: "solid work",
          improvements: "",
        },
      ],
      milestones: ["2026-03-22  First proactive suggestion"],
      patterns: ["Debugging builds trust"],
    };

    const md = generateEvalMd(data);
    const parsed = parseEvalMd(md);

    expect(parsed.sessions).toBe(data.sessions);
    expect(parsed.firstSession).toBe(data.firstSession);
    expect(parsed.trustLevel).toBe(data.trustLevel);
    expect(parsed.trajectory).toBe(data.trajectory);
    expect(parsed.timeline).toHaveLength(2);
    expect(parsed.milestones).toHaveLength(1);
    expect(parsed.patterns).toHaveLength(1);
  });
});

describe("addTimelineEntry", () => {
  it("inserts entry after comment marker", () => {
    const content = `## Timeline
<!-- Entries added automatically, newest first -->

## Milestones`;

    const entry: TimelineEntry = {
      date: "2026-03-22",
      rating: "great",
      highlights: "good session",
      improvements: "",
    };

    const result = addTimelineEntry(content, entry);
    expect(result).toContain("2026-03-22");
    expect(result).toContain("great");
    expect(result).toContain("good session");
  });

  it("includes improvements when present", () => {
    const content = `## Timeline
<!-- Entries added automatically, newest first -->`;

    const entry: TimelineEntry = {
      date: "2026-03-22",
      rating: "okay",
      highlights: "some good parts",
      improvements: "needs improvement",
    };

    const result = addTimelineEntry(content, entry);
    expect(result).toContain("some good parts");
    expect(result).toContain("needs improvement");
  });
});

describe("addMilestone", () => {
  it("replaces placeholder on first milestone", () => {
    const content = `## Milestones
- [none yet \u2014 milestones appear as your relationship grows]`;

    const result = addMilestone(content, "2026-03-22  First milestone");
    expect(result).toContain("2026-03-22  First milestone");
    expect(result).not.toContain("[none yet");
  });

  it("prepends to existing milestones", () => {
    const content = `## Milestones
- 2026-03-20  Existing milestone`;

    const result = addMilestone(content, "2026-03-22  New milestone");
    expect(result).toContain("New milestone");
    expect(result).toContain("Existing milestone");
  });
});

describe("updateOverview", () => {
  it("updates session count and trust", () => {
    const content = `## Overview
- Sessions: 0
- First session: [not started]
- Trust level: 3/5
- Trajectory: building`;

    const result = updateOverview(content, 1, 4, "building");
    expect(result).toContain("- Sessions: 1");
    expect(result).toContain("- Trust level: 4/5");
  });

  it("updates first session date when not started", () => {
    const content = `## Overview
- Sessions: 0
- First session: [not started]
- Trust level: 3/5
- Trajectory: building`;

    const result = updateOverview(content, 1, 3, "building");
    expect(result).not.toContain("[not started]");
    expect(result).toMatch(/- First session: \d{4}-\d{2}-\d{2}/);
  });
});
