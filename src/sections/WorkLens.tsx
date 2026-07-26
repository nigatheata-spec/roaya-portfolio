import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Media } from '../components/Media';
import { projects } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

const FEATURED = projects.filter((p) => p.featured).slice(0, 4);

/**
 * Motion concept 23 — liquid lens zoom.
 * A drifting glass lens trails the cursor; wherever it passes, a masked second
 * treatment of the frame refracts through, as though another cut sits beneath.
 */
export function WorkLens() {
  const lens = useRef<HTMLDivElement>(null);

  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    gsap.from('[data-work-card]', {
      y: 46,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '[data-work-grid]', start: 'top 82%' },
    });

    if (prefersReducedMotion() || !lens.current) return;

    gsap.set(lens.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    const toX = gsap.quickTo(lens.current, 'x', { duration: 0.5, ease: 'power3' });
    const toY = gsap.quickTo(lens.current, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e: PointerEvent) => {
      const r = scope.getBoundingClientRect();
      toX(e.clientX - r.left);
      toY(e.clientY - r.top);
    };
    const show = () =>
      gsap.to(lens.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    const hide = () =>
      gsap.to(lens.current, { scale: 0, opacity: 0, duration: 0.4, ease: 'power3.in' });

    scope.addEventListener('pointermove', move);
    scope.addEventListener('pointerenter', show);
    scope.addEventListener('pointerleave', hide);

    return () => {
      scope.removeEventListener('pointermove', move);
      scope.removeEventListener('pointerenter', show);
      scope.removeEventListener('pointerleave', hide);
    };
  });

  const trackLocal = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lx', `${e.clientX - r.left}px`);
    el.style.setProperty('--ly', `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={scope}
      id="work"
      className="relative border-t border-line-soft/50 py-24 md:py-32"
    >
      <div
        ref={lens}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-30 hidden h-40 w-40 rounded-full md:block"
        style={{
          background:
            'radial-gradient(circle at 34% 28%, rgba(220,215,201,0.20), rgba(162,123,91,0.07) 55%, transparent 72%)',
          border: '1px solid rgba(220,215,201,0.22)',
          boxShadow:
            'inset 0 2px 22px rgba(220,215,201,0.16), inset 0 -10px 26px rgba(162,123,91,0.14), 0 14px 44px rgba(0,0,0,0.42)',
          backdropFilter: 'brightness(1.22) saturate(1.5) contrast(1.04)',
        }}
      />

      <div className="shell">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-5">Selected work</p>
            <h2 className="text-major max-w-xl">Films we would show you first</h2>

          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm text-ink-70 transition-colors hover:text-brulee"
          >
            All projects
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div data-work-grid className="grid gap-5 md:grid-cols-2">
          {FEATURED.map((p, i) => (
            <article
              key={p.slug}
              data-work-card
              onPointerMove={trackLocal}
              className={`group relative overflow-hidden ${
                i % 3 === 0 ? 'md:col-span-2' : ''
              }`}
              style={{ '--lx': '50%', '--ly': '50%' } as React.CSSProperties}
            >
              <div className="relative overflow-hidden">
                <Media
                  src={p.poster}
                  alt={p.client ? `${p.title} — ${p.client}` : p.title}
                  aspect={i % 3 === 0 ? '21 / 9' : '4 / 3'}
                  caption={`${p.title} — still`}
                  className="scale-[1.005] brightness-[0.94] saturate-[0.82] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:brightness-100"
                />

                {/* The refracted alternate treatment, masked to the lens position. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                  style={{
                    maskImage:
                      'radial-gradient(circle 88px at var(--lx) var(--ly), #000 0 42%, transparent 78%)',
                    WebkitMaskImage:
                      'radial-gradient(circle 88px at var(--lx) var(--ly), #000 0 42%, transparent 78%)',
                  }}
                >
                  <Media
                    src={p.poster}
                    alt=""
                    aspect={i % 3 === 0 ? '21 / 9' : '4 / 3'}
                    caption={p.discipline}
                    className="scale-[1.09] brightness-[1.18] saturate-[1.35] contrast-[1.06]"
                  />
                  <div className="absolute inset-0 bg-brulee/12 mix-blend-overlay" />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              </div>

              <div className="flex items-start justify-between gap-6 pt-5">
                <div>
                  <h3 className="text-[1.35rem] font-bold tracking-[-0.03em]">{p.title}</h3>
                  {p.client && <p className="mt-1.5 text-sm text-ink-45">{p.client}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <p className="label">{p.discipline}</p>
                  <p className="mt-1.5 text-sm text-ink-25">{p.runtime}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
