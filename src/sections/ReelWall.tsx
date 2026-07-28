import { VimeoClip } from '../components/VimeoClip';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { usePick } from '../lib/language';

const COPY = {
  label: { en: 'In motion', ar: 'قيد الحركة' },
  title: { en: 'Cuts from the floor', ar: 'مقاطع من غرفة المونتاج' },
  body: {
    en: 'Recent pieces, finished in house. Every project leaves with the wide master and the vertical cutdowns specced from the start, not scrambled for at the end.',
    ar: 'أعمال حديثة، أُنجزت داخلياً. كل مشروع يخرج بالنسخة الرئيسية العريضة والنسخ العمودية المحددة من البداية، لا التي تُجهّز على عجل في النهاية.',
  },
};

/** Landscape-framed pieces. */
const WIDE = [
  { id: '1213542850', title: 'Reel excerpt' },
  { id: '1213541580', title: 'Long-form excerpt' },
  { id: '1213539687', title: 'Feature excerpt' },
  { id: '1213694218', title: 'Reel excerpt' },
  { id: '1213694220', title: 'Reel excerpt' },
  { id: '1213694221', title: 'Reel excerpt' },
  { id: '1213694219', title: 'Reel excerpt' },
];

/** Vertical pieces, cut for social and mobile-first delivery. */
const VERTICAL = [
  { id: '1213539779', title: 'Vertical cut' },
  { id: '1213539685', title: 'Vertical cut' },
  { id: '1213539750', title: 'Vertical cut' },
  { id: '1213539686', title: 'Vertical cut' },
];

/**
 * Mixed-orientation wall of recent pieces. Wide cuts sit on top, the vertical
 * deliverables run beneath, so the section shows both formats we finish in.
 */
export function ReelWall() {
  const pick = usePick();
  const scope = useGsapContext<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from('[data-reel-head] > *', {
      y: 26,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-reel-head]', start: 'top 82%' },
    });

    gsap.from('[data-reel-wide]', {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-reel-wide-grid]', start: 'top 85%' },
    });

    gsap.from('[data-reel-vert]', {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '[data-reel-vert-grid]', start: 'top 88%' },
    });
  });

  return (
    <section ref={scope} className="relative border-t border-on-cream/12 bg-cream py-24 md:py-32">
      <div className="shell">
        <div data-reel-head className="mb-14 max-w-2xl">
          <p className="label mb-5 text-on-cream-soft">{pick(COPY.label)}</p>
          <h2 className="text-major text-on-cream">{pick(COPY.title)}</h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-on-cream-soft">
            {pick(COPY.body)}
          </p>
        </div>

        <div dir="ltr" data-reel-wide-grid className="grid gap-3 md:grid-cols-2">
          {WIDE.map((clip, i) => (
            <div
              key={clip.id}
              data-reel-wide
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <VimeoClip
                id={clip.id}
                title={clip.title}
                aspect={i === 0 ? '21 / 9' : '16 / 9'}
                videoAspect="16 / 9"
              />
            </div>
          ))}
        </div>

        <div
          dir="ltr"
          data-reel-vert-grid
          className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {VERTICAL.map((clip) => (
            <div key={clip.id} data-reel-vert>
              <VimeoClip
                id={clip.id}
                title={clip.title}
                aspect="9 / 16"
                videoAspect="9 / 16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
