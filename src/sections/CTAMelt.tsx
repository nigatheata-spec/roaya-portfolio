import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { studio } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

const BARS = 16;

/**
 * Motion concept 21 — melt to text.
 * A sheet of liquid metal covers the panel and drains downward at uneven speeds.
 * A gooey alpha filter fuses neighbouring columns so the sheet strands and drips
 * instead of sliding, and the headline underneath is left crisp.
 */
export function CTAMelt() {
  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) {
      gsap.set('[data-melt-bar]', { yPercent: 110 });
      gsap.set('[data-melt-content]', { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top 84%',
        end: 'bottom 78%',
        scrub: 1,
      },
    });

    tl.to('[data-melt-bar]', {
      yPercent: 118,
      scaleY: 1.5,
      ease: 'power2.in',
      stagger: { each: 0.05, from: 'edges' },
    }).fromTo(
      '[data-melt-content]',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.35,
    );
  });

  return (
    <section ref={scope} className="border-t border-line-soft/50 py-24 md:py-32">
      <div className="shell">
        <div className="relative overflow-hidden border border-line-soft/70 bg-surface/50 px-6 py-24 md:px-16 md:py-32">
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <defs>
              <filter id="melt-goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                />
              </filter>
            </defs>
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex"
            style={{ filter: 'url(#melt-goo)' }}
          >
            {Array.from({ length: BARS }).map((_, i) => (
              <span
                key={i}
                data-melt-bar
                className="h-full flex-1 origin-top bg-inkwell"
                style={{ marginInline: '-1px' }}
              />
            ))}
          </div>

          <div data-melt-content className="relative z-10 text-center">
            <p className="label mb-7">Next step</p>
            <h2 className="text-major mx-auto max-w-3xl">
              Tell us what you are trying to say. We will work out how to film it.
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-lait px-7 py-3.5 text-sm font-medium text-void transition-colors hover:bg-brulee"
              >
                Start a project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={`mailto:${studio.email}`}
                className="text-sm text-ink-45 transition-colors hover:text-ink-100"
              >
                or email {studio.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
