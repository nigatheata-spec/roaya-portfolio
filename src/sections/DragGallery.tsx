import { GridBody, DraggableContainer, GridItem } from '../components/ui/infinite-drag-scroll';
import { usePick } from '../lib/language';

const COPY = {
  label: { en: 'Archive', ar: 'الأرشيف' },
  title: { en: 'Drag to explore', ar: 'اسحب للاستكشاف' },
};

const images = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  alt: `Archive frame ${i + 1}`,
  src: `/media/work/gallery-${i + 1}.jpg`,
}));

export function DragGallery() {
  const pick = usePick();

  return (
    <section className="border-t border-line-soft/50 py-24 md:py-32">
      <div className="shell">
        <div className="mb-10">
          <p className="label mb-5">{pick(COPY.label)}</p>
          <h2 className="text-major max-w-xl">{pick(COPY.title)}</h2>
        </div>

        {/*
         * The vendored gallery hardcodes `h-dvh` on its own wrappers, so the
         * height is overridden here rather than by editing the component.
         */}
        <div
          dir="ltr"
          className="relative h-[70svh] overflow-hidden rounded-3xl border border-line-soft/70 [&_.h-dvh]:!h-full"
        >
          <DraggableContainer variant="masonry">
            <GridBody>
              {images.map((image) => (
                <GridItem key={image.id} className="relative h-40 w-28 md:h-64 md:w-44">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="pointer-events-none absolute h-full w-full object-cover"
                  />
                </GridItem>
              ))}
            </GridBody>
          </DraggableContainer>
        </div>
      </div>
    </section>
  );
}
