# Handoff: Logbook — blog redesign (magazine grid)
*Update — supersedes the first version of this README. Only the changes below are new; anything not
mentioned here is unchanged from the previous handoff.*

## What changed since the last handoff
1. **Post detail is now SINGLE COLUMN** (the two-column sticky-image layout is dropped as the default).
2. **Images live inside the article flow**: one 16:9 hero above the text, then 4:3 inline figures with captions.
3. **Private (owner-only) posts**: visual marker on the card + an owner-only toggle in the categories row.
4. Post page keeps the greige background (`#DBDBD5`) including outside the 1120px frame; index stays white.
5. Optional alternative layout `postLayout: "Two column (scroll-synced)"` still exists in the prototype
   — treat it as **out of scope** unless asked for.

---

## 1. Post detail — single column (replaces the 2-column spec)
Container: page frame (`max-width:1120px; padding:0 clamp(16px,4vw,64px)`), background `#DBDBD5`.

- **Breadcrumb bar** (unchanged): grid `1fr auto`, "Logbook › Film › Arrival" + date cell with left hairline, hairline below.
- **Article column**: centered, `max-width: 760px`, `width: 100%`.
  - **Hero figure**: `padding: 34px 24px 0`, `aspect-ratio: 16/9`, 1px border `rgba(20,20,15,.25)`,
    caption row under it (mono 10.5px uppercase `#5B5B52`): "FIG. 01" left, credit right, `margin-top: 12px`.
  - **Text block**: `padding: 28px 24px 96px`.
    - Kicker: mono 11px, letter-spacing .14em, uppercase, `#5B5B52` — "FILM — 9 MIN".
    - H1: Archivo 800, `clamp(34px,4.6vw,60px)`, line-height 1.02, letter-spacing -.035em.
    - Lede: Archivo 500, 19px/1.55, `#2A2A22`, margin-bottom 30px.
    - Hairline, then body.
    - **Body paragraphs**: JetBrains Mono 14px / 1.95, `#25251E`, `margin: 0 0 24px`.
    - **Inline figures** (`<figure>`, `margin: 8px 0 30px`): `aspect-ratio: 4/3`, same border,
      caption row (`figcaption`, flex space-between, mono 10.5px uppercase `#5B5B52`): "FIG. 0n" left, credit right.
      Author places them between paragraphs; the prototype inserts one after the 2nd paragraph.
    - Tag pills, then "← BACK TO LOGBOOK" (mono 12px uppercase, 1px underline).
- Image placeholders (until real assets): `repeating-linear-gradient(135deg,#CFCFC8 0 7px,#DEDED8 7px 14px)`
  with a mono label chip (`background:#DBDBD5; padding:4px 8px`) bottom-left.

## 2. Private / owner-only posts (new)
Content model: each post gets `isPrivate: boolean` (default false). Private posts are excluded from
public HTML/RSS/sitemap output entirely — the toggle below is a **client-side convenience for the
owner**, not a security boundary. Gate the private content server-side (separate build, auth, or a
non-indexed route); never ship private bodies to the public bundle.

**Card treatment (index grid)**
- Card background `#F7F7F3` instead of transparent (hover still `#F4F4F1`).
- The category pill is replaced by a filled badge: text "PRIVATE", background `#14140F`, text `#FFFFFF`,
  same geometry as the category pill (`padding:4px 10px; border:1px solid rgba(20,20,15,.4); border-radius:999px`).
- Image placeholder stripes shift one step lighter/greyer: `repeating-linear-gradient(135deg,#E4E4DE 0 6px,#F1F1EC 6px 12px)`.
- Everything else (date, title, excerpt, meta row) identical to a public card.

**Owner toggle (categories row, left of the category pills)**
- Pill with a **dashed** border `1px dashed rgba(20,20,15,.55)`, `padding:6px 14px`, `border-radius:999px`, `margin-right:6px`.
- Label: `Private {count} — shown` / `Private {count} — hidden` (mono 11px uppercase, .12em).
- On (shown): background `#14140F`, text `#FFFFFF`. Off: transparent background, `#14140F` text.
- Click toggles private posts in/out of the grid. Default: shown.
- Rendered **only when the viewer is the owner** (`isOwner`). For visitors the toggle is absent and
  private posts never appear. Persist the toggle state in `localStorage` if convenient.
- Category filters (All / Film / Book / Dev / Notes) compose with it: category filter first, then the
  private filter. Empty result → existing empty-state row.

## 3. Unchanged, for reference
Frame width 1120px + `clamp(16px,4vw,64px)` gutters · index wordmark "LOGBOOK" at `min(19cqw,190px)`
inside a `container-type: inline-size` wrapper · hairlines `rgba(20,20,15,.35)` with `border-left` on the
card grid · 3-column card grid (2 below ~900px, 1 below ~620px) · tokens: ink `#14140F`, muted `#5B5B52`,
body `#25251E`, lede `#2A2A22`, excerpt `#3D3D35`, index bg `#FFFFFF`, post bg `#DBDBD5`,
card hover `#F4F4F1`, link hover `#6E6A3E` · Archivo + JetBrains Mono · radius 0 except pills (999px), no shadows.

## Files
- `reference/index.html` — index, includes the private card + owner toggle
- `reference/post.html` — single-column post detail with hero + inline figure
- `Jade Lee Journal.dc.html` — interactive prototype (category filter, private toggle, both post layouts)
