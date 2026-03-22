import { describe, it, expect } from "vitest";
import { parseEvalMd } from "../src/lib/parser.js";

const STARTER_TEMPLATE = `# AI Relationship Metrics

## Overview
- Sessions: 0
- First session: [not started]
- Trust level: 3/5
- Trajectory: building

## Timeline
<!-- Entries added automatically, newest first -->

## Milestones
- [none yet — milestones appear as your relationship grows]

## Patterns
- [observations about what works and what doesn't]
`;

const POPULATED_TEMPLATE = `# AI Relationship Metrics

## Overview
- Sessions: 5
- First session: 2026-03-15
- Trust level: 4/5
- Trajectory: building

## Timeline
<!-- Entries added automatically, newest first -->
- 2026-03-22  ★★★★★  great — productive debugging, AI caught edge case
- 2026-03-21  ★★★★☆  good — solid feature work
- 2026-03-20  ★★★☆☆  okay — some misunderstandings | need clearer requirements

## Milestones
- 2026-03-22  First time AI proactively suggested a better approach
- 2026-03-18  Completed first full feature together

## Patterns
- AI works best when given clear requirements upfront
- Debugging sessions build trust fastest
`;

describe("parseEvalMd", () => {
  it("parses starter template with defaults", () => {
    const data = parseEvalMd(STARTER_TEMPLATE);
    expect(data.sessions).toBe(0);
    expect(data.firstSession).toBe("not started");
    expect(data.trustLevel).toBe(3);
    expect(data.trajectory).toBe("building");
    expect(data.timeline).toEqual([]);
    expect(data.milestones).toEqual([]);
    expect(data.patterns).toEqual([]);
  });

  it("parses populated template", () => {
    const data = parseEvalMd(POPULATED_TEMPLATE);
    expect(data.sessions).toBe(5);
    expect(data.firstSession).toBe("2026-03-15");
    expect(data.trustLevel).toBe(4);
    expect(data.trajectory).toBe("building");
  });

  it("parses timeline entries", () => {
    const data = parseEvalMd(POPULATED_TEMPLATE);
    expect(data.timeline).toHaveLength(3);

    expect(data.timeline[0]).toEqual({
      date: "2026-03-22",
      rating: "great",
      highlights: "productive debugging, AI caught edge case",
      improvements: "",
    });

    expect(data.timeline[2]).toEqual({
      date: "2026-03-20",
      rating: "okay",
      highlights: "some misunderstandings",
      improvements: "need clearer requirements",
    });
  });

  it("parses milestones", () => {
    const data = parseEvalMd(POPULATED_TEMPLATE);
    expect(data.milestones).toHaveLength(2);
    expect(data.milestones[0]).toContain("First time AI proactively");
  });

  it("parses patterns", () => {
    const data = parseEvalMd(POPULATED_TEMPLATE);
    expect(data.patterns).toHaveLength(2);
    expect(data.patterns[0]).toBe(
      "AI works best when given clear requirements upfront"
    );
  });

  it("handles empty content gracefully", () => {
    const data = parseEvalMd("");
    expect(data.sessions).toBe(0);
    expect(data.firstSession).toBe("not started");
    expect(data.trustLevel).toBe(3);
    expect(data.trajectory).toBe("building");
    expect(data.timeline).toEqual([]);
  });
});
