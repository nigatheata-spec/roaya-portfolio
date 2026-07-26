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

## Media assets

The site renders composed placeholders until real assets are dropped in. Add files
at these paths under `public/` and they appear automatically — no code changes:

```
public/media/hero/showreel-poster.jpg
public/media/hero/showreel.mp4
public/media/work/diriyah-nights.jpg   (+ .mp4)
public/media/work/the-long-red.jpg
public/media/work/qiddiya-launch.jpg
public/media/work/house-of-oud.jpg
public/media/work/red-sea-crossing.jpg
public/media/work/ninety-three.jpg
```

Paths are declared in `src/lib/content.ts`.

## Localisation

Copy currently ships English only. Arabic and RTL support are planned; all copy is
already centralised in `src/lib/content.ts` to make that swap straightforward.
