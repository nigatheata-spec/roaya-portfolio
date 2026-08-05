import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { navItems, studio } from '../lib/content';
import { useLanguage, usePick } from '../lib/language';

const COPY = {
  pitch: { en: 'Have something worth filming?', ar: 'لديك ما يستحق التصوير؟' },
  pages: { en: 'Pages', ar: 'الصفحات' },
  studio: { en: 'Studio', ar: 'الاستوديو' },
  social: { en: 'Social', ar: 'التواصل' },
  rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
};

export function Footer() {
  const pick = usePick();
  const { lang } = useLanguage();

  // Like the nav, the footer keeps its LTR layout in both languages —
  // only the text is localised.
  const arText = lang === 'ar' ? 'font-arabic-ui' : '';

  return (
    <footer className="relative border-t border-line-soft/70 bg-black pt-20">
      <div className="shell">
        <div className="flex flex-col gap-12 pb-16 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p
              className={`text-minor font-bold text-ink-100 ${
                lang === 'ar' ? 'font-arabic-ui leading-snug' : 'font-display'
              }`}
            >
              {pick(COPY.pitch)}
            </p>
            <a
              href={`mailto:${studio.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-ink-70 transition-colors hover:text-brulee"
            >
              {studio.email}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <p className={`label mb-4 ${arText}`}>{pick(COPY.pages)}</p>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`text-sm text-ink-70 transition-colors hover:text-ink-100 ${arText}`}
                    >
                      {pick(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`label mb-4 ${arText}`}>{pick(COPY.studio)}</p>
              <ul className={`space-y-2.5 text-sm text-ink-70 ${arText}`}>
                <li>{lang === 'ar' ? 'الرياض، السعودية' : studio.city}</li>
                <li dir="ltr" className="w-fit">
                  {studio.phone}
                </li>
              </ul>
            </div>
            <div>
              <p className={`label mb-4 ${arText}`}>{pick(COPY.social)}</p>
              <ul className="space-y-2.5">
                {['Instagram', 'LinkedIn'].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-sm text-ink-70 transition-colors hover:text-ink-100"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`shell flex flex-col gap-2 border-t border-line-soft/50 py-6 text-xs text-ink-25 sm:flex-row sm:justify-between ${arText}`}
      >
        <p>
          © {new Date().getFullYear()} {lang === 'ar' ? studio.arabicName : studio.name}.{' '}
          {pick(COPY.rights)}
        </p>
        <p>{pick(studio.tagline)}</p>
      </div>
    </footer>
  );
}
