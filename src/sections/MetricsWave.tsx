import { useRef } from 'react';
import { metrics } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

const W = 1200;
const H = 260;

/** Builds a filled sine band across the full width at the given phase. */
function wavePath(phase: number, amp: number, freq: number, base: number) {
  const step = 10;
  let d = `M0,${base + Math.sin(phase) * amp}`;
  for (let x = step; x <= W; x += step) {
    const y = base + Math.sin((x / W) * freq * Math.PI * 2 + phase) * amp;
    d += ` L${x},${y.toFixed(2)}`;
  }
  return `${d} L${W},${H} L0,${H} Z`;
}

const BANDS = [
  { amp: 26, freq: 1.6, base: 118, fill: 'var(--color-eclipse)', opacity: 0.5, speed: 1 },
  { amp: 34, freq: 1.1, base: 150, fill: 'var(--color-brulee)', opacity: 0.22, speed: -0.7 },
  { amp: 20, freq: 2.3, base: 178, fill: 'var(--color-inkwell)', opacity: 0.85, speed: 1.5 },
];

/**
 * Motion concept 22 — ocean wave data visual.
 * The figures sit on continuously flowing sine bands rather than a bar chart, and
 * each value counts up as its crest passes into view.
 */
export function MetricsWave() {
  const paths = useRef<(SVGPathElement | null)[]>([]);

  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    const draw = (phase: number) => {
      BANDS.forEach((b, i) => {
        paths.current[i]?.setAttribute('d', wavePath(phase * b.speed, b.amp, b.freq, b.base));
      });
    };
    draw(0);

    const counters = gsap.utils.toArray<HTMLElement>('[data-metric-value]', scope);
    counters.forEach((el) => {
      const target = Number(el.dataset.metricValue ?? 0);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });

    if (prefersReducedMotion()) return;

    const state = { phase: 0 };
    const flow = gsap.to(state, {
      phase: Math.PI * 2,
      duration: 11,
      repeat: -1,
      ease: 'none',
      onUpdate: () => draw(state.phase),
    });

    return () => flow.kill();
  });

  return (
    <section ref={scope} className="relative overflow-hidden border-t border-line-soft/50 py-24 md:py-32">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full"
        aria-hidden="true"
      >
        {BANDS.map((b, i) => (
          <path
            key={i}
            ref={(el) => {
              paths.current[i] = el;
            }}
            fill={b.fill}
            opacity={b.opacity}
          />
        ))}
      </svg>

      <div className="shell relative">
        <p className="label mb-12">By the numbers</p>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.05em] text-ink-100">
                  <span data-metric-value={m.value}>0</span>
                  <span className="text-brulee">{m.suffix}</span>
                </span>
                <span className="mt-4 block text-sm text-ink-45">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
