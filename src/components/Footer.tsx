import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { navItems, studio } from '../lib/content';
import { gsap, useGsapContext } from '../lib/gsap';

export function Footer() {
  const scope = useGsapContext<HTMLElement>(() => {
    gsap.from('[data-footer-mark] span', {
      yPercent: 115,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: '[data-footer-mark]', start: 'top 92%' },
    });
  });

  return (
    <footer ref={scope} className="relative border-t border-line-soft/70 bg-black pt-20">
      <div className="shell">
        <div className="flex flex-col gap-12 pb-16 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-minor font-display font-bold text-ink-100">
              Have something worth filming?
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
              <p className="label mb-4">Pages</p>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-ink-70 transition-colors hover:text-ink-100"
                    >
                      {item.label.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-4">Studio</p>
              <ul className="space-y-2.5 text-sm text-ink-70">
                <li>{studio.city}</li>
                <li>{studio.phone}</li>
              </ul>
            </div>
            <div>
              <p className="label mb-4">Social</p>
              <ul className="space-y-2.5">
                {['Instagram', 'Vimeo', 'LinkedIn'].map((s) => (
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
        data-footer-mark
        className="shell flex justify-between overflow-hidden pb-6"
        aria-hidden="true"
      >
        {studio.name.split('').map((ch, i) => (
          <span
            key={i}
            className="inline-block font-display text-[clamp(4rem,19vw,17rem)] font-extrabold leading-[0.78] tracking-[-0.06em] text-white"
          >
            {ch}
          </span>
        ))}
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line-soft/50 py-6 text-xs text-ink-25 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {studio.name}. All rights reserved.
        </p>
        <p>{studio.tagline}</p>
      </div>
    </footer>
  );
}
