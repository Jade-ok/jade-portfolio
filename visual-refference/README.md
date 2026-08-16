# Handoff: Jade Lee Portfolio Homepage — Design Refresh

## ⚠️ Read this first: fidelity is the requirement

A previous implementation attempt produced something that was *structurally*
similar but felt completely different in detail. That is the failure mode to avoid.

**`VISUAL-REFERENCE.html` in this folder is the ground truth.** Open it in a
browser. It is fully self-contained and renders the design exactly as intended.

Before you consider any section done, put your implementation and
`VISUAL-REFERENCE.html` side by side at the same window size and compare:

- **Type weights.** Archivo 900 for the name and headings — not 700, not "bold".
  A weight off by one step changes the whole character of the page.
- **Negative letter-spacing.** The big display type is tracked tight (−0.05em on
  the name). Default tracking makes it look generic immediately.
- **Line-height 0.86 on the name.** Not 1, not "tight".
- **Square corners on the hero CTA buttons.** Everything else has radius; these
  two deliberately do not.
- **The rust period** after JADE LEE, and the mustard period on every section
  heading. Small, easy to skip, and it is the signature of the design.
- **Accent restraint.** Rust appears on: the period, `@ UBC`, the availability
  dot, the italic phrase, one button fill, `READ →`. That is the whole budget.
  If rust is on more surfaces than that, it is wrong.
- **The mono voice.** Every label, eyebrow, timestamp, and button is JetBrains
  Mono with wide letter-spacing and uppercase. If any of these render in the
  sans, the page loses its texture.
- **Fraunces appears exactly once** (the hero tagline). Nowhere else.
- **Spacing.** Section padding is 100px vertical. Cards are 32px apart. These are
  large on purpose; compressing them makes the page feel like a template.

Where this README states a value, that value is not a suggestion. If something
cannot be matched because of a codebase constraint, say so rather than
substituting an approximation.

## Overview

A visual redesign of an **existing** personal portfolio homepage for Jade Lee, a
4th-year Computer Science student at UBC (Vancouver, Canada) seeking Summer 2026
SWE internships.

This is a **restyle of a site that already exists**, not a greenfield build. The
information architecture (About → Projects → History → Activities → Contact) and
the content are largely already in place. What this handoff describes is the new
visual language, the new hero composition, and two behavioral changes (project
detail views open on click; the running stats are backed by a live data source).

## About the Design Files

The files in this bundle are **design references authored in HTML**. They are
prototypes that demonstrate intended appearance and behavior. **They are not
production code and should not be copied into the site as-is.**

`Jade Lee Homepage.dc.html` uses a proprietary component runtime (`support.js`,
custom `<x-dc>` / `<sc-if>` tags). That runtime is a prototyping tool only — do
not port it. Open the file in a browser to see the design; read this README for
the specification.

**The task is to recreate this design in the existing homepage codebase**, using
whatever framework and conventions that codebase already uses (React, Next.js,
Astro, Svelte, plain HTML/CSS — whichever it is). Match the existing project's
component structure, styling approach (CSS modules / Tailwind / styled-components
/ plain CSS), and file organization. Do not introduce a new styling paradigm just
to match the prototype's inline styles — the inline styles in the prototype are
an artifact of the prototyping tool, not a design decision.

If the existing site uses a CSS framework with a design-token system, map the
values in **Design Tokens** below onto that system rather than hard-coding hex
values throughout.

## Fidelity

**High-fidelity.** Colors, typography, spacing, and interactions are final.
Recreate the UI to match the prototype closely. Where this README gives an exact
value, use it.

Two caveats:

1. The prototype's responsive behavior is tuned for desktop widths (roughly
   900px and up). **Mobile layouts are not designed** — see *Responsive Behavior*
   for the intended approach, but expect to make judgment calls, or ask before
   building mobile.
2. Project cards 4 and 5 are **not yet designed** — only three of five projects
   have cards. See *Known Gaps*.

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `paper` | `#FBF8EE` | Page background, text on dark surfaces |
| `ink` | `#2E3320` | Primary text, dark section backgrounds |
| `ink-deep` | `#2B3218` | Photo overlay text (near-black, for contrast on sky) |
| `moss` | `#4A5030` | Secondary text, borders, nav links |
| `moss-band` | `#3C4326` | Before/Now/Next band background |
| `rust` | `#A85E28` | Primary accent — CTA fill, name period, live dot, links on hover |
| `mustard` | `#C9A344` | Secondary accent — section periods, footer accents, badges |
| `mustard-light` | `#E8B95C` | "NOW" label on the dark band |
| `sand` | `#EDE4C9` | Card backgrounds, History section background |
| `sand-line` | `#D8C8A8` | Dividers on sand backgrounds |
| `hairline` | `#ECE5CF` | Card borders, nav border on paper |
| `taupe` | `#7A6B4F` | Mono metadata text, muted labels |
| `stone` | `#6B6A55` | Serif tagline body text, photo caption |
| `sage-muted` | `#A9AC86` | "BEFORE"/"NEXT" labels on the dark band |
| `cream-dim` | `#E2E0CD` | Body text on the dark band |

Overlay panel on the hero photo:
`linear-gradient(180deg, rgba(247,249,250,0.92) 0%, rgba(247,249,250,0.88) 74%, rgba(247,249,250,0) 100%)`

**Rule:** at most two background colors compete on any screen. `rust` is reserved
for small, high-value marks — never large fills beyond a single CTA button.

### Typography

Three families, loaded from Google Fonts:

- **Archivo** (400, 500, 600, 700, 800, 900) — display and UI. All headings, the
  name, subtitles, card titles, body copy in cards.
- **JetBrains Mono** (400, 500, 600) — all metadata, labels, eyebrows, buttons,
  nav, stat readouts. This is the "system voice" of the design.
- **Fraunces** (300, 400, 500, optical size 9–144) — used **once**, for the hero
  tagline. Its italic carries the rust-colored emphasis. Do not extend Fraunces
  to other body copy.

Scale (desktop):

| Element | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero name `h1` | Archivo | `clamp(52px, min(9vw, 11.5vh), 116px)` | 900 | 0.86 | −0.05em |
| Section `h2` | Archivo | 88px | 900 | 0.9 | −0.035em |
| Footer `h2` | Archivo | `clamp(64px, 11vw, 168px)` | 900 | 0.85 | −0.045em |
| Detail `h2` | Archivo | 96px | 900 | 0.88 | −0.04em |
| Hero subtitle | Archivo | `clamp(19px, min(2.4vw, 3.2vh), 28px)` | 700 | 1.15 | −0.02em |
| Hero tagline | Fraunces | `clamp(16px, min(1.9vw, 2.5vh), 22px)` | 400 | 1.4 | −0.01em |
| Featured card `h3` | Archivo | `clamp(28px, 3.2vw, 44px)` | 800 | 1 | −0.025em |
| Card `h3` | Archivo | 28px | 800 | 1.05 | −0.02em |
| History item `h3` | Archivo | 22px | 700 | — | — |
| Card body | Archivo | 14–15px | 400 | 1.55 | — |
| Eyebrow / meta | JetBrains Mono | 11–13px | 600–700 | — | 0.02–0.1em |
| Buttons | JetBrains Mono | 12–14px | 700 | — | — |
| Photo caption | JetBrains Mono | 10.5px | 700 | 1.5 | 0.01em |

**Minimums:** no mono text below 9.5px anywhere. Earlier iterations went to 7.8px
and were unreadable — this was a real, user-reported defect. If a string does not
fit at ≥10px, shorten the string or widen the container; do not shrink the type.

### Spacing

Section padding: `100px 48px` (desktop). Container max-width: `1400px` for most
sections, `1200px` for the hero. Card gap: `32px`. Card interior padding: `40px`
(featured), `28px` (standard). Border radius: `24px` (cards), `20px` (activity
tiles, detail imagery), `32px` (detail panel), `999px` (pills, nav items).
Hero CTA buttons have **no** border radius — square corners, deliberately.

---

## Screens / Views

### 1. Navigation (sticky)

- **Height: exactly 72px.** This is load-bearing — the hero's height is
  `calc(100dvh - 72px)`. If the nav height changes, the hero calculation must
  change with it. Prefer measuring the nav at runtime (or using a CSS custom
  property / flex shell) over hard-coding, so the two cannot drift apart.
- Background `rgba(251,248,238,0.85)` with `backdrop-filter: blur(12px)`,
  `border-bottom: 1px solid #ECE5CF`. Sticky, `z-index: 50`.
- Inner container: max-width 1400px, `padding: 0 48px`, flex, space-between.
- **Left:** an 8px `mustard` dot + "JADE LEE" (mono 13px/600).
- **Center:** numbered links — `01 ABOUT`, `02 PROJECTS`, `03 HISTORY`,
  `04 ACTIVITIES`, `BLOG ↗`. Mono 12px/500, `padding: 8px 14px`. Leading numbers
  render at 50% opacity. The **active** item gets a `moss` pill background with
  `paper` text. `BLOG ↗` needs `white-space: nowrap` or the arrow orphans.
- **Right:** `05 LET'S TALK` — pill outline, `1.5px solid moss`, `padding: 10px 22px`.
- Nav background stays **paper** — no colored fill. This was considered and
  rejected: a colored bar steals attention from the name and burns the accent
  colors on a non-content element.

### 2. Hero / About — locked to exactly one screen

**This is the most constrained part of the design and the part that took the most
iteration. Read this whole section before implementing.**

The requirement: the About section occupies **exactly one viewport** below the
nav — the Before/Now/Next band's bottom edge meets the bottom of the screen. It
must not overflow, and it must not leave a gap.

Structure:

```
section#about        height: calc(100dvh - 72px); overflow: hidden;
                     display: flex; flex-direction: column;
├── top area         flex: 1 1 auto; min-height: 0;
│                    display: flex; align-items: center; justify-content: center;
│                    padding: clamp(20px, 3vh, 44px) 0;
│   └── container    width: 100%; max-width: 1200px; padding: 0 48px;
│                    display: grid; grid-template-columns: auto 1fr;
│                    gap: clamp(36px, 5vw, 72px); align-items: center;
│       ├── photo column (see below)
│       └── text column (see below)
└── band             flex: 0 0 auto;  (Before / Now / Next)
```

**Critical constraint — the grid must stay ONE row.** The photo column and the
text column are the only two grid children. Anything added with
`grid-column: 1 / -1` between them forces auto-placement onto three rows and
collapses the composition (the name drops below the photo and slides under the
band). If something needs full width, it goes *after* the text column or inside it.

#### Photo column

```
wrapper   width: calc(min(50vh, 540px) * 0.5625);
          display: flex; flex-direction: column; gap: 10px;
├── photo width: 100%; aspect-ratio: 9 / 16;
│         position: relative; overflow: hidden; background: #4A5030;
└── caption
```

The wrapper's width is an **explicit function of viewport height**, and the photo
derives its height from that width. This ordering matters: it guarantees the
caption can never be wider than the photo (they were racing each other in earlier
versions, producing a 55px overhang), and it guarantees the photo + caption always
fit above the band.

**Photo:** `assets/hero-running.jpg`, included in this bundle. 2268×4032 (9:16),
Jade running at sunset in a Vancouver park. `object-fit: cover`, full bleed within
its box. Square corners — no radius.

**Stat overlay** — absolutely positioned, `top: 0; left: 0; right: 0`,
`padding: 14px 16px 16px`, `pointer-events: none`, with its **own** background
gradient (the cream-to-transparent panel listed in Design Tokens).

> The overlay carries its own backdrop rather than relying on a scrim sized as a
> percentage of the photo. A percentage scrim decouples from the fixed pixel
> offsets of the text rows as the photo resizes, and the lower rows slide off the
> bright area onto the dark tree line. This caused two separate contrast failures
> during design. **Keep the backdrop attached to the text block.**

Overlay contents, top to bottom, all left-aligned:

1. **Live indicator row** — a 6px `rust` dot with two stacked animations, then
   the word `LIVE` (mono 10px/700, rust).
   - `livePulse`: 2.4s ease-in-out infinite — opacity 1→0.35→1, scale 1→0.82→1.
   - `liveRing`: 2.4s ease-out infinite — a second dot at the same position
     expanding to scale 2.6 while fading 0.55→0, producing a radar ping.
   - This is the **only** animation on the page. Keep it that way.
   - Respect `prefers-reduced-motion` — hold the dot static.
2. `I'M RUNNING · TOTAL` — mono 9.5px/700, `ink-deep`, letter-spacing 0.01em.
3. **`847`** — Archivo 900, `clamp(34px, 6vh, 56px)`, line-height 0.82,
   letter-spacing −0.05em, `ink-deep`. The `km` suffix is `0.34em`, `rust`.
4. `5:24 avg /km` — mono 11.5px/700, `ink-deep`; `avg /km` in `moss`.

**Caption** (below the photo, aligned to its left and right edges):
`⟳ AUTO-SYNCED FROM STRAVA · 2H AGO` — mono 10.5px/700, `stone`, with the
timestamp in `rust`. Wraps to two lines on short windows; that is acceptable.

#### Text column

Single vertical stack, vertically centered against the photo. Every gap scales
with viewport height so the composition holds on short laptop screens:

1. Eyebrow — a 24px rust rule + `PORTFOLIO — 2026` (mono 12px/600, taupe).
   Margin-bottom `clamp(14px, 2.4vh, 26px)`.
2. `h1` — **JADE LEE** with a `rust` period. The period is the design's signature
   mark; it repeats on every section heading in `mustard`.
3. Subtitle — `Computer Science student @ UBC`, with `@ UBC` in rust.
   Margin-top `clamp(14px, 2.4vh, 24px)`.
4. Meta row — `BCS · 4TH YEAR · VANCOUVER, CA`, a 1px × 12px divider, then a 7px
   rust dot + `AVAILABLE SUMMER 2026` in rust. Mono 12px/500, taupe.
   **Both segments need `white-space: nowrap`** — they break mid-phrase otherwise.
5. Tagline — Fraunces, `Turning *messy human input* into structured, useful
   software — with voice, Chrome, and databases.` The italic phrase is rust.
   `text-wrap: pretty`. Margin-top `clamp(16px, 2.8vh, 26px)`.
6. CTA row — `VIEW PROJECTS →` (rust fill, paper text) and `GET IN TOUCH`
   (transparent, `1.5px solid #C8BFA0`). Both mono 13px/700,
   `padding: clamp(11px, 1.7vh, 15px) 26px`, **square corners**.
   Margin-top `clamp(18px, 3.2vh, 34px)`.

#### Before / Now / Next band

Full-bleed `moss-band` (`#3C4326`), flush to both screen edges — deliberately not
inset to the container. A band that stops short reads as a floating card; this
one needs to read as the floor of the first screen.

Inner container max-width 1200px, centered, `padding: clamp(20px, 3.4vh, 40px) 48px`
— so the band's text starts on the same vertical line as the hero content.

Three equal columns, divided by `1px solid rgba(226,224,205,0.2)`:

| Label | Color | Body |
|---|---|---|
| `01 — BEFORE` | `sage-muted` | Producer & news editor in Korea. Structuring information under deadline. |
| `02 — NOW` | `mustard-light` | Building voice AI tools & shipping side projects to real users. |
| `03 — NEXT` | `sage-muted` | Summer 2026 backend, cloud, or fullstack SWE internships. |

Labels mono 12px/700, letter-spacing 0.1em. Body `clamp(14px, min(1.15vw, 2.1vh), 17px)`,
line-height 1.5, `text-wrap: pretty`. NOW's body is `paper` at weight 500; the
other two are `cream-dim` at 400 — NOW is the present tense and gets the emphasis.

### 3. Projects

Container max-width 1400px, `padding: 100px 48px`.

Header row: eyebrow (`32px × 2px` mustard rule + `02 · PROJECTS`), then
`SELECTED PROJECTS.` (h2, moss, mustard period), and on the right a mono label
`FIVE PROJECTS · 2025—2026`.

> There is **no "View all" link**. With five projects there is no index page —
> everything lives on the homepage. A previous iteration had a `VIEW ALL 12 →`
> button that led nowhere; it was removed deliberately. Do not reintroduce it.

Card grid: `repeat(2, 1fr)`, 32px gap.

**Featured card** (spans both columns) — `grid-column: 1 / -1`, `sand` background,
24px radius, `overflow: hidden`, and
`grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr)`.

> The `minmax(0, …)` is required. Plain `1.2fr 1fr` gives each track an implicit
> min-content floor; the 44px heading then refuses to shrink and the card
> overflows its own box and clips the title mid-word. Similarly, the image column
> is `aspect-ratio: 16/10` — at `5/4` it drove a height taller than the card and
> the tag row and arrow button were sliced off the bottom.

- Left: image, `aspect-ratio: 16/10`, with a `mustard` pill badge top-left:
  `FEATURED · HACKATHON WIN` (mono 10px/700, ink).
- Right: 40px padding, space-between column.
  - Meta row: `/01 · CAREHANDOFF` and `2026` (mono 11px, taupe, `nowrap`).
  - `h3` CareHandoff.
  - Body: *Voice-powered handoff system for a nonprofit. FastAPI backend with
    Whisper + GPT-4o-mini turns audio into structured JSON across 50+ languages.*
  - Footer: tech pills (`FASTAPI`, `WHISPER`, `GPT-4O`) — mono 10px/600, `paper`
    background, `moss` text, 999px radius — and a 48px circular `moss` button
    with a `paper` arrow.

**Standard cards** — `paper` background, `1px solid hairline`, 24px radius, flex
column. Image `aspect-ratio: 16/10` with a `paper` status pill top-left. Body
padding 28px. Footer divided by `1px solid hairline` above it, holding `sand` tech
pills and a `READ →` link in rust (mono 12px/600, **`nowrap`**).

| # | Title | Status pill | Meta | Tech |
|---|---|---|---|---|
| 02 | PrairieCalendar | `SHIPPED · 29 USERS` | `SIDE · 2025—` | CHROME EXT, GCAL API |
| 03 | Smart Home Database | `ACADEMIC · A+` | `ACADEMIC · 2026` | ORACLE, NODE.JS |

Copy — PrairieCalendar: *Chrome extension exporting PrairieTest exam schedules to
Google Calendar & ICS. Live in the Web Store.* Smart Home Database: *3NF-normalized
schema across 20+ tables with Node.js/Oracle REST endpoints for CRUD, aggregation,
division & multi-table joins.*

### 4. Project detail view

**Hidden by default. Opens only when a project card is clicked.** It is not
reachable by scrolling. In the prototype this is a conditional block driven by an
`openProject` state value; the back link clears it.

In the real site, prefer **routed pages** — `/projects/carehandoff` etc. — over an
in-page toggle. Each project then has a shareable URL, which matters when sending
a specific project to a recruiter. The prototype uses an in-page toggle only
because it is a single file.

Only CareHandoff's detail is designed. The other four follow the same template.

Layout: `ink` panel, 32px radius, 56px padding, `overflow: hidden`, with a 120px
`mustard` circle decoration at top-right (opacity 0.9).

- Breadcrumb above the panel: `← ALL PROJECTS · DETAIL VIEW · /01` (mono 11px).
- Header grid `1.3fr 1fr`, `align-items: end`:
  - Left: `HACKATHON · WON BEST HEALTHTECH · 2026` (mono 12px, mustard); `h2`
    *Care / Handoff.* with a mustard period; a 18px lede in `cream-dim`,
    max-width 520px.
  - Right: three stat cards — `rgba(251,248,238,0.08)` fill,
    `1px solid rgba(251,248,238,0.12)`, 16px radius, 20px padding. `MY ROLE`
    (full width), then `BUILT IN` `36h` and `LANGUAGES` `50+` side by side.
- Media grid `2fr 1fr`: a 16:9 slot, plus a stacked pair of 4:3 slots
  (architecture diagram, team photo). All 20px radius.
- Three-column narrative above a `1px solid rgba(251,248,238,0.15)` rule:
  `01 · PROBLEM`, `02 · BUILD`, `03 · RESULT` — mustard mono labels, 14px
  `cream-dim` body.
- Action row: `LIVE DEMO ↗` (mustard fill, ink text) plus `GITHUB ↗` and
  `CASE STUDY (PDF) ↗` (transparent, `1.5px solid rgba(251,248,238,0.3)`).
  All 999px radius.

### 5. History

Full-bleed `sand` background, `100px 0`, hairline borders top and bottom.
Eyebrow `03 · HISTORY`, h2 `THE PATH.`

Timeline rows: `grid-template-columns: 120px 1fr 200px`, 32px gap, `24px 0`
padding, `1px solid sand-line` on top of each row (plus a closing rule after the
last), `align-items: baseline`.

| Year | Title | Location |
|---|---|---|
| `2026 —` (rust) | CS @ University of British Columbia | VANCOUVER, CA |
| `2023` (moss) | Producer & News Editor, Seoul | SEOUL, KR |
| `2020` (moss) | First line of code | SEOUL, KR |

Descriptions: *Voice AI research assistant · TA for CPSC 210 · Shipping side
projects to real users.* / *Broadcast news production. Learned to structure
information under real deadline pressure.* / *Started with Python during lockdown
— automating spreadsheet drudgery at my day job.*

The current year is rust; past years are moss. Location column is right-aligned
mono 11px taupe.

### 6. Activities

Container max-width 1400px, `100px 48px`. Eyebrow `04 · ACTIVITIES`, h2
`OFF THE CLOCK.`

Four equal tiles, 20px gap. Each: `sand` background, 20px radius, a 1:1 image,
then 20px padding holding a rust mono 10px/700 category and a 16px/700 title.

`OUTDOORS` Hiking the Coast Mtns · `MAKING` Sourdough experiments ·
`READING` Systems books & essays · `COMMUNITY` Korean-Canadian dev meetup

### 7. Contact / Footer

`ink` background, `120px 0 60px`, `overflow: hidden`, with two decorative circles:
a 400px `mustard` disc at `top: -100px; right: -100px` (opacity 0.9), and an 80px
`2px solid #6B7A4A` ring at `top: 60px; right: 200px` (opacity 0.6).

- Eyebrow `05 · LET'S TALK` in mustard.
- h2 `WANT TO / BUILD / SOMETHING?` — the `?` is mustard.
  **Must be `clamp(64px, 11vw, 168px)`** — at a fixed 168px the `?` overflowed and
  was clipped entirely by the section's `overflow: hidden`.
- Two-column row, `align-items: end`: left, an 18px lede in `#D8D1BD` plus a
  mustard pill mail CTA containing a 24px ink circle with a mustard arrow; right,
  a 2×2 grid of links (`GITHUB`, `LINKEDIN`, `READ CV`, `BLOG`) —
  `rgba(251,248,238,0.08)` fill, `1px solid rgba(251,248,238,0.15)`, 14px radius,
  `16px 20px` padding, label left and a mustard `↗` right.
- Bottom bar: 100px above, 24px padding over a
  `1px solid rgba(251,248,238,0.15)` rule. `© 2026 JADE LEE · BUILT IN VANCOUVER`
  on the left; on the right an 8px `#6B7A4A` dot and
  `ONLINE · LAST UPDATED <date>`. Mono 11px, `#7A8A5A`.

---

## Interactions & Behavior

**Project cards.** Clicking a card opens that project's detail view. In the
prototype the featured card is wired; cards 2 and 3 use the same pattern. Back
link returns to the list. Implement as routes if possible (see above).

**Live running stats.** The `847`, `5:24`, and `2H AGO` values are **backed by a
real data source** — Jade has a backend pulling from Strava. Wire all three to the
API response. Derive the caption's relative time from the sync timestamp
server-side (`2H AGO`, `12M AGO`, `YESTERDAY`). If a sync fails or data is stale
beyond a threshold, hold the last known values and let the timestamp tell the
truth — do not hide the block, and do not show a zero.

The pulsing dot is the visual promise that these numbers are live. It should
reflect reality: consider dimming it to `taupe` (no animation) when the last sync
is older than ~24h.

**Links.** Default `a` color `moss`, hover `rust`. Define both explicitly.

**Nav.** Active section pill. Consider scroll-spy to move it between sections.

**Reduced motion.** Honor `prefers-reduced-motion: reduce` — the live dot is the
only animation and should hold static.

---

## State Management

Minimal:

- `openProject: string | null` — which detail view is showing (or route params).
- Running stats: `{ totalKm, avgPace, lastSyncedAt }` from the Strava-backed
  endpoint. Fetched server-side or on mount; no polling needed.
- Optional: active nav section for scroll-spy.

---

## Responsive Behavior

**Designed for desktop (≈900px and up).** Below that, the design is unspecified.

The hero's one-screen lock is the fragile part. Its type and spacing scale with
`vh` so the composition holds on short laptop windows; the photo column is a
function of viewport height for the same reason. On phones the two-column hero
should stack — but stacking breaks the one-screen lock, so **decide explicitly**
whether mobile keeps the lock (photo shrinks a lot) or abandons it (natural
height, band scrolls). Ask before building; do not infer from the prototype.

Below ~900px the project grid should collapse to one column and the featured card
should stack image over text. The band's three columns should stack or scroll.

---

## Assets

| File | Notes |
|---|---|
| `assets/hero-running.jpg` | 2268×4032, 2.6MB. Jade running at sunset. **Use this original.** |

The hero photo is the only real asset. **Compress and generate responsive
variants** before shipping — 2.6MB is far too heavy for a hero. Serve WebP/AVIF
with a JPEG fallback, at roughly 400w / 800w / 1200w. The design never renders it
wider than ~305 CSS px, so a 640w top variant is ample for 2× displays.

> An earlier iteration ran this photo through a tool that re-encoded it to
> 369×656, and the blur was severe enough to threaten the whole design. Always
> downscale from the 2268×4032 original.

All other images are **placeholders** and need real content: project covers
(CareHandoff voice UI, PrairieCalendar UI, Smart Home schema diagram), three
CareHandoff detail images, and four activity photos.

Fonts: Archivo, JetBrains Mono, Fraunces — all Google Fonts. Self-host if the
existing site self-hosts.

---

## Known Gaps

1. **Projects 4 and 5 have no cards.** Jade has five projects; three are designed.
   The remaining two follow the standard card pattern — title, status pill, meta,
   one-to-two-sentence description, two tech pills, `READ →`.
2. **Detail views for projects 2–5** are not designed. Follow CareHandoff's template.
3. **Mobile is not designed.** See *Responsive Behavior*.
4. **All imagery except the hero photo is a placeholder.**
5. **Contact details are placeholders** — `jade@example.com` and the four footer
   links need real URLs.

---

## Files

| File | What it is |
|---|---|
| **`VISUAL-REFERENCE.html`** | **The ground truth. Open in a browser — self-contained, no setup. Compare against this constantly.** |
| `Jade Lee Homepage.dc.html` | Source of the above. Prototype runtime — reference only, do not port. |
| `assets/hero-running.jpg` | Hero photo original. Ship this (compressed). |
| `Palette Explorations.dc.html` | Earlier color studies. Context only; the palette above is final. |
| `support.js`, `image-slot.js` | Prototyping runtime. **Do not port.** |
