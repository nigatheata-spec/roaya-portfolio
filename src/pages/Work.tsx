import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ShatterTitle } from '../components/ShatterTitle';
import { projects, disciplines, disciplineLabels, type Discipline } from '../lib/content';
import { gsap, useGsapContext } from '../lib/gsap';
import { usePick } from '../lib/language';

const COPY = {
  eyebrow: { en: 'Catalogue', ar: 'الكتالوج' },
  title: { en: 'Work', ar: 'الأعمال' },
  intro: {
    en: 'Documentary, drama, advertising, and broadcast promos. Long-form reporting sits alongside commercial work, and both are finished in the same room.',
    ar: 'أفلام وثائقية ودراما وإعلانات وبرومو تلفزيوني. الأعمال الطويلة تقف جنباً إلى جنب مع الأعمال التجارية، وكلاهما يُنجز في الاستوديو نفسه.',
  },
  archiveTitle: {
    en: 'The full archive runs well past what is shown here.',
    ar: 'الأرشيف الكامل يتجاوز بكثير ما هو معروض هنا.',
  },
  archiveBody: {
    en: 'Ask us for reels cut to a specific brief, a region, or a format.',
    ar: 'اطلب منا مقاطع مُجهّزة وفق متطلب محدد، أو منطقة، أو صيغة بعينها.',
  },
  requestReel: { en: 'Request a reel', ar: 'اطلب مقطعاً' },
};

export function Work() {
  const pick = usePick();
  const [active, setActive] = useState<Discipline | 'All'>('All');

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.discipline === active)),
    [active],
  );

  const scope = useGsapContext<HTMLDivElement>(
    ({ scope }) => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-project]', scope);
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.045 },
      );
    },
    [active],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set('All', projects.length);
    projects.forEach((p) => map.set(p.discipline, (map.get(p.discipline) ?? 0) + 1));
    return map;
  }, []);

  return (
    <>
      <section className="shell pb-16 pt-40">
        <p className="label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-brulee" />
          {pick(COPY.eyebrow)}
        </p>
        <ShatterTitle className="text-mega font-extrabold">{pick(COPY.title)}</ShatterTitle>
        <p className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-ink-70">
          {pick(COPY.intro)}
        </p>
      </section>

      <section className="shell pb-28">
        <div className="mb-10 flex flex-wrap gap-2 border-b border-line-soft/60 pb-6">
          {disciplines.map((d) => {
            const isActive = active === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setActive(d)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-colors duration-300 ${
                  isActive
                    ? 'border-brulee bg-brulee text-void'
                    : 'border-line-soft text-ink-45 hover:border-line hover:text-ink-100'
                }`}
              >
                {pick(disciplineLabels[d])}
                <span className="ml-2 opacity-60">{counts.get(d) ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div ref={scope} className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug} data-project className="group">
              <div className="relative overflow-hidden rounded-2xl">
                <Media
                  src={p.poster}
                  alt={p.client ? `${p.title} — ${p.client}` : p.title}
                  aspect="16 / 9"
                  caption={p.title}
                  className="brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[0.7rem] font-medium text-ink-100 backdrop-blur-sm">
                  {p.runtime}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-[1.2rem] font-bold leading-tight tracking-[-0.03em]">
                    {p.title}
                  </h2>
                  <span className="label shrink-0">{pick(disciplineLabels[p.discipline])}</span>
                </div>
                {p.client && <p className="mt-1.5 text-sm text-brulee">{p.client}</p>}
                <p className="mt-3 text-sm leading-relaxed text-ink-45">{pick(p.summary)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-minor max-w-lg font-bold text-on-cream">
              {pick(COPY.archiveTitle)}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-on-cream-soft">
              {pick(COPY.archiveBody)}
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-on-cream px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-brulee"
          >
            {pick(COPY.requestReel)}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
