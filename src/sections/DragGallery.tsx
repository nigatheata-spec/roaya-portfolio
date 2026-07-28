import { GridBody, DraggableContainer, GridItem } from '../components/ui/infinite-drag-scroll';
import { usePick } from '../lib/language';

const COPY = {
  label: { en: 'Archive', ar: 'الأرشيف' },
  title: { en: 'Drag to explore', ar: 'اسحب للاستكشاف' },
};

const images = [
  { id: 1, alt: 'Al-Warsha', src: '/media/work/al-warsha.jpg' },
  { id: 2, alt: 'Discovering Alrihla — Al Jazeera', src: '/media/work/alrihla-world-cup.jpg' },
  { id: 3, alt: 'Altar Solar Energy', src: '/media/work/altar-solar.jpg' },
  { id: 4, alt: 'CBot — Robolabs', src: '/media/work/cbot-robolabs.jpg' },
  { id: 5, alt: 'Ghayeb', src: '/media/work/ghayeb.jpg' },
  { id: 6, alt: 'LEGO Bridge — VFX', src: '/media/work/lego-vfx-bridge.jpg' },
  { id: 7, alt: 'Minimalism promo', src: '/media/work/promo-minimalism.jpg' },
  { id: 8, alt: 'Rekaz', src: '/media/work/rekaz.jpg' },
  { id: 9, alt: 'ShjSeen Hyperlapses', src: '/media/work/shjseen-hyperlapses.jpg' },
  { id: 10, alt: 'Generation Imagination — Total Yogurt', src: '/media/work/total-yogurt.jpg' },
];

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
