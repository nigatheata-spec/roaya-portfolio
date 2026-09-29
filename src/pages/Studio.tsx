import { Link } from 'react-router-dom';
import { principles, timeline, studio } from '../lib/content';
import { usePick } from '../lib/language';

const COPY = {
  eyebrow: { en: 'Studio', ar: 'الاستوديو' },
  whatWeHoldTo: { en: 'What we hold to', ar: 'ما نلتزم به' },
  howWeGotHere: { en: 'How we got here', ar: 'كيف وصلنا إلى هنا' },
  reelSays: {
    en: 'The reel says more than this page does.',
    ar: 'المقطع يقول أكثر مما تقوله هذه الصفحة.',
  },
  workingOutOf: { en: 'Working out of', ar: 'نعمل انطلاقاً من' },
  getInTouch: { en: 'Get in touch', ar: 'تواصل معنا' },
};

const FINAL = {
  en: 'We make films, and we stay with them until they are finished.',
  ar: 'نصنع الأفلام، ونبقى معها حتى تكتمل.',
};

export function Studio() {
  const pick = usePick();

  return (
    <div>
      <section className="shell pb-16 pt-40">
        <p className="label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-brulee" />
          {pick(COPY.eyebrow)}
        </p>
        <h1 className="text-mega font-extrabold">
          {studio.name}
        </h1>

        <p className="mt-12 max-w-3xl font-display text-[clamp(1.3rem,3vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink-100">
          {pick(FINAL)}
        </p>
      </section>

      <section className="bg-cream py-24">
        <div className="shell">
          <p className="label mb-14 text-on-cream-soft">{pick(COPY.whatWeHoldTo)}</p>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title.en}>
                <span className="font-display text-sm font-bold tracking-widest text-brulee">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-5 text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-on-cream">
                  {pick(p.title)}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-on-cream-soft">{pick(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="shell">
          <p className="label mb-14">{pick(COPY.howWeGotHere)}</p>
          <ol className="space-y-0">
            {timeline.map((t) => (
              <li
                key={t.year}
                className="group grid gap-4 border-t border-line-soft/70 py-9 md:grid-cols-[9rem_1fr_1.4fr] md:gap-10"
              >
                <span className="font-display text-2xl font-extrabold tracking-tight text-brulee transition-colors">
                  {t.year}
                </span>
                <h3 className="text-[1.25rem] font-bold tracking-[-0.03em]">{pick(t.title)}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-45">{pick(t.body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-28">
        <div className="shell">
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-line-soft/70 bg-surface/60 px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="text-minor max-w-lg font-bold">{pick(COPY.reelSays)}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-45">
                {pick(COPY.workingOutOf)} {studio.city}.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-cream px-6 py-3 text-sm font-medium text-on-cream transition-colors hover:bg-brulee"
              >
                {pick(COPY.getInTouch)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
