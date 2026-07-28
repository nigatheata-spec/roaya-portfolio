import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Media } from '../components/Media';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { usePick } from '../lib/language';

const LINES = ['WE STAY', 'WITH THE', 'STORY'];

const COPY = {
  label: { en: 'Media house — Riyadh', ar: 'بيت إعلامي — الرياض' },
  h1: { en: 'We stay with the story', ar: 'نبقى مع القصة' },
  intro: {
    en: 'Roaya is a film studio working across documentary, drama, and advertising. Long-form reporting, commercial work, and everything finished in house.',
    ar: 'رؤية استوديو أفلام يعمل في مجالات الأفلام الوثائقية والدراما والإعلان. أعمال طويلة، ومشاريع تجارية، وكل شيء يُنجز داخلياً.',
  },
  selectedWork: { en: 'Selected work', ar: 'أعمال مختارة' },
};

/**
 * Motion concept 18 — Ink Flow Reveal.
 * A displaced gradient mask sweeps across the wordmark so the type appears to be
 * painted into existence by flowing ink rather than wiped in by a hard edge.
 */
export function HeroInkFlow() {
  const pick = usePick();
  const stops = useRef<(SVGStopElement | null)[]>([]);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);

  const scope = useGsapContext<HTMLElement>(() => {
    const setProgress = (p: number) => {
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const [s0, s1, s2, s3] = stops.current;
      s0?.setAttribute('offset', '0');
      s1?.setAttribute('offset', String(clamp(p)));
      s2?.setAttribute('offset', String(clamp(p + 0.06)));
      s3?.setAttribute('offset', '1');
    };

    if (prefersReducedMotion()) {
      setProgress(1.1);
      gsap.set('[data-hero-fade]', { opacity: 1, y: 0 });
      return;
    }

    setProgress(-0.1);

    const state = { p: -0.1 };
    const tl = gsap.timeline({ delay: 0.25 });

    tl.to(state, {
      p: 1.1,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(state.p),
    })
      .fromTo(
        disp.current,
        { attr: { scale: 130 } },
        { attr: { scale: 26 }, duration: 2.6, ease: 'power3.out' },
        0,
      )
      .from(
        '[data-hero-fade]',
        { opacity: 0, y: 26, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
        1.1,
      )
      .fromTo(
        '[data-hero-bg]',
        { scale: 1.14, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.8, ease: 'power2.out' },
        0,
      );

    // Ambient drift so the ink edge keeps breathing after it settles.
    gsap.to(turb.current, {
      attr: { baseFrequency: '0.016 0.024' },
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => tl.kill();
  });

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-10 pt-32"
    >
      <div data-hero-bg className="absolute inset-0">
        <Media
          src="/media/hero/showreel-poster.jpg"
          video="/media/hero/showreel.mp4"
          alt="Roaya showreel"
          aspect="auto"
          caption="Showreel — 16:9"
          className="h-full w-full rounded-none opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void/60" />
      </div>

      <div className="shell relative">
        <p data-hero-fade className="label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-brulee" />
          {pick(COPY.label)}
        </p>
      </div>

      <div className="shell relative">
        <h1 className="sr-only">{pick(COPY.h1)}</h1>
        <svg
          viewBox="0 0 1000 400"
          className="w-full max-h-[48svh]"
          aria-hidden="true"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            <filter id="ink-turbulence" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                ref={turb}
                type="fractalNoise"
                baseFrequency="0.011 0.019"
                numOctaves="4"
                seed="11"
                result="noise"
              />
              <feDisplacementMap
                ref={disp}
                in="SourceGraphic"
                in2="noise"
                scale="130"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <linearGradient id="ink-sweep" x1="0" y1="0" x2="1" y2="0.12">
              <stop ref={(el) => { stops.current[0] = el; }} offset="0" stopColor="#fff" />
              <stop ref={(el) => { stops.current[1] = el; }} offset="0" stopColor="#fff" />
              <stop ref={(el) => { stops.current[2] = el; }} offset="0.06" stopColor="#000" />
              <stop ref={(el) => { stops.current[3] = el; }} offset="1" stopColor="#000" />
            </linearGradient>

            <mask id="ink-mask">
              <rect
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                fill="url(#ink-sweep)"
                filter="url(#ink-turbulence)"
              />
            </mask>
          </defs>

          <g mask="url(#ink-mask)" fill="var(--color-ink-100)">
            {LINES.map((line, i) => (
              <text
                key={line}
                x="0"
                y={114 + i * 134}
                fontFamily="Milea Serif, Bricolage Grotesque, serif"
                fontWeight="800"
                fontSize="138"
                letterSpacing="-6"
              >
                {line}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="shell relative flex flex-col gap-8 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <p data-hero-fade className="max-w-md text-[0.95rem] leading-relaxed text-ink-70">
          {pick(COPY.intro)}
        </p>
        <a
          data-hero-fade
          href="#work"
          className="group flex shrink-0 items-center gap-3 text-ink-45 transition-colors hover:text-ink-100"
        >
          <span className="label">{pick(COPY.selectedWork)}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brulee">
            <ArrowDown
              size={15}
              className="transition-transform duration-500 group-hover:translate-y-0.5"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
