export const studio = {
  name: 'Roaya',
  arabicName: 'رؤية',
  tagline: { en: 'AI production machine', ar: 'منظومة إنتاج بالذكاء الاصطناعي' },
  city: 'Riyadh, Saudi Arabia',
  // TODO: confirm contact details.
  email: 'info@roaya.com',
  phone: '+966 56 132 3381',
  founded: 2018,
};

export interface NavItem {
  label: { en: string; ar: string };
  to: string;
}

export const navItems: NavItem[] = [
  { label: { en: 'Home', ar: 'الرئيسية' }, to: '/' },
  { label: { en: 'Work', ar: 'الأعمال' }, to: '/work' },
  { label: { en: 'Services', ar: 'الخدمات' }, to: '/services' },
  { label: { en: 'Studio', ar: 'الاستوديو' }, to: '/studio' },
  { label: { en: 'Contact', ar: 'تواصل معنا' }, to: '/contact' },
];

export const uiCopy = {
  startProject: { en: 'Contact us', ar: 'تواصل معنا' },
  switchLang: { en: 'العربية', ar: 'English' },
};

export type Discipline = 'Documentary' | 'Drama' | 'Advertising' | 'Promo' | 'VFX';

export interface Project {
  slug: string;
  title: string;
  client?: string;
  runtime: string;
  discipline: Discipline;
  summary: { en: string; ar: string };
  poster: string;
  video?: string;
  featured?: boolean;
}

/** Display labels for discipline filters/badges — the Discipline values themselves stay English internal keys. */
export const disciplineLabels: Record<Discipline | 'All', { en: string; ar: string }> = {
  All: { en: 'All', ar: 'الكل' },
  Documentary: { en: 'Documentary', ar: 'وثائقي' },
  Drama: { en: 'Drama', ar: 'دراما' },
  Advertising: { en: 'Advertising', ar: 'إعلانات' },
  Promo: { en: 'Promo', ar: 'برومو' },
  VFX: { en: 'VFX', ar: 'مؤثرات بصرية' },
};

/**
 * Real catalogue. Summaries are descriptive placeholders pending sign-off.
 */
export const projects: Project[] = [
  {
    slug: 'al-warsha',
    title: 'Al-Warsha',
    client: 'Ahmed Amin',
    runtime: '00:58',
    discipline: 'Drama',
    summary: {
      en: 'Scripted piece produced with Ahmed Amin.',
      ar: 'عمل درامي مكتوب أُنتج بالتعاون مع أحمد أمين.',
    },
    poster: '/media/work/al-warsha.jpg',
  },
  {
    slug: 'alrihla-world-cup',
    title: 'Discovering Alrihla',
    client: 'Al Jazeera',
    runtime: '00:31',
    discipline: 'Promo',
    summary: {
      en: 'World Cup broadcast promo produced for Al Jazeera.',
      ar: 'برومو تلفزيوني لكأس العالم أُنتج لصالح الجزيرة.',
    },
    poster: '/media/work/alrihla-world-cup.jpg',
    featured: true,
  },
  {
    slug: 'shjseen-hyperlapses',
    title: 'ShjSeen Hyperlapses',
    runtime: '03:38',
    discipline: 'Promo',
    summary: {
      en: 'Hyperlapse-driven city promo, the longest promo in the catalogue.',
      ar: 'برومو لمدينة معتمد على تقنية الهايبرلابس، وهو الأطول ضمن الكتالوج.',
    },
    poster: '/media/work/shjseen-hyperlapses.jpg',
    featured: true,
  },
  {
    slug: 'cbot-robolabs',
    title: 'CBot',
    client: 'Robolabs',
    runtime: '00:59',
    discipline: 'Advertising',
    summary: {
      en: 'Product commercial for a consumer robotics launch.',
      ar: 'إعلان لإطلاق منتج روبوتي موجّه للمستهلك.',
    },
    poster: '/media/work/cbot-robolabs.jpg',
    featured: true,
  },
  {
    slug: 'altar-solar',
    title: 'Altar Solar Energy',
    runtime: '01:42',
    discipline: 'Advertising',
    summary: {
      en: 'Corporate film for a renewable energy operator.',
      ar: 'فيلم مؤسسي لشركة عاملة في مجال الطاقة المتجددة.',
    },
    poster: '/media/work/altar-solar.jpg',
    featured: true,
  },
  {
    slug: 'total-yogurt',
    title: 'Generation Imagination',
    client: 'Total Yogurt',
    runtime: '00:52',
    discipline: 'Advertising',
    summary: {
      en: 'Consumer brand spot built around a children’s imagination premise.',
      ar: 'إعلان تجاري مبني على فكرة خيال الأطفال.',
    },
    poster: '/media/work/total-yogurt.jpg',
  },
  {
    slug: 'rekaz',
    title: 'Rekaz',
    runtime: '01:15',
    discipline: 'Advertising',
    summary: { en: 'Brand commercial.', ar: 'إعلان تجاري للعلامة.' },
    poster: '/media/work/rekaz.jpg',
  },
  {
    slug: 'promo-minimalism',
    title: 'Minimalism',
    runtime: '00:41',
    discipline: 'Promo',
    summary: {
      en: 'Promo built entirely on minimalist composition and graphic staging.',
      ar: 'برومو مبني بالكامل على تكوين بصري وإخراج جرافيكي بسيط.',
    },
    poster: '/media/work/promo-minimalism.jpg',
  },
  {
    slug: 'lego-vfx-bridge',
    title: 'LEGO Bridge',
    runtime: '02:00',
    discipline: 'VFX',
    summary: {
      en: 'Visual effects build and compositing piece.',
      ar: 'عمل مؤثرات بصرية وتركيب رقمي (كومبوزيتنغ).',
    },
    poster: '/media/work/lego-vfx-bridge.jpg',
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

type Bi = { en: string; ar: string };

export interface Service {
  index: string;
  title: Bi;
  description: Bi;
  deliverables: Bi[];
}

export const services: Service[] = [
  {
    index: '01',
    title: { en: 'Documentary', ar: 'الأفلام الوثائقية' },
    description: {
      en: 'Long and short-form documentary, from research and access through to final delivery. The bulk of our catalogue sits here.',
      ar: 'أفلام وثائقية طويلة وقصيرة، من البحث والوصول حتى التسليم النهائي. الجزء الأكبر من أعمالنا يندرج هنا.',
    },
    deliverables: [
      { en: 'Research', ar: 'البحث' },
      { en: 'Field production', ar: 'الإنتاج الميداني' },
      { en: 'Archive', ar: 'الأرشيف' },
      { en: 'Long-form edit', ar: 'المونتاج الطويل' },
    ],
  },
  {
    index: '02',
    title: { en: 'Advertising', ar: 'الإعلانات' },
    description: {
      en: 'Commercials and brand films for consumer, industrial, and technology clients.',
      ar: 'إعلانات وأفلام علامة تجارية لعملاء استهلاكيين وصناعيين وتقنيين.',
    },
    deliverables: [
      { en: 'Concept', ar: 'الفكرة' },
      { en: 'Direction', ar: 'الإخراج' },
      { en: 'Production', ar: 'الإنتاج' },
      { en: 'Delivery', ar: 'التسليم' },
    ],
  },
  {
    index: '03',
    title: { en: 'Promos & Shorts', ar: 'البرومو والأعمال القصيرة' },
    description: {
      en: 'Broadcast promos and short-form pieces, including work delivered for regional networks.',
      ar: 'برومو تلفزيوني وأعمال قصيرة، بما في ذلك أعمال سُلّمت لشبكات إقليمية.',
    },
    deliverables: [
      { en: 'Broadcast promos', ar: 'برومو تلفزيوني' },
      { en: 'Short form', ar: 'أعمال قصيرة' },
      { en: 'Cutdowns', ar: 'نسخ مختصرة' },
      { en: 'Social variants', ar: 'نسخ لمنصات التواصل' },
    ],
  },
  {
    index: '04',
    title: { en: 'Drama', ar: 'الدراما' },
    description: {
      en: 'Scripted short-form drama, developed and produced in-house.',
      ar: 'أعمال درامية قصيرة مكتوبة، تُطوَّر وتُنتَج داخلياً.',
    },
    deliverables: [
      { en: 'Development', ar: 'التطوير' },
      { en: 'Scripting', ar: 'كتابة السيناريو' },
      { en: 'Casting', ar: 'اختيار الممثلين' },
      { en: 'Production', ar: 'الإنتاج' },
    ],
  },
  {
    index: '05',
    title: { en: 'VFX & Post', ar: 'المؤثرات البصرية وما بعد الإنتاج' },
    description: {
      en: 'Visual effects, compositing, and finishing, handled alongside the edit rather than bolted on afterwards.',
      ar: 'مؤثرات بصرية وتركيب رقمي وتجهيز نهائي، تُدار جنباً إلى جنب مع المونتاج لا بعده.',
    },
    deliverables: [
      { en: 'VFX', ar: 'مؤثرات بصرية' },
      { en: 'Compositing', ar: 'تركيب رقمي' },
      { en: 'Grade', ar: 'تصحيح الألوان' },
      { en: 'Sound', ar: 'الصوت' },
    ],
  },
  {
    index: '06',
    title: { en: 'Media & PR', ar: 'الإعلام والعلاقات العامة' },
    description: {
      en: 'Narrative strategy and media relations, carried over from the studio’s work as a media PR house.',
      ar: 'استراتيجية سردية وعلاقات إعلامية، امتداداً لعمل الاستوديو كبيت علاقات عامة إعلامي.',
    },
    deliverables: [
      { en: 'Narrative strategy', ar: 'الاستراتيجية السردية' },
      { en: 'Media relations', ar: 'العلاقات الإعلامية' },
      { en: 'Campaign planning', ar: 'تخطيط الحملات' },
    ],
  },
];

export const principles: { title: Bi; body: Bi }[] = [
  {
    title: { en: 'We take the difficult briefs', ar: 'نتولى التكليفات الصعبة' },
    body: {
      en: 'A large part of the catalogue is reporting that took access, patience, and a tolerance for subjects other studios turn down.',
      ar: 'جزء كبير من أعمالنا تقارير تطلّبت وصولاً غير متاح للجميع، وصبراً طويلاً، وقدرة على تناول مواضيع ترفضها استوديوهات أخرى.',
    },
  },
  {
    title: { en: 'The edit is where it is won', ar: 'في المونتاج يُحسم العمل' },
    body: {
      en: 'Several of these films run past twenty minutes. That length only holds if post is budgeted like production, not after it.',
      ar: 'كثير من هذه الأفلام يتجاوز العشرين دقيقة، وهذا الطول لا يصمد إلا إذا خُصصت لمرحلة ما بعد الإنتاج ميزانية كالإنتاج نفسه، لا كإضافة لاحقة.',
    },
  },
  {
    title: { en: 'One team, start to finish', ar: 'فريق واحد من البداية إلى النهاية' },
    body: {
      en: 'Research, shoot, VFX, and grade sit under one roof, so nothing is lost in a handover.',
      ar: 'البحث والتصوير والمؤثرات البصرية وتصحيح الألوان كلها تحت سقف واحد، فلا يضيع شيء في التنقل بين الفرق.',
    },
  },
];

export interface TimelineEntry {
  year: string;
  title: Bi;
  body: Bi;
}

export const timeline: TimelineEntry[] = [
  {
    year: '2018',
    title: { en: 'Founded', ar: 'التأسيس' },
    body: {
      en: 'Started as an entertainment and media PR house, taking commercial work alongside the first documentary commissions.',
      ar: 'بدأنا كبيت علاقات عامة إعلامي وترفيهي، مع أعمال تجارية إلى جانب أولى التكليفات الوثائقية.',
    },
  },
  {
    year: '2020',
    title: { en: 'Into long-form', ar: 'الانتقال إلى الأعمال الطويلة' },
    body: {
      en: 'The first films past the twenty-minute mark, and the post pipeline built to support them.',
      ar: 'أول أفلام تتجاوز العشرين دقيقة، وخط إنتاج ما بعد التصوير الذي بُني لدعمها.',
    },
  },
  {
    year: '2022',
    title: { en: 'Broadcast work', ar: 'العمل التلفزيوني' },
    body: {
      en: 'Promo and campaign work delivered for regional broadcasters, including Al Jazeera.',
      ar: 'أعمال برومو وحملات سُلّمت لمحطات بث إقليمية، من بينها الجزيرة.',
    },
  },
  {
    year: '2025',
    title: { en: 'Rebranded to Roaya', ar: 'إعادة التسمية إلى رؤية' },
    body: {
      en: 'A new name, a new base, and a catalogue of more than eighty films behind it.',
      ar: 'اسم جديد، ومقر جديد، وأكثر من ثمانين فيلماً في الرصيد.',
    },
  },
];
