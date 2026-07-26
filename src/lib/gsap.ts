import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useLayoutEffect, useRef, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scopes a GSAP context to a container ref and reverts it on unmount, so
 * ScrollTriggers created inside never leak across route changes.
 */
export function useGsapContext<T extends HTMLElement>(
  setup: (ctx: { scope: T }) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    const el = scope.current;
    const ctx = gsap.context(() => setup({ scope: el }), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
