export interface TimelineEntry {
  date: string;
  rating: "great" | "good" | "okay" | "frustrating";
  highlights: string;
  improvements: string;
}

export interface EvalData {
  sessions: number;
  firstSession: string;
  trustLevel: number;
  trajectory: string;
  timeline: TimelineEntry[];
  milestones: string[];
  patterns: string[];
}

const RATING_VALUES = ["great", "good", "okay", "frustrating"] as const;

function isRating(value: string): value is TimelineEntry["rating"] {
  return (RATING_VALUES as readonly string[]).includes(value);
}

export function parseEvalMd(content: string): EvalData {
  const data: EvalData = {
    sessions: 0,
    firstSession: "not started",
    trustLevel: 3,
    trajectory: "building",
    timeline: [],
    milestones: [],
    patterns: [],
  };

  // Parse Overview section
  const sessionsMatch = content.match(/- Sessions:\s*(\d+)/);
  if (sessionsMatch) data.sessions = parseInt(sessionsMatch[1], 10);

  const firstSessionMatch = content.match(/- First session:\s*(.+)/);
  if (firstSessionMatch) {
    const val = firstSessionMatch[1].trim();
    data.firstSession = val.startsWith("[") ? "not started" : val;
  }

  const trustMatch = content.match(/- Trust level:\s*(\d)\/5/);
  if (trustMatch) data.trustLevel = parseInt(trustMatch[1], 10);

  const trajectoryMatch = content.match(/- Trajectory:\s*(.+)/);
  if (trajectoryMatch) data.trajectory = trajectoryMatch[1].trim();

  // Parse Timeline section
  const timelineSection = content.match(
    /## Timeline\n([\s\S]*?)(?=\n## |\n$|$)/
  );
  if (timelineSection) {
    const lines = timelineSection[1].split("\n").filter((l) => l.startsWith("- "));
    for (const line of lines) {
      // Format: - YYYY-MM-DD  ★★★★★  rating — highlights | improvements
      const entryMatch = line.match(
        /- (\d{4}-\d{2}-\d{2})\s+[★☆]+\s+(\w+)(?:\s*—\s*(.*))?/
      );
      if (entryMatch) {
        const rating = entryMatch[2];
        if (!isRating(rating)) continue;

        const rest = entryMatch[3] || "";
        const parts = rest.split("|").map((s) => s.trim());

        data.timeline.push({
          date: entryMatch[1],
          rating,
          highlights: parts[0] || "",
          improvements: parts[1] || "",
        });
      }
    }
  }

  // Parse Milestones section
  const milestonesSection = content.match(
    /## Milestones\n([\s\S]*?)(?=\n## |\n$|$)/
  );
  if (milestonesSection) {
    const lines = milestonesSection[1]
      .split("\n")
      .filter((l) => l.startsWith("- "));
    for (const line of lines) {
      const text = line.replace(/^- /, "").trim();
      if (!text.startsWith("[none")) {
        data.milestones.push(text);
      }
    }
  }

  // Parse Patterns section
  const patternsSection = content.match(
    /## Patterns\n([\s\S]*?)(?=\n## |\n$|$)/
  );
  if (patternsSection) {
    const lines = patternsSection[1]
      .split("\n")
      .filter((l) => l.startsWith("- "));
    for (const line of lines) {
      const text = line.replace(/^- /, "").trim();
      if (!text.startsWith("[observations")) {
        data.patterns.push(text);
      }
    }
  }

  return data;
}
