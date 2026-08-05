import { BgVideo } from '../components/BgVideo';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { usePick } from '../lib/language';

const COPY = {
  label: { en: 'Cinematic AI', ar: 'ذكاء اصطناعي سينمائي' },
  title: {
    en: 'Generated footage, shot like film',
    ar: 'لقطات مولّدة، مصوّرة كالسينما',
  },
  body: {
    en: 'Most AI video reads as AI video — flat motion, no camera logic, nothing a cinematographer would sign off on. We direct it the way we direct a shoot: tracking, handheld, reveals, blocking. The output holds up next to footage we captured on location.',
    ar: 'معظم مقاطع الذكاء الاصطناعي تُكشف من النظرة الأولى: حركة مسطّحة، وكاميرا بلا منطق، ولا شيء يوافق عليه مدير تصوير. نحن نُخرجها كما نُخرج أي تصوير حقيقي: حركة تتبّع، وكاميرا محمولة، ولقطات كشف، وتوزيع محسوب داخل الكادر. والنتيجة تصمد إلى جانب ما نصوّره في المواقع.',
  },
};

const CLIPS = [
  { name: 'tracking', title: 'Tracking shot — AI-generated' },
  { name: 'reveal', title: 'Reveal shot — AI-generated' },
  { name: 'handheld', title: 'Handheld shot — AI-generated' },
  { name: 'camera-tracking', title: 'Camera tracking — AI-generated' },
  { name: 'composited', title: 'Composited plate — AI-generated' },
  { name: 'extended', title: 'Extended plate — AI-generated' },
];

/**
 * Positions cinematic AI as the studio's edge over generic "AI slop" — real
 * camera language (tracking, handheld, reveals) applied to generated footage.
 */
export function CinematicAI() {
  const pick = usePick();
  const scope = useGsapContext<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from('[data-cai-head] > *', {
      y: 26,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '[data-cai-head]', start: 'top 82%' },
    });

    gsap.from('[data-cai-clip]', {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '[data-cai-grid]', start: 'top 85%' },
    });
  });

  return (
    <section ref={scope} className="relative border-t border-line-soft/50 py-24 md:py-32">
      <div className="shell">
        <div data-cai-head className="mb-14 max-w-2xl">
          <p className="label mb-5">{pick(COPY.label)}</p>
          <h2 className="text-major">{pick(COPY.title)}</h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-70">
            {pick(COPY.body)}
          </p>
        </div>

        <div dir="ltr" data-cai-grid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLIPS.map((clip) => (
            <div key={clip.name} data-cai-clip>
              <BgVideo
                src={`/media/ai/${clip.name}.mp4`}
                poster={`/media/ai/${clip.name}.jpg`}
                title={clip.title}
                aspect="4 / 3"
                className="rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
