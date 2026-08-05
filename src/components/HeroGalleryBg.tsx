import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { galleryImages } from '../lib/gallery';

/** Three staggered slices of the archive, each row a different length so the loop doesn't sync up. */
const ROWS = [galleryImages.slice(0, 8), galleryImages.slice(8, 16), galleryImages.slice(16, 23)];

/**
 * Decorative, non-interactive backdrop for the hero — the same archive images
 * used in the "Drag to explore" gallery, drifting slowly behind the headline.
 * Deliberately not draggable: this sits behind live nav/CTA hit areas, so it
 * can't hijack pointer or wheel input the way the interactive gallery does.
 */
export function HeroGalleryBg() {
  const scope = useGsapContext<HTMLDivElement>(({ scope }) => {
    if (prefersReducedMotion()) return;
    const tracks = scope.querySelectorAll<HTMLElement>('[data-marquee-track]');

    const loops = Array.from(tracks).map((track, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      return gsap.to(track, {
        xPercent: dir * 50,
        duration: 46 + i * 14,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => loops.forEach((l) => l.kill());
  });

  return (
    <div ref={scope} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="flex h-full -rotate-2 scale-110 flex-col justify-center gap-4">
        {ROWS.map((row, i) => {
          const doubled = [...row, ...row];
          return (
            <div key={i} data-marquee-track className="flex w-max gap-4">
              {doubled.map((img, j) => (
                <div
                  key={`${img.id}-${j}`}
                  className="h-32 w-48 shrink-0 overflow-hidden rounded-xl bg-surface md:h-44 md:w-64"
                >
                  <img src={img.src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
