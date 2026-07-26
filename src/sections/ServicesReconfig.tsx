import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

/** Deterministic scatter so every render starts from the same disordered state. */
const scatter = (i: number) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const r = s - Math.floor(s);
  const s2 = Math.sin((i + 7) * 78.233) * 43758.5453;
  const r2 = s2 - Math.floor(s2);
  return {
    x: (r - 0.5) * 260,
    y: (r2 - 0.5) * 180,
    rotation: (r - 0.5) * 26,
    scale: 0.74 + r2 * 0.3,
  };
};

/**
 * Motion concept 14 — widget reconfiguration.
 * The service tiles arrive scattered and rotated, drift as though still settling,
 * then snap into a single resolved grid as the section reaches centre.
 */
export function ServicesReconfig() {
  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-widget]', scope);

    if (prefersReducedMotion()) {
      gsap.set(cards, { clearProps: 'all' });
      return;
    }

    cards.forEach((card, i) => gsap.set(card, scatter(i)));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top 78%',
        end: 'top 22%',
        scrub: 0.9,
      },
    });

    tl.to(cards, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      ease: 'power3.inOut',
      stagger: { each: 0.045, from: 'random' },
    }).to(
      '[data-widget-frame]',
      { borderColor: 'var(--color-line)', duration: 0.4, ease: 'none' },
      '>-0.2',
    );
  });

  return (
    <section ref={scope} className="relative border-t border-line-soft/50 py-24 md:py-32">
      <div className="shell">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-5">Capability</p>
            <h2 className="text-major max-w-xl">Everything under one roof</h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm text-ink-70 transition-colors hover:text-brulee"
          >
            How we work
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.index}
              data-widget
              className="group will-change-transform"
            >
              <div
                data-widget-frame
                className="h-full border border-line-soft/70 bg-surface/70 p-7 transition-colors duration-500 hover:border-brulee/60"
              >
                <div className="mb-8 flex items-baseline justify-between">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-brulee">
                    {s.index}
                  </span>
                  <span className="label opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {String(i + 1).padStart(2, '0')} / {services.length}
                  </span>
                </div>
                <h3 className="text-[1.3rem] font-bold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-45">{s.description}</p>
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="text-xs text-ink-25">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
