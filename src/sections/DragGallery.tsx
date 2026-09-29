import { GridBody, DraggableContainer, GridItem } from '../components/ui/infinite-drag-scroll';
import { usePick } from '../lib/language';
import { galleryImages as images } from '../lib/gallery';

const COPY = {
  label: { en: 'Archive', ar: 'الأرشيف' },
  title: { en: 'Drag to explore', ar: 'اسحب للاستكشاف' },
};

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
                <GridItem key={image.id} className="relative h-auto w-28 self-start md:w-44">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="pointer-events-none block h-auto w-full"
                    loading="lazy"
                    decoding="async"
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
