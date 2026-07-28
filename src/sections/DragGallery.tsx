import { GridBody, DraggableContainer, GridItem } from '../components/ui/infinite-drag-scroll';

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
  return (
    <DraggableContainer variant="masonry">
      <GridBody>
        {images.map((image) => (
          <GridItem key={image.id} className="relative h-54 w-36 md:h-96 md:w-64">
            <img
              src={image.src}
              alt={image.alt}
              className="pointer-events-none absolute h-full w-full object-cover"
            />
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
}
