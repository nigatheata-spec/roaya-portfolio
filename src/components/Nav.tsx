import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navItems, studio } from '../lib/content';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
          className="font-display text-[1.35rem] font-extrabold tracking-[-0.05em] text-ink-100"
          aria-label={`${studio.name} — home`}
        >
          {studio.name}
          <span className="text-brulee">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `label transition-colors duration-300 hover:text-ink-100 ${
                  isActive ? 'text-brulee' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full border border-line px-5 py-2 text-[0.8rem] font-medium text-ink-100 transition-colors duration-300 hover:border-brulee"
          >
            <span className="absolute inset-0 -translate-y-full bg-brulee transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative transition-colors duration-300 group-hover:text-void">
              Start a project
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-ink-100 md:hidden"
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
              className="font-display text-3xl font-bold text-ink-100"
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex w-fit rounded-full bg-brulee px-5 py-2.5 text-sm font-medium text-void"
          >
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
