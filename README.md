# aeval

The portable evaluation layer for AI companions. Track relationship quality over time — trust trajectory, session count, key milestones, and satisfaction signals. Data-driven relationship improvement.

## Ecosystem

```
aman
├── acore   →  identity
├── amem    →  memory
├── akit    →  tools
├── aflow   →  workflows
├── arules  →  guardrails
└── aeval   →  evaluation  ← you are here
```

## Install

```bash
npm install -g @aman_asmuei/aeval
```

## Quick start

```bash
aeval init              # Create ~/.aeval/eval.md
aeval log               # Log a session (interactive)
aeval                   # Show current metrics
aeval report            # Full relationship report
aeval milestone "text"  # Record a milestone
aeval doctor            # Health check
```

## How it works

aeval maintains a single markdown file (`~/.aeval/eval.md`) that tracks your AI relationship over time.

### eval.md format

```markdown
# AI Relationship Metrics

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
```

### Logging sessions

`aeval log` walks you through 4 quick questions:

1. **How was this session?** — great / good / okay / frustrating
2. **What went well?** — optional text
3. **What could improve?** — optional text
4. **Trust change?** — increased / same / decreased

Each log updates your session count, adds a timeline entry, and recalculates trust and trajectory.

### Relationship report

`aeval report` shows a summary of your AI relationship:

```
◆ aeval — relationship report

  Sessions:    12
  Since:       2026-03-15 (7 days)
  Trust:       4/5
  Trajectory:  building

  Recent sessions:
    2026-03-22  ★★★★★  great — productive debugging, AI caught edge case
    2026-03-21  ★★★★☆  good — solid feature work
    2026-03-20  ★★★☆☆  okay — some misunderstandings on requirements

  Milestones:
    2026-03-22  First time AI proactively suggested a better approach
    2026-03-18  Completed first full feature together

  Patterns:
    - AI works best when given clear requirements upfront
    - Debugging sessions build trust fastest
```

### Rating scale

| Rating      | Stars   |
|-------------|---------|
| great       | ★★★★★  |
| good        | ★★★★☆  |
| okay        | ★★★☆☆  |
| frustrating | ★★☆☆☆  |

### Trajectory

Trajectory is calculated from your recent session ratings:
- **building** — average recent rating >= 3.5
- **stable** — average recent rating >= 2.5
- **declining** — average recent rating < 2.5

## Philosophy

- **Single file** — one markdown file, no database, no cloud
- **Portable** — works anywhere, version-controllable
- **Honest** — track what actually happens, not what you wish happened
- **Lightweight** — 4 questions per session, done in 30 seconds

## License

MIT
