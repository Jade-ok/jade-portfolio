# Handoff: Logbook — blog redesign (magazine grid)

## Overview
Full structural + visual redesign of jadelee.dev, currently the Astro **Cactus** theme.
Two views: a magazine-style **index** (giant wordmark + hairline card grid) and a **post detail**
page with a sticky image column on the left and the article text on the right.
Categories cover Film, Book, Dev (dev notes) and Notes (personal/daily), so the same grid must
serve reviews and short notes.

## About the design files
The files in `reference/` are **design references written in HTML** — prototypes of the intended
look and behavior, not production code to paste in. Recreate them in the target codebase's own
environment (here: **Astro** + its existing content collections and layouts; Tailwind if the repo
already uses it) following that repo's established patterns. If no environment exists yet, pick the
most appropriate framework and implement the designs there.

- `reference/index.html` — post index (blog listing)
- `reference/post.html` — post detail page
- `Jade Lee Journal.dc.html` — the interactive prototype (filters + navigation). Needs its own
  runtime; use it only to observe behavior, not as source.

## Fidelity
**High fidelity.** Colors, type, spacing, and hairline geometry below are final. Images are
striped placeholders — real posters/covers/stills get dropped in at the same aspect ratios.

## Layout system
- Page frame: `max-width: 1120px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 64px)`.
  The design must NOT stretch full-bleed; side gutters are intentional.
- Every horizontal divider is a 1px hairline `rgba(20,20,15,0.35)`, edge-to-edge inside the frame.
- Inner row padding: `14px 28px` (header/footer), `12px 24px` (categories row), `20px 22px 26px` (cards).

### Screen 1 — Index (`/posts/`)
1. **Header bar** — 14px black square mark + "JADE LEE" (mono, 12px, 700, uppercase, letter-spacing .14em);
   right: Blog (underlined, active) / Notes / About / Search in `#5B5B52`, gap 22px. Hairline below.
2. **Wordmark** — "LOGBOOK", Archivo 800, `font-size: min(19cqw, 190px)`, line-height .9,
   letter-spacing -.045em, `white-space: nowrap`, on a wrapper with `container-type: inline-size`
   (this is what keeps it inside the gutters at any width — do not switch back to `vw`).
3. **Sub-line row** — mono 11px uppercase `#5B5B52`: left "Films, books, and things that stayed",
   right "Est. 2026 — Seoul".
4. **Categories row** — label "CATEGORIES" (700) left; pill filters right: All / Film / Book / Dev / Notes.
   Pills: `padding 6px 14px; border 1px solid rgba(20,20,15,.4); border-radius 999px`. Active pill =
   `#14140F` background, white text. Filtering is client-side, single-select, default All.
5. **Card grid** — `display:grid; grid-template-columns: repeat(3, minmax(0,1fr))` with
   `border-left` on the grid and `border-right` on each card, plus a hairline under the grid
   (so all columns read as ruled cells). Card contents, top to bottom:
   date (mono 10.5px uppercase `#5B5B52`) + category pill · 1:1 image · title (Archivo 700, 26px,
   line-height 1.12, letter-spacing -.02em) · excerpt (mono 12.5px / 1.75, `#3D3D35`) ·
   meta row pushed to the bottom (`margin-top:auto`): "TEXT Jade Lee" · "READ 9 min".
   Card hover: background `#F4F4F1`. Whole card is a link to the post.
   Empty filter state: single row, mono 12px uppercase, "No dev entries yet — coming soon."
6. **Tags row** — "TAGS" + inline hashtags (mono 11px uppercase, `#5B5B52`, hover `#14140F`).
7. **Footer** — "© Jade Lee 2026" left; Blog / Notes / About / RSS right.

### Screen 2 — Post detail
- Page background (including outside the 1120px frame) is **`#DBDBD5`** — the index is white.
  In the prototype this is done by setting `html`/`body` background per view; in Astro just give
  the post layout that background.
- **Breadcrumb bar** — grid `1fr auto`: "Logbook › Film › Arrival" (mono 11.5px, first two
  underlined links) and the date right, in a cell with a left hairline. Hairline below the bar.
- **Two columns** — `grid-template-columns: 44% 1fr` (image panel width 30–60% is acceptable).
  - Left: `position: sticky; top: 0; max-height: 100vh`, padding `28px 24px`, right hairline.
    Image `aspect-ratio: 3/4`, `max-height: calc(100vh - 120px)` so it never scrolls out of view.
    Caption row below: "FIG. 01" left, credit right (mono 10.5px uppercase).
  - Right: padding `28px 34px 80px`, `max-width: 760px`. Kicker "FILM — 9 MIN" (mono 11px, .14em) ·
    H1 Archivo 800 `clamp(34px,4.6vw,60px)`/1.02, letter-spacing -.035em · lede Archivo 500 19px/1.55
    `#2A2A22` · hairline · body paragraphs in **JetBrains Mono 14px / 1.95** `#25251E`, 22px apart ·
    tag pills · "← BACK TO LOGBOOK" link.

## Interactions & behavior
- Card click / title click → post detail. Breadcrumb "Logbook" and the back link → index.
- Category pills filter the grid instantly (no page load); active pill inverts.
- Hover: cards tint `#F4F4F1`; nav/tag text goes `#5B5B52` → `#14140F`; links `#14140F` → `#6E6A3E`.
- Sticky left image on the detail page; text column scrolls.
- Responsive: 3 columns → 2 below ~900px → 1 below ~620px; detail page stacks (image above text)
  below ~900px and drops `position: sticky`.
- No dark mode in this design (the old theme's toggle can be dropped or restyled later).

## State
- `activeCategory`: 'All' | 'Film' | 'Book' | 'Dev' | 'Notes' (client-side filter).
- Post data comes from the Astro content collection: `title, date, category, readTime, excerpt,
  lede, tags[], heroImage, heroCaption, body`. `readTime` may be computed from word count.
- Notes/Dev entries use the same schema; `heroImage` optional (fall back to the striped placeholder).

## Design tokens
- Ink `#14140F` · secondary ink `#25251E` · lede `#2A2A22` · body-muted `#3D3D35` · muted `#5B5B52`
- Index background `#FFFFFF` · detail background `#DBDBD5` · card hover `#F4F4F1` · link hover `#6E6A3E`
- Hairline `rgba(20,20,15,0.35)` · image border `rgba(20,20,15,0.25)`
- Placeholder stripes: light `repeating-linear-gradient(135deg,#EAEAE6 0 6px,#F6F6F3 6px 12px)`,
  greige `repeating-linear-gradient(135deg,#CFCFC8 0 7px,#DEDED8 7px 14px)`
- Type: **Archivo** 400/500/700/800 (display, titles, lede) + **JetBrains Mono** 400/500/700
  (all meta, labels, and article body). Google Fonts.
- Radii: 0 everywhere except pills (`999px`). No shadows anywhere.
- Spacing scale used: 4 / 8 / 10 / 14 / 18 / 22 / 24 / 28 / 34 / 64 px.

## Assets
No real images yet — all imagery is a CSS striped placeholder with a mono caption of what belongs
there (`still / poster 1:1`, `book cover 1:1`). Keep 1:1 in the grid and 3:4 on the detail page.
Fonts load from Google Fonts; self-host if the repo prefers.

## Files
- `reference/index.html`, `reference/post.html` — static high-fidelity references (open in a browser)
- `Jade Lee Journal.dc.html` — interactive prototype (filters, navigation)
