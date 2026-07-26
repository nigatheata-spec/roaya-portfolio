export const studio = {
  name: 'Roaya',
  arabicName: 'رؤية',
  tagline: 'A media house in Riyadh',
  city: 'Riyadh, Saudi Arabia',
  email: 'hello@roaya.sa',
  phone: '+966 11 000 0000',
  founded: 2018,
};

export interface NavItem {
  label: string;
  to: string;
}

export const navItems: NavItem[] = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/studio' },
  { label: 'Contact', to: '/contact' },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  summary: string;
  /** Drop the real file at this path under /public and it renders automatically. */
  poster: string;
  video?: string;
  aspect: string;
  scale: 'wide' | 'tall' | 'square';
}

export const projects: Project[] = [
  {
    slug: 'diriyah-nights',
    title: 'Diriyah Nights',
    client: 'Diriyah Gate Authority',
    year: '2025',
    discipline: 'Brand Film',
    summary:
      'A nine-minute film tracing the mud-brick walls of At-Turaif from first light to the last call of the evening.',
    poster: '/media/work/diriyah-nights.jpg',
    video: '/media/work/diriyah-nights.mp4',
    aspect: '16 / 9',
    scale: 'wide',
  },
  {
    slug: 'the-long-red',
    title: 'The Long Red',
    client: 'Saudi Tourism Authority',
    year: '2025',
    discipline: 'Documentary',
    summary:
      'Four weeks across the Empty Quarter with two cameras, one guide, and no shot list.',
    poster: '/media/work/the-long-red.jpg',
    aspect: '4 / 5',
    scale: 'tall',
  },
  {
    slug: 'qiddiya-launch',
    title: 'Qiddiya Launch',
    client: 'Qiddiya Investment Company',
    year: '2024',
    discipline: 'Broadcast',
    summary:
      'Twelve camera positions, a live orchestral score, and a broadcast package delivered in under six hours.',
    poster: '/media/work/qiddiya-launch.jpg',
    aspect: '16 / 9',
    scale: 'wide',
  },
  {
    slug: 'house-of-oud',
    title: 'House of Oud',
    client: 'Abdul Samad Al Qurashi',
    year: '2024',
    discipline: 'Product Film',
    summary:
      'Macro cinematography on a motion-control rig, shot at 1000fps to hold the moment resin meets heat.',
    poster: '/media/work/house-of-oud.jpg',
    aspect: '1 / 1',
    scale: 'square',
  },
  {
    slug: 'red-sea-crossing',
    title: 'Red Sea Crossing',
    client: 'NEOM',
    year: '2024',
    discipline: 'Aerial',
    summary:
      'Drone and helicopter plates covering 340km of coastline for a campaign that never repeats a frame.',
    poster: '/media/work/red-sea-crossing.jpg',
    aspect: '4 / 5',
    scale: 'tall',
  },
  {
    slug: 'ninety-three',
    title: 'Ninety-Three',
    client: 'Saudi National Day',
    year: '2023',
    discipline: 'Campaign',
    summary:
      'A national spot cut three ways for cinema, broadcast, and a nine-metre LED facade on King Fahd Road.',
    poster: '/media/work/ninety-three.jpg',
    aspect: '16 / 9',
    scale: 'wide',
  },
];

export interface Service {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Film & Direction',
    description:
      'Concept through final grade. We write, direct, and shoot brand films, documentaries, and campaign spots with our own crew and kit.',
    deliverables: ['Creative direction', 'Scripting', 'Principal photography', 'Colour grade'],
  },
  {
    index: '02',
    title: 'Broadcast & Live',
    description:
      'Multi-camera coverage for launches, conferences, and national moments, with same-day turnarounds when the schedule demands it.',
    deliverables: ['Multi-cam capture', 'Live switching', 'Rapid edit', 'Distribution masters'],
  },
  {
    index: '03',
    title: 'Post & Finishing',
    description:
      'A finishing suite built for long-form. Offline, online, sound design, and delivery specs for every regional broadcaster.',
    deliverables: ['Offline edit', 'VFX & clean-up', 'Sound design', 'Deliverable QC'],
  },
  {
    index: '04',
    title: 'Photography',
    description:
      'Stills that sit beside the film rather than beneath it. Campaign, editorial, architectural, and product.',
    deliverables: ['Campaign stills', 'Editorial', 'Architectural', 'Retouch'],
  },
  {
    index: '05',
    title: 'Content Systems',
    description:
      'One shoot, forty deliverables. We plan the cutdowns, verticals, and social variants before the camera turns over.',
    deliverables: ['Content planning', 'Vertical cutdowns', 'Motion graphics', 'Asset libraries'],
  },
  {
    index: '06',
    title: 'Strategy',
    description:
      'The thinking that decides what is worth filming. Audience work, narrative platforms, and channel planning.',
    deliverables: ['Audience research', 'Narrative platform', 'Channel plan', 'Measurement'],
  },
];

export const metrics = [
  { value: 240, suffix: '+', label: 'Films delivered' },
  { value: 18, suffix: '', label: 'Countries shot in' },
  { value: 96, suffix: '%', label: 'Client retention' },
  { value: 34, suffix: '', label: 'People on staff' },
];

export const clients = [
  'NEOM',
  'Qiddiya',
  'Diriyah',
  'Saudi Tourism',
  'Aramco',
  'stc',
  'Red Sea Global',
  'Ministry of Culture',
  'AlUla',
  'PIF',
];

export const principles = [
  {
    title: 'We shoot our own work',
    body: 'No brokered crews, no mystery subcontractors. The people who pitch the film are the people on set at 4am.',
  },
  {
    title: 'The edit is where it is won',
    body: 'We budget post like production. A great shoot with a rushed edit is a expensive way to make something forgettable.',
  },
  {
    title: 'Local is not a limitation',
    body: 'We know which permits take three weeks and which take three days. That knowledge is the difference between a schedule and a wish.',
  },
];

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: '2018',
    title: 'Two people, one camera',
    body: 'Founded in a borrowed room in Al Olaya, taking corporate work to fund the films we actually wanted to make.',
  },
  {
    year: '2020',
    title: 'The first long-form',
    body: 'A 40-minute documentary that took nine months and taught us how to budget post properly.',
  },
  {
    year: '2022',
    title: 'Studio and finishing suite',
    body: 'Moved into a 900sqm space with a stage, a grade suite, and somewhere to put the grip truck.',
  },
  {
    year: '2025',
    title: 'Thirty-four people',
    body: 'Directors, producers, editors, colourists, and a sound team. Still shooting our own work.',
  },
];
