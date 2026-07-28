import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { navItems, studio, uiCopy } from '../lib/content';
import { useLanguage, usePick } from '../lib/language';

/** Routes whose first section sits on a cream surface, so the nav must invert. */
const LIGHT_TOP_ROUTES = ['/services', '/contact'];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, toggle } = useLanguage();
  const pick = usePick();

  // Labels translate, but the bar keeps its LTR layout so the logo stays left
  // and the CTA stays right in both languages.
  const arText = lang === 'ar' ? 'font-arabic-ui' : '';

  // Only while pinned over the light hero; once scrolled the bar gets its own dark fill.
  const onLight = LIGHT_TOP_ROUTES.includes(location.pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? 'border-b border-line-soft/70 bg-void/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex items-center justify-between py-5">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label={`${studio.name} — home`}
        >
          <img
            src={onLight ? '/media/brand/mark-black.png' : '/media/brand/mark-white.png'}
            alt=""
            className="h-8 w-8"
          />
          <span
            className={`font-display text-[1.35rem] font-extrabold tracking-[-0.05em] ${
              onLight ? 'text-on-cream' : 'text-ink-100'
            }`}
          >
            {studio.name}
            <span className="text-brulee">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `label transition-colors duration-300 ${arText} ${
                  onLight
                    ? 'text-on-cream-soft hover:text-on-cream'
                    : 'hover:text-ink-100'
                } ${isActive ? '!text-brulee' : ''}`
              }
            >
              {pick(item.label)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggle}
            className={`rounded-full border p-1.5 transition-colors duration-300 ${
              onLight
                ? 'border-on-cream/30 text-on-cream hover:border-brulee'
                : 'border-line text-ink-100 hover:border-brulee'
            }`}
            aria-label="Switch language"
          >
            <Globe size={18} />
          </button>
          <Link
            to="/contact"
            className={`group relative inline-flex items-center overflow-hidden rounded-full border px-5 py-2 text-[0.8rem] font-medium transition-colors duration-300 hover:border-brulee ${
              onLight ? 'border-on-cream/30 text-on-cream' : 'border-line text-ink-100'
            }`}
          >
            <span className="absolute inset-0 -translate-y-full bg-brulee transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span
              className={`relative transition-colors duration-300 group-hover:text-on-cream ${arText}`}
            >
              {pick(uiCopy.startProject)}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${onLight ? 'text-on-cream' : 'text-ink-100'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="shell flex flex-col gap-1 border-t border-line-soft/60 pb-8 pt-6 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={`text-3xl font-bold text-ink-100 ${
                lang === 'ar' ? 'font-arabic-ui' : 'font-display'
              }`}
            >
              {pick(item.label)}
            </NavLink>
          ))}
          <div className="mt-4 flex items-center gap-3">
            <Link
              to="/contact"
              className={`inline-flex w-fit rounded-full bg-brulee px-5 py-2.5 text-sm font-medium text-void ${arText}`}
            >
              {pick(uiCopy.startProject)}
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-line p-2 text-ink-100"
              aria-label="Switch language"
            >
              <Globe size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
