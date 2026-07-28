import { useEffect, useRef, useState } from 'react';

interface MediaProps {
  src: string;
  video?: string;
  alt: string;
  aspect?: string;
  /** Shown in the placeholder while the real asset is missing. */
  caption?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders the real asset once it exists at `src`. Until then it falls back to a
 * composed placeholder, so the layout reads as finished before media is dropped in.
 */
export function Media({
  src,
  video,
  alt,
  aspect = '16 / 9',
  caption,
  className = '',
  priority = false,
}: MediaProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden rounded-2xl bg-surface grain ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {!failed && video ? (
        inView && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster={src}
            muted
            loop
            playsInline
            autoPlay
            onError={() => setFailed(true)}
            onLoadedData={() => setLoaded(true)}
          >
            <source src={video} />
          </video>
        )
      ) : !failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
        />
      ) : null}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-line-soft/60">
          <svg
            viewBox="0 0 100 100"
            className="h-10 w-10 text-brulee-dim"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="10" fill="currentColor" stroke="none" />
            <path d="M50 8v12M50 80v12M8 50h12M80 50h12" strokeLinecap="round" />
          </svg>
          <span className="label text-ink-25">{caption ?? alt}</span>
        </div>
      )}
    </div>
  );
}
