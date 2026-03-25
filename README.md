<div align="center">

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/aeval-evaluation_layer-white?style=for-the-badge&labelColor=0d1117&color=58a6ff">
  <img alt="aeval" src="https://img.shields.io/badge/aeval-evaluation_layer-black?style=for-the-badge&labelColor=f6f8fa&color=24292f">
</picture>

### The portable evaluation layer for AI companions.

Track your AI relationship over time — trust trajectory, session quality, milestones, and patterns. Data-driven relationship improvement in a single file.

<br>

[![npm](https://img.shields.io/npm/v/@aman_asmuei/aeval?style=flat-square&color=cb3837)](https://www.npmjs.com/package/@aman_asmuei/aeval)
[![CI](https://img.shields.io/github/actions/workflow/status/amanasmuei/aeval/ci.yml?style=flat-square&label=tests)](https://github.com/amanasmuei/aeval/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![aman](https://img.shields.io/badge/part_of-aman_ecosystem-ff6b35.svg?style=flat-square)](https://github.com/amanasmuei/aman)

[Quick Start](#quick-start) · [How It Works](#how-it-works) · [Commands](#commands) · [Reports](#relationship-report) · [Ecosystem](#the-ecosystem)

</div>

---

## The Problem

You use AI every day but have no way to track whether the relationship is improving. Is your AI getting better at understanding you? Are frustrating sessions getting less frequent? You have no data.

## The Solution

**aeval** gives you a lightweight relationship tracker. 4 questions per session, 30 seconds, and you get a data-driven view of how your AI partnership is evolving.

```bash
npx @aman_asmuei/aeval init
```

> **No databases. No cloud. Just one markdown file tracking what matters.**

---

## Quick Start

```bash
# Install
npm install -g @aman_asmuei/aeval

# Initialize
aeval init              # Create ~/.aeval/eval.md

# After each session
aeval log               # Log a session (4 quick questions)

# Review
aeval                   # Show current metrics
aeval report            # Full relationship report
aeval milestone "text"  # Record a milestone
aeval doctor            # Health check
```

---

## How It Works

aeval maintains a single markdown file (`~/.aeval/eval.md`) that tracks your AI relationship over time.

### Session Logging

`aeval log` walks you through 4 quick questions:

| # | Question | Options |
|:--|:---------|:--------|
| 1 | How was this session? | great / good / okay / frustrating |
| 2 | What went well? | Free text (optional) |
| 3 | What could improve? | Free text (optional) |
| 4 | Trust change? | increased / same / decreased |

Each log updates your session count, adds a timeline entry, and recalculates trust and trajectory.

### Rating Scale

| Rating | Stars | Description |
|:-------|:------|:------------|
| great | ★★★★★ | Exceeded expectations |
| good | ★★★★☆ | Solid session |
| okay | ★★★☆☆ | Acceptable, room to improve |
| frustrating | ★★☆☆☆ | Needs work |

### Trajectory

Calculated from your recent session ratings:

| Trajectory | Condition |
|:-----------|:----------|
| **building** | Average recent rating >= 3.5 |
| **stable** | Average recent rating >= 2.5 |
| **declining** | Average recent rating < 2.5 |

---

## Relationship Report

```bash
$ aeval report
```

```
◆ aeval — relationship report

  Sessions:    12
  Since:       2026-03-15 (10 days)
  Trust:       4/5
  Trajectory:  building

  Recent sessions:
    2026-03-25  ★★★★★  great — productive debugging, AI caught edge case
    2026-03-24  ★★★★☆  good — solid feature work
    2026-03-23  ★★★☆☆  okay — some misunderstandings on requirements

  Milestones:
    2026-03-22  First time AI proactively suggested a better approach
    2026-03-18  Completed first full feature together

  Patterns:
    - AI works best when given clear requirements upfront
    - Debugging sessions build trust fastest
```

---

## Commands

| Command | What it does |
|:--------|:-------------|
| `aeval` | Show current metrics |
| `aeval init` | Create `~/.aeval/eval.md` |
| `aeval log` | Log a session (interactive) |
| `aeval report` | Full relationship report |
| `aeval milestone "text"` | Record a milestone |
| `aeval doctor` | Health check |

---

## eval.md Format

```markdown
# AI Relationship Metrics

## Overview
- Sessions: 12
- First session: 2026-03-15
- Trust level: 4/5
- Trajectory: building

## Timeline
<!-- Entries added automatically, newest first -->
- 2026-03-25 | great | productive debugging session
- 2026-03-24 | good  | solid feature work

## Milestones
- 2026-03-22: First proactive suggestion from AI
- 2026-03-18: Completed first full feature together

## Patterns
- AI works best with clear requirements upfront
- Debugging sessions build trust fastest
```

---

## Philosophy

| Principle | Why |
|:----------|:----|
| **Single file** | One markdown file, no database, no cloud |
| **Portable** | Works anywhere, version-controllable |
| **Honest** | Track what actually happens, not what you wish happened |
| **Lightweight** | 4 questions per session, done in 30 seconds |

---

## The Ecosystem

```
aman
├── acore      → identity    → who your AI IS
├── amem       → memory      → what your AI KNOWS
├── akit       → tools       → what your AI CAN DO
├── aflow      → workflows   → HOW your AI works
├── arules     → guardrails  → what your AI WON'T do
└── aeval      → evaluation  → how GOOD your AI is  ← YOU ARE HERE
```

| Layer | Package | What it does |
|:------|:--------|:-------------|
| Identity | [acore](https://github.com/amanasmuei/acore) | Personality, values, relationship memory |
| Memory | [amem](https://github.com/amanasmuei/amem) | Automated knowledge storage (MCP) |
| Tools | [akit](https://github.com/amanasmuei/akit) | 15 portable AI tools (MCP + manual fallback) |
| Workflows | [aflow](https://github.com/amanasmuei/aflow) | Reusable AI workflows |
| Guardrails | [arules](https://github.com/amanasmuei/arules) | Safety boundaries and permissions |
| Evaluation | **aeval** | Relationship tracking and session logging |
| **Unified** | **[aman](https://github.com/amanasmuei/aman)** | **One command to set up everything** |

Each works independently. `aman` is the front door.

---

## Contributing

Contributions welcome! Open an issue or submit a PR.

## License

[MIT](LICENSE)

---

<div align="center">

**Track it. Improve it. Data-driven AI partnership.**

</div>
