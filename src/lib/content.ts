export const studio = {
  name: 'Roaya',
  arabicName: 'رؤية',
  tagline: 'Film, documentary, and media production',
  city: 'Riyadh, Saudi Arabia',
  // TODO: confirm post-rebrand contact details. These carry over from Onoria.
  email: 'info@onoria.com',
  phone: '+90 537 960 6350',
  vimeo: 'https://vimeo.com/usamaesam',
  founded: 2018,
  formerly: 'Onoria Solutions',
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

export type Discipline = 'Documentary' | 'Drama' | 'Advertising' | 'Promo' | 'VFX';

export interface Project {
  slug: string;
  title: string;
  client?: string;
  runtime: string;
  discipline: Discipline;
  summary: string;
  poster: string;
  video?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "cinematic-ai-01",
    title: "Cinematic AI: Narrative Structure",
    runtime: "04:32",
    discipline: "VFX",
    summary: "AI-generated narrative film with cinematic framing and emotional timing.",
    poster: "/media/work/ai-cinematic-01.jpg",
    video: "1213406495",
    featured: true,
  },
  {
    slug: "cinematic-ai-02",
    title: "Cinematic AI: Motion & Light",
    runtime: "03:18",
    discipline: "VFX",
    summary: "Sophisticated motion control and lighting design driven by AI composition.",
    poster: "/media/work/ai-cinematic-02.jpg",
    video: "1213406541",
    featured: true,
  },
  {
    slug: "cinematic-ai-03",
    title: "Cinematic AI: Color Grading",
    runtime: "02:44",
    discipline: "VFX",
    summary: "Complex color workflows and grade precision at scale.",
    poster: "/media/work/ai-cinematic-03.jpg",
    video: "1213406567",
    featured: true,
  },
  {
    slug: "cinematic-ai-04",
    title: "Cinematic AI: Montage Assembly",
    runtime: "03:55",
    discipline: "VFX",
    summary: "Intelligent montage sequencing with narrative cohesion.",
    poster: "/media/work/ai-cinematic-04.jpg",
    video: "1213406494",
    featured: true,
  },
  {
    slug: "cinematic-ai-05",
    title: "Cinematic AI: Visual Effects",
    runtime: "04:12",
    discipline: "VFX",
    summary: "Photorealistic VFX and compositing at professional broadcast standard.",
    poster: "/media/work/ai-cinematic-05.jpg",
    video: "1213406492",
    featured: true,
  },
  {
    slug: "cinematic-ai-06",
    title: "Cinematic AI: Sound Design",
    runtime: "02:28",
    discipline: "VFX",
    summary: "Immersive audio design paired with visual storytelling.",
    poster: "/media/work/ai-cinematic-06.jpg",
    video: "1213406493",
    featured: true,
  },
  {
    slug: "berberas-hunter",
    title: "Berbera’s Hunter",
    runtime: "01:36",
    discipline: "Documentary",
    summary: "Observational short following a hunter on the Somali coast.",
    poster: "/media/work/berberas-hunter.jpg",
  },
  {
    slug: "omar-kafi",
    title: "Omar Kafi",
    runtime: "03:52",
    discipline: "Drama",
    summary: "Scripted short-form drama.",
    poster: "/media/work/omar-kafi.jpg",
  },
  {
    slug: "al-warsha",
    title: "Al-Warsha",
    client: "Ahmed Amin",
    runtime: "00:58",
    discipline: "Drama",
    summary: "Scripted piece produced with Ahmed Amin.",
    poster: "/media/work/al-warsha.jpg",
  },
  {
    slug: "alrihla-world-cup",
    title: "Discovering Alrihla",
    client: "Al Jazeera",
    runtime: "00:31",
    discipline: "Promo",
    summary: "World Cup broadcast promo produced for Al Jazeera.",
    poster: "/media/work/alrihla-world-cup.jpg",
    featured: true,
  },
  {
    slug: "shjseen-hyperlapses",
    title: "ShjSeen Hyperlapses",
    runtime: "03:38",
    discipline: "Promo",
    summary: "Hyperlapse-driven city promo, the longest promo in the catalogue.",
    poster: "/media/work/shjseen-hyperlapses.jpg",
  },
  {
    slug: "cbot-robolabs",
    title: "CBot",
    client: "Robolabs",
    runtime: "00:59",
    discipline: "Advertising",
    summary: "Product commercial for a consumer robotics launch.",
    poster: "/media/work/cbot-robolabs.jpg",
  },
  {
    slug: "altar-solar",
    title: "Altar Solar Energy",
    runtime: "01:42",
    discipline: "Advertising",
    summary: "Corporate film for a renewable energy operator.",
    poster: "/media/work/altar-solar.jpg",
  },
  {
    slug: "total-yogurt",
    title: "Generation Imagination",
    client: "Total Yogurt",
    runtime: "00:52",
    discipline: "Advertising",
    summary: "Consumer brand spot built around a children’s imagination premise.",
    poster: "/media/work/total-yogurt.jpg",
  },
  {
    slug: "rekaz",
    title: "Rekaz",
    runtime: "01:15",
    discipline: "Advertising",
    summary: "Brand commercial.",
    poster: "/media/work/rekaz.jpg",
  },
  {
    slug: "ghayeb",
    title: "Ghayeb",
    runtime: "00:33",
    discipline: "Promo",
    summary: "Campaign promo, including behind-the-scenes coverage.",
    poster: "/media/work/ghayeb.jpg",
  },
  {
    slug: "promo-minimalism",
    title: "Minimalism",
    runtime: "00:41",
    discipline: "Promo",
    summary: "Promo built entirely on minimalist composition and graphic staging.",
    poster: "/media/work/promo-minimalism.jpg",
  },
  {
    slug: "lego-vfx-bridge",
    title: "LEGO Bridge",
    runtime: "02:00",
    discipline: "VFX",
    summary: "Visual effects build and compositing piece.",
    poster: "/media/work/lego-vfx-bridge.jpg",
  },
];

export const disciplines: (Discipline | 'All')[] = [
  'All',
  'Documentary',
  'Drama',
  'Advertising',
  'Promo',
  'VFX',
];

/** Only names that actually appear as clients in the catalogue above. */
export const clients = [
  'Al Jazeera',
  'Robolabs',
  'Total Yogurt',
  'Rekaz',
  'Altar Solar Energy',
  'ShjSeen',
  'Ahmed Amin',
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
    title: 'Documentary',
    description:
      'Long and short-form documentary, from research and access through to final delivery. The bulk of our catalogue sits here.',
    deliverables: ['Research', 'Field production', 'Archive', 'Long-form edit'],
  },
  {
    index: '02',
    title: 'Advertising',
    description:
      'Commercials and brand films for consumer, industrial, and technology clients.',
    deliverables: ['Concept', 'Direction', 'Production', 'Delivery'],
  },
  {
    index: '03',
    title: 'Promos & Shorts',
    description:
      'Broadcast promos and short-form pieces, including work delivered for regional networks.',
    deliverables: ['Broadcast promos', 'Short form', 'Cutdowns', 'Social variants'],
  },
  {
    index: '04',
    title: 'Drama',
    description: 'Scripted short-form drama, developed and produced in-house.',
    deliverables: ['Development', 'Scripting', 'Casting', 'Production'],
  },
  {
    index: '05',
    title: 'VFX & Post',
    description:
      'Visual effects, compositing, and finishing, handled alongside the edit rather than bolted on afterwards.',
    deliverables: ['VFX', 'Compositing', 'Grade', 'Sound'],
  },
  {
    index: '06',
    title: 'Media & PR',
    description:
      'Narrative strategy and media relations, carried over from the studio’s work as a media PR house.',
    deliverables: ['Narrative strategy', 'Media relations', 'Campaign planning'],
  },
];

export const principles = [
  {
    title: 'We take the difficult briefs',
    body: 'A large part of the catalogue is reporting that took access, patience, and a tolerance for subjects other studios turn down.',
  },
  {
    title: 'The edit is where it is won',
    body: 'Several of these films run past twenty minutes. That length only holds if post is budgeted like production, not after it.',
  },
  {
    title: 'One team, start to finish',
    body: 'Research, shoot, VFX, and grade sit under one roof, so nothing is lost in a handover.',
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
    title: 'Founded as Onoria',
    body: 'Started as an entertainment and media PR house, taking commercial work alongside the first documentary commissions.',
  },
  {
    year: '2020',
    title: 'Into long-form',
    body: 'The first films past the twenty-minute mark, and the post pipeline built to support them.',
  },
  {
    year: '2022',
    title: 'Broadcast work',
    body: 'Promo and campaign work delivered for regional broadcasters, including Al Jazeera.',
  },
  {
    year: '2025',
    title: 'Rebranded to Roaya',
    body: 'A new name, a new base, and a catalogue of more than eighty films behind it.',
  },
];
