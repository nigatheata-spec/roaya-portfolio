interface VimeoClipProps {
  id: string;
  title: string;
  aspect?: string;
  className?: string;
}

/**
 * Silent looping Vimeo embed, cover-fitted like a background video.
 * Vimeo's `background=1` mode strips all chrome and forces autoplay+loop+mute,
 * so the iframe is scaled past its container and centred to fake object-fit: cover.
 */
export function VimeoClip({ id, title, aspect = '16 / 9', className = '' }: VimeoClipProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-surface ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&transparent=0`}
        title={title}
        allow="autoplay; fullscreen"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[177.78vh] min-h-full w-[56.25vw] min-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ border: 0 }}
      />
    </div>
  );
}
