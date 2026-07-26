import { gsap, SplitText, useGsapContext, prefersReducedMotion } from '../lib/gsap';

const STATEMENT =
  'Most of what we make takes longer than anyone expected. Access has to be earned, archive has to be found, and the edit is what decides whether any of it was worth doing.';

/**
 * Motion concept 43 — sweeping light bar reveal.
 * A soft blade of light scrubs across the statement; words brighten as it passes
 * and hold, so the sentence is written by the light rather than faded in wholesale.
 */
export function StatementLightBar() {
  const scope = useGsapContext<HTMLElement>(({ scope }) => {
    const target = scope.querySelector<HTMLElement>('[data-statement]');
    if (!target) return;

    if (prefersReducedMotion()) {
      gsap.set(target, { color: 'var(--color-ink-100)' });
      return;
    }

    const split = new SplitText(target, { type: 'words', wordsClass: 'stmt-word' });

    gsap.set(split.words, { color: 'var(--color-ink-25)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top 72%',
        end: 'bottom 62%',
        scrub: 0.8,
      },
    });

    tl.to('[data-lightbar]', {
      xPercent: 1150,
      ease: 'none',
      duration: 1,
    }).to(
      split.words,
      {
        color: 'var(--color-ink-100)',
        stagger: { each: 0.014, ease: 'none' },
        duration: 0.08,
        ease: 'none',
      },
      0,
    );

    return () => split.revert();
  });

  return (
    <section ref={scope} className="relative overflow-hidden border-t border-line-soft/50 py-28 md:py-40">
      <div
        data-lightbar
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-24 w-24 opacity-70 blur-2xl"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-brulee) 45%, transparent)',
        }}
      />
      <div className="shell relative">
        <p className="label mb-10">Position</p>
        <p
          data-statement
          className="max-w-4xl font-display text-[clamp(1.6rem,3.7vw,3.15rem)] font-medium leading-[1.14] tracking-[-0.03em]"
        >
          {STATEMENT}
        </p>
      </div>
    </section>
  );
}
