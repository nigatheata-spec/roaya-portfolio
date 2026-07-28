import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { usePick } from '../lib/language';

const PROCESS = [
  {
    step: 'A',
    title: { en: 'Access first', ar: 'الوصول أولاً' },
    body: {
      en: 'Before anything is written we work out what we can actually get into, and who will talk. That answer shapes the film more than any treatment.',
      ar: 'قبل كتابة أي شيء نحدد ما يمكننا الوصول إليه فعلياً، ومن سيوافق على الحديث. هذه الإجابة تشكّل الفيلم أكثر من أي معالجة.',
    },
  },
  {
    step: 'B',
    title: { en: 'Shoot for the edit', ar: 'التصوير من أجل المونتاج' },
    body: {
      en: 'Coverage is planned against the cut we intend to make, not against a wishlist. It keeps schedules honest and the rushes usable.',
      ar: 'نخطط التغطية بناءً على النسخة التي ننوي إنجازها، لا بناءً على قائمة أمنيات. هذا يبقي الجدول واقعياً واللقطات قابلة للاستخدام.',
    },
  },
  {
    step: 'C',
    title: { en: 'Finish in house', ar: 'الإنجاز داخلياً' },
    body: {
      en: 'Edit, VFX, grade, and sound sit under one roof. Nothing is lost explaining the film to a new supplier halfway through.',
      ar: 'المونتاج والمؤثرات البصرية وتصحيح الألوان والصوت كلها تحت سقف واحد. لا شيء يضيع في شرح الفيلم لمورّد جديد في منتصف الطريق.',
    },
  },
  {
    step: 'D',
    title: { en: 'Deliver every version', ar: 'تسليم كل نسخة' },
    body: {
      en: 'Broadcast masters, verticals, cutdowns, and subtitled variants are specced at the start rather than scrambled for at the end.',
      ar: 'النسخ الرئيسية للبث، والعمودية، والمختصرة، والمترجمة تُحدد من البداية لا أن تُجهّز على عجل في النهاية.',
    },
  },
];

const COPY = {
  eyebrow: { en: 'Capability', ar: 'القدرات' },
  title: { en: 'Services', ar: 'الخدمات' },
  intro: {
    en: 'Six disciplines, one team. Most projects use more than one of them, which is the point of keeping them in the same building.',
    ar: 'ستة تخصصات، وفريق واحد. معظم المشاريع تستعين بأكثر من تخصص، وهذا بالضبط سبب إبقائها تحت سقف واحد.',
  },
  processLabel: { en: 'How a project runs', ar: 'كيف يسير المشروع' },
  ctaTitle: {
    en: 'Not sure which of these you need? That is usually the first conversation.',
    ar: 'لست متأكداً أي هذه الخدمات تحتاج؟ عادةً ما تبدأ من هنا أول محادثة بيننا.',
  },
  talkToUs: { en: 'Talk to us', ar: 'تحدث معنا' },
};

export function Services() {
  const pick = usePick();
  const scope = useGsapContext<HTMLDivElement>(({ scope }) => {
    if (prefersReducedMotion()) return;

    const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', scope);

    panels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { rotateX: -92, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: panel, start: 'top 88%' },
        },
      );
    });

    gsap.from('[data-services-head] > *', {
      y: 26,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    });
  });

  return (
    <div ref={scope}>
      <section className="bg-cream pb-20 pt-40">
        <div data-services-head className="shell">
          <p className="label mb-8 flex items-center gap-3 text-on-cream-soft">
            <span className="inline-block h-px w-8 bg-brulee" />
            {pick(COPY.eyebrow)}
          </p>
          <h1 className="text-mega font-extrabold text-on-cream">{pick(COPY.title)}</h1>
          <p className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-on-cream-soft">
            {pick(COPY.intro)}
          </p>
        </div>
      </section>

      <section className="bg-cream pb-28">
        <div className="shell" style={{ perspective: '1400px' }}>
          <div className="space-y-3">
            {services.map((s) => (
              <article
                key={s.index}
                data-panel
                className="origin-top rounded-2xl border border-on-cream/12 bg-cream-deep p-8 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)] md:p-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
                  <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-brulee md:w-24">
                    {s.index}
                  </span>
                  <div className="md:flex-1">
                    <h2 className="text-[1.6rem] font-bold tracking-[-0.03em] text-on-cream">
                      {pick(s.title)}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-cream-soft">
                      {pick(s.description)}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2 md:w-64 md:shrink-0">
                    {s.deliverables.map((d) => (
                      <li
                        key={d.en}
                        className="rounded-full border border-on-cream/20 px-3 py-1 text-xs text-on-cream-soft"
                      >
                        {pick(d)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="shell">
          <p className="label mb-12">{pick(COPY.processLabel)}</p>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {PROCESS.map((p) => (
              <div key={p.step} className="border-t border-line-soft/70 pt-6">
                <span className="font-display text-sm font-bold tracking-widest text-brulee">
                  {p.step}
                </span>
                <h3 className="mt-4 text-[1.25rem] font-bold tracking-[-0.03em]">
                  {pick(p.title)}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-45">
                  {pick(p.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="shell">
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-line-soft/70 bg-surface/60 px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
            <h2 className="text-minor max-w-lg font-bold">{pick(COPY.ctaTitle)}</h2>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-on-cream transition-colors hover:bg-brulee"
            >
              {pick(COPY.talkToUs)}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
