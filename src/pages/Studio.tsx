import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { principles, timeline, studio } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

const DRAFTS = [
  'We are a full-service creative agency.',
  'We are storytellers with a passion for—',
  'We make films.',
];

const FINAL = 'We make films, and we stay with them until they are finished.';

export function Studio() {
  const typed = useRef<HTMLSpanElement>(null);

  const scope = useGsapContext<HTMLDivElement>(() => {
    const el = typed.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = FINAL;
      return;
    }

    const tl = gsap.timeline({ delay: 0.4 });
    const write = (text: string, hold: number, erase: boolean) => {
      const state = { n: 0 };
      tl.to(state, {
        n: text.length,
        duration: text.length * 0.028,
        ease: 'none',
        onUpdate: () => {
          el.textContent = text.slice(0, Math.round(state.n));
        },
      }).to({}, { duration: hold });

      if (erase) {
        tl.to(state, {
          n: 0,
          duration: text.length * 0.012,
          ease: 'none',
          onUpdate: () => {
            el.textContent = text.slice(0, Math.round(state.n));
          },
        });
      }
    };

    // The drafts get discarded; the last line is the one that stays.
    DRAFTS.forEach((d) => write(d, 0.55, true));
    write(FINAL, 0, false);

    gsap.to('[data-caret]', {
      opacity: 0,
      duration: 0.45,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    });

    return () => tl.kill();
  });

  return (
    <div ref={scope}>
      <section className="shell pb-16 pt-40">
        <p className="label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-brulee" />
          Studio
        </p>
        <h1 className="text-mega font-extrabold">Roaya</h1>

        <p className="mt-12 min-h-[5.5rem] max-w-3xl font-display text-[clamp(1.3rem,3vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink-100 sm:min-h-[7rem]">
          <span ref={typed} />
          <span data-caret className="ml-1 inline-block w-[3px] translate-y-1 self-center bg-brulee align-middle" style={{ height: '0.9em' }} />
        </p>
      </section>

      <section className="bg-cream py-24">
        <div className="shell">
          <p className="label mb-14 text-on-cream-soft">What we hold to</p>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title}>
                <span className="font-display text-sm font-bold tracking-widest text-brulee">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-5 text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-on-cream">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-on-cream-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="shell">
          <p className="label mb-14">How we got here</p>
          <ol className="space-y-0">
            {timeline.map((t) => (
              <li
                key={t.year}
                className="group grid gap-4 border-t border-line-soft/70 py-9 md:grid-cols-[9rem_1fr_1.4fr] md:gap-10"
              >
                <span className="font-display text-2xl font-extrabold tracking-tight text-brulee transition-colors">
                  {t.year}
                </span>
                <h3 className="text-[1.25rem] font-bold tracking-[-0.03em]">{t.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-45">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-28">
        <div className="shell">
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-line-soft/70 bg-surface/60 px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="text-minor max-w-lg font-bold">
                The reel says more than this page does.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-45">
                Formerly {studio.formerly}. Now working out of {studio.city}.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={studio.vimeo}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink-100 transition-colors hover:border-brulee"
              >
                Vimeo
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-cream px-6 py-3 text-sm font-medium text-on-cream transition-colors hover:bg-brulee"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
