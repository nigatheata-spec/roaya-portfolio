import { clients } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';

/**
 * Connective tissue between the heavier set pieces: a single continuous track.
 * Deliberately quiet — the sections either side are doing the work.
 */
export function ClientsMarquee() {
  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) return;
    const track = scope.querySelector<HTMLElement>('[data-marquee-track]');
    if (!track) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 34,
      ease: 'none',
      repeat: -1,
    });

    return () => loop.kill();
  });

  const row = [...clients, ...clients];

  return (
    <section
      ref={scope}
      className="overflow-hidden border-y border-line-soft/50 py-8"
      aria-label="Selected clients"
    >
      <div data-marquee-track className="flex w-max items-center gap-14 pr-14">
        {row.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-ink-25"
            aria-hidden={i >= clients.length}
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
