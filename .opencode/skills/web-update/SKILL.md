---
name: web-update
description: Analyze, upgrade, and innovate vanilla HTML/CSS/JS websites. Audit performa & interaktivitas, upgrade fitur interaktif & performa, dan hasilkan ide inovasi sesuai design style website.
argument-hint: "[analyze|upgrade|innovate|full]"
metadata:
  author: web-update
  version: "1.0.0"
---

# Web Update — Upgrade & Inovasi Website Vanilla

Skill untuk menganalisis, mengupgrade, dan memberikan ide inovasi pada website vanilla HTML/CSS/JS. Fokus utama: **fitur interaktif** dan **performa**.

## Tech Stack Target

| Layer | Teknologi |
|-------|-----------|
| HTML | HTML5 vanilla (semantic, OG meta, PWA meta) |
| CSS | Vanilla CSS3 — Custom Properties, Flexbox, Grid, Keyframes |
| JS | Vanilla ES6+ — IntersectionObserver, MutationObserver, Touch Events |
| Fonts | Google Fonts via CDN |
| Icons | Phosphor Icons / Font Awesome via CDN |
| Audio | HTML5 `<audio>` element |
| Build | No bundler, no framework, no preprocessor |

## Design Style Target

Playful handwritten aesthetic — Patrick Hand font, polaroid/vintage cards, tape/sticker accents, grid background, card-based layout, dark/light mode, floating widget.

## When to Use

- User wants to **analyze** a vanilla website for issues
- User wants to **upgrade** interactive features (animasi, widget, UX)
- User wants to **upgrade** performance (loading, rendering, caching)
- User wants **innovative ideas** that match the existing design style

## Prerequisites

- Access to the project files (HTML, CSS, JS)
- Browser DevTools (Console, Lighthouse, Network tab)
- This skill works with vanilla HTML/CSS/JS only

## Workflow

### Quick Start

```bash
/web-update analyze       # Full audit website
/web-update upgrade       # Upgrade interactive + performance
/web-update innovate      # Hasilkan ide inovasi
/web-update full          # Pipeline: analyze → upgrade → innovate
```

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `analyze` | Audit menyeluruh — HTML, CSS, JS, performa, aksesibilitas, mobile, SEO |
| `upgrade` | Upgrade interactive + performance (seimbang) |
| `innovate` | Hasilkan ide inovasi baru sesuai design style |
| `full` | Full pipeline: analyze → upgrade → innovate |

## Routing

1. Parse subcommand dari `$ARGUMENTS` (first word)
2. Load corresponding `references/{subcommand}.md`
3. Execute dengan remaining arguments

Untuk subcommand `upgrade`, load `references/2-interactive-upgrades.md` dan `references/3-performance-upgrades.md`.
Untuk subcommand `full`, jalankan pipeline: `1-analyze-checklist` → `2-interactive-upgrades` + `3-performance-upgrades` → `4-innovation-ideas`.

## References

| Subcommand | Reference File |
|------------|----------------|
| `analyze` | `references/1-analyze-checklist.md` |
| `upgrade` | `references/2-interactive-upgrades.md` + `references/3-performance-upgrades.md` |
| `innovate` | `references/4-innovation-ideas.md` |
| `full` | All of the above |

## Related Skills

- `ui-styling` — Jika upgrade membutuhkan komponen UI atau styling lanjutan
- `design` — Jika upgrade membutuhkan desain banner, logo, atau brand assets
