import { gsap, SplitText, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { useLanguage } from '../lib/language';

/**
 * Motion concept 55 — shatter then reform.
 * The heading starts as fragments scattered through space and is pulled back into
 * alignment, rather than fading up as a block.
 *
 * Skipped for Arabic: splitting into chars breaks cursive letter joining, so
 * the word reads as disconnected fragments even after it "reforms".
 */
export function ShatterTitle({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  const { lang } = useLanguage();

  const scope = useGsapContext<HTMLHeadingElement>(({ scope }) => {
    if (prefersReducedMotion() || lang === 'ar') return;

    const split = new SplitText(scope, { type: 'chars' });

    gsap.from(split.chars, {
      x: () => gsap.utils.random(-380, 380),
      y: () => gsap.utils.random(-220, 220),
      rotation: () => gsap.utils.random(-90, 90),
      scale: () => gsap.utils.random(0.3, 1.9),
      opacity: 0,
      duration: 1.35,
      ease: 'power4.out',
      stagger: { each: 0.022, from: 'random' },
    });

    return () => split.revert();
  }, [lang]);

  return (
    <h1 ref={scope} className={className}>
      {children}
    </h1>
  );
}
