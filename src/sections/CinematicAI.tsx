import { VimeoClip } from '../components/VimeoClip';
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
    ar: 'معظم فيديوهات الذكاء الاصطناعي تبدو كما هي — حركة مسطحة، بلا منطق كاميرا، ولا شيء يوافق عليه مدير تصوير. نحن نخرجها كما نخرج التصوير الحقيقي: تتبع، كاميرا محمولة، كشف تدريجي، وتوزيع المشهد. والنتيجة تصمد إلى جانب ما صوّرناه في المواقع.',
  },
};

const CLIPS = [
  { id: '1213406495', title: 'Tracking shot — AI-generated' },
  { id: '1213406541', title: 'Reveal shot — AI-generated' },
  { id: '1213406567', title: 'Handheld shot — AI-generated' },
  { id: '1213406494', title: 'Camera tracking — AI-generated' },
  { id: '1213406492', title: 'Composited plate — AI-generated' },
  { id: '1213406493', title: 'Extended plate — AI-generated' },
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
            <div key={clip.id} data-cai-clip>
              <VimeoClip
                id={clip.id}
                title={clip.title}
                aspect="4 / 3"
                videoAspect="16 / 9"
                className="rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
