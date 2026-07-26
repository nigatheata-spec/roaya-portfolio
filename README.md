# Roaya — Media House

Portfolio site for Roaya, a film and broadcast studio based in Riyadh, Saudi Arabia.

## Stack

| Concern       | Choice                                |
| ------------- | ------------------------------------- |
| Build         | Vite 8                                |
| Framework     | React 19 + TypeScript                 |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation     | GSAP 3.15 + ScrollTrigger + SplitText |
| Smooth scroll | Lenis                                 |
| Icons         | lucide-react                          |
| Routing       | react-router-dom                      |
| Linting       | oxlint                                |

## Running locally

```bash
npm install
npm run dev
```

## Design system

The brand palette lives in `src/index.css` under `@theme`. The four source colours:

| Token     | Hex       | Role                          |
| --------- | --------- | ----------------------------- |
| `inkwell` | `#2C3639` | Deepest brand neutral         |
| `eclipse` | `#3F4E4F` | Mid surface, wave fills       |
| `brulee`  | `#A27B5B` | Single accent, used sparingly |
| `lait`    | `#DCD7C9` | Primary type, light surfaces  |

Depth steps (`void`, `surface`, `raised`, `line`) and type roles (`ink-100` through
`ink-25`) are derived in OKLCH from the same hue family, so everything stays tonally
related rather than arbitrarily grey.

Type: **Bricolage Grotesque** for display, **Sora** for body.

## Motion

Each section owns one motion concept, scoped to a GSAP context that reverts on
unmount so ScrollTriggers never leak across routes.

| Section             | Concept                     |
| ------------------- | --------------------------- |
| `HeroInkFlow`       | Ink flow reveal             |
| `StatementLightBar` | Sweeping light bar reveal   |
| `WorkLens`          | Liquid lens refraction      |
| `ServicesReconfig`  | Widget reconfiguration      |
| `MetricsWave`       | Ocean wave data visual      |
| `CTAMelt`           | Melt to text (gooey filter) |

All motion is gated behind `prefers-reduced-motion`.

## Content provenance

The catalogue in `src/lib/content.ts` is carried over from the previous site,
onoria.solutions. Project titles, runtimes, disciplines, and client credits are real.
Poster frames in `public/media/work/` were pulled from that site.

Two things still need sign-off before this goes public:

- **Contact details** — `studio.email` and `studio.phone` are the old Onoria values
  (Istanbul). The studio is now Riyadh-based, so these likely changed.
- **Project summaries** — one-line descriptions are written from the titles and
  runtimes. They are descriptive, not sourced. Replace with real synopses.

Headline figures in the "by the numbers" section are computed from the `projects`
array rather than asserted, so they cannot drift from what the site actually shows.

## Media assets

Still outstanding:

```
public/media/hero/showreel-poster.jpg
public/media/hero/showreel.mp4
```

Showreel source: <https://vimeo.com/usamaesam>. `Media` renders a composed
placeholder until these exist, so nothing breaks in the meantime.

## Localisation

Copy currently ships English only. Arabic and RTL support are planned; all copy is
already centralised in `src/lib/content.ts` to make that swap straightforward.
