import { BgVideo } from '../components/BgVideo';
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
  { name: 'wide-1', title: 'Reel excerpt' },
  { name: 'wide-2', title: 'Reel excerpt' },
  { name: 'wide-3', title: 'Reel excerpt' },
  { name: 'wide-4', title: 'Reel excerpt' },
  { name: 'wide-5', title: 'Reel excerpt' },
  { name: 'wide-6', title: 'Reel excerpt' },
];

/** Vertical pieces, cut for social and mobile-first delivery. */
const VERTICAL = [
  { name: 'vert-1', title: 'Vertical cut' },
  { name: 'vert-2', title: 'Vertical cut' },
  { name: 'vert-3', title: 'Vertical cut' },
  { name: 'vert-4', title: 'Vertical cut' },
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
              key={clip.name}
              data-reel-wide
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <BgVideo
                src={`/media/reel/${clip.name}.mp4`}
                poster={`/media/reel/${clip.name}.jpg`}
                title={clip.title}
                aspect={i === 0 ? '21 / 9' : '16 / 9'}
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
            <div key={clip.name} data-reel-vert>
              <BgVideo
                src={`/media/reel/${clip.name}.mp4`}
                poster={`/media/reel/${clip.name}.jpg`}
                title={clip.title}
                aspect="9 / 16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
