export const galleryImages = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  alt: `Archive frame ${i + 1}`,
  src: `/media/work/gallery-${i + 1}.jpg`,
}));
