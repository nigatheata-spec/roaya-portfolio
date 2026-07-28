import { useEffect, useRef, useState } from 'react';

interface VimeoClipProps {
  id: string;
  title: string;
  /** Container aspect, as a CSS aspect-ratio string. */
  aspect?: string;
  /** Source video aspect, so the frame can be cover-fitted without bars. */
  videoAspect?: string;
  className?: string;
}

/** Parses "16 / 9" (or "1.78") into a number. */
function ratio(value: string): number {
  const [w, h] = value.split('/').map((part) => Number(part.trim()));
  return h ? w / h : w;
}

/**
 * Silent looping Vimeo embed, cover-fitted like a background video.
 * Vimeo's `background=1` mode strips all chrome and forces autoplay+loop+mute.
 * The iframe keeps the source video's aspect and is scaled up on whichever axis
 * is short, then centred — the same result as `object-fit: cover`, which an
 * iframe cannot do on its own.
 *
 * The iframe itself doesn't mount until the card nears the viewport — with a
 * dozen+ of these on one page, mounting them all at once means a dozen
 * simultaneous video streams fighting for bandwidth on load.
 */
export function VimeoClip({
  id,
  title,
  aspect = '16 / 9',
  videoAspect = '16 / 9',
  className = '',
}: VimeoClipProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
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
  }, []);

  const boxAR = ratio(aspect);
  const videoAR = ratio(videoAspect);

  const overflows = videoAR >= boxAR;
  const width = overflows ? `${(videoAR / boxAR) * 100}%` : '100%';
  const height = overflows ? '100%' : `${(boxAR / videoAR) * 100}%`;

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden rounded-2xl bg-surface ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {inView && (
        <iframe
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&transparent=0`}
          title={title}
          allow="autoplay; fullscreen"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width, height, border: 0 }}
        />
      )}
    </div>
  );
}
