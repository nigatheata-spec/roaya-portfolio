import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { studio, services } from '../lib/content';
import { gsap, useGsapContext, prefersReducedMotion } from '../lib/gsap';
import { usePick } from '../lib/language';

/** Circuit-like routes that converge toward the centre of the panel. */
const ROUTES = [
  'M0,120 H180 V60 H360 V150 H540 V90 H760',
  'M0,220 H120 V300 H320 V240 H520 V310 H760',
  'M0,40 H260 V180 H430 V30 H760',
  'M0,320 H90 V200 H250 V340 H600 V260 H760',
  'M760,120 V220 H600 V300',
];

const COPY = {
  eyebrow: { en: 'Contact', ar: 'تواصل معنا' },
  title: { en: 'Say hello', ar: 'تواصل معنا' },
  intro: {
    en: 'Tell us the subject, the deadline, and what you already have. If it is a documentary, tell us who has agreed to talk.',
    ar: 'أخبرنا بالموضوع، والموعد النهائي، وما هو متوفر لديك بالفعل. إن كان فيلماً وثائقياً، أخبرنا من وافق على الحديث.',
  },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
  phone: { en: 'Phone', ar: 'الهاتف' },
  studio: { en: 'Studio', ar: 'الاستوديو' },
  watchReel: { en: 'Watch the reel on Vimeo', ar: 'شاهد المقطع على فيميو' },
  name: { en: 'Name', ar: 'الاسم' },
  namePlaceholder: { en: 'Your name', ar: 'اسمك' },
  company: { en: 'Company', ar: 'الشركة' },
  companyPlaceholder: { en: 'Optional', ar: 'اختياري' },
  whatDoYouNeed: { en: 'What do you need', ar: 'ما الذي تحتاجه' },
  brief: { en: 'Brief', ar: 'الموجز' },
  briefPlaceholder: {
    en: 'Subject, deadline, what exists already.',
    ar: 'الموضوع، الموعد النهائي، وما هو متوفر بالفعل.',
  },
  compose: { en: 'Compose email', ar: 'إنشاء رسالة' },
  note: {
    en: 'This opens your mail app with the details filled in. Nothing is sent from the site itself.',
    ar: 'سيفتح هذا تطبيق البريد لديك مع تعبئة التفاصيل. لا يتم إرسال أي شيء من الموقع نفسه.',
  },
};

export function Contact() {
  const pick = usePick();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const [form, setForm] = useState({
    name: '',
    company: '',
    scope: services[0].title.en,
    message: '',
  });

  const scope = useGsapContext<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return;

    paths.current.forEach((p, i) => {
      if (!p) return;
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.9 });
      gsap.to(p, {
        strokeDashoffset: 0,
        duration: 2.2,
        delay: 0.25 + i * 0.22,
        ease: 'power2.inOut',
      });
    });

    gsap.from('[data-contact-fade]', {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.09,
      delay: 0.25,
    });
  });

  const mailto = () => {
    const subject = `New project enquiry — ${form.scope}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Scope: ${form.scope}`,
      '',
      form.message,
    ].join('\n');
    return `mailto:${studio.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    'w-full rounded-none border-b border-line-soft bg-transparent py-3 text-[0.95rem] text-ink-100 outline-none transition-colors placeholder:text-ink-25 focus:border-brulee';

  return (
    <div ref={scope}>
      <section className="relative overflow-hidden pb-20 pt-40">
        <svg
          viewBox="0 0 760 360"
          className="pointer-events-none absolute inset-x-0 top-24 h-[360px] w-full opacity-30"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          {ROUTES.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                paths.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke="var(--color-brulee)"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className="shell relative">
          <p data-contact-fade className="label mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-brulee" />
            {pick(COPY.eyebrow)}
          </p>
          <h1 data-contact-fade className="text-mega font-extrabold">
            {pick(COPY.title)}
          </h1>
          <p
            data-contact-fade
            className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-ink-70"
          >
            {pick(COPY.intro)}
          </p>
        </div>
      </section>

      <section className="shell pb-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div data-contact-fade className="space-y-10">
            <a
              href={`mailto:${studio.email}`}
              className="group flex items-start gap-4 border-t border-line-soft/70 pt-6"
            >
              <Mail size={17} className="mt-1 shrink-0 text-brulee" />
              <span>
                <span className="label block">{pick(COPY.email)}</span>
                <span className="mt-2 block text-[0.95rem] text-ink-100 transition-colors group-hover:text-brulee">
                  {studio.email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${studio.phone.replace(/\s/g, '')}`}
              className="group flex items-start gap-4 border-t border-line-soft/70 pt-6"
            >
              <Phone size={17} className="mt-1 shrink-0 text-brulee" />
              <span>
                <span className="label block">{pick(COPY.phone)}</span>
                <span className="mt-2 block text-[0.95rem] text-ink-100 transition-colors group-hover:text-brulee">
                  {studio.phone}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 border-t border-line-soft/70 pt-6">
              <MapPin size={17} className="mt-1 shrink-0 text-brulee" />
              <span>
                <span className="label block">{pick(COPY.studio)}</span>
                <span className="mt-2 block text-[0.95rem] text-ink-100">{studio.city}</span>
              </span>
            </div>

            <a
              href={studio.vimeo}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2 border-t border-line-soft/70 pt-6 text-[0.95rem] text-ink-70 transition-colors hover:text-brulee"
            >
              {pick(COPY.watchReel)}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <form
            data-contact-fade
            className="space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto();
            }}
          >
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="label mb-1 block">{pick(COPY.name)}</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                  placeholder={pick(COPY.namePlaceholder)}
                />
              </label>
              <label className="block">
                <span className="label mb-1 block">{pick(COPY.company)}</span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={field}
                  placeholder={pick(COPY.companyPlaceholder)}
                />
              </label>
            </div>

            <label className="block">
              <span className="label mb-1 block">{pick(COPY.whatDoYouNeed)}</span>
              <select
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
                className={`${field} appearance-none`}
              >
                {services.map((s) => (
                  <option key={s.index} value={s.title.en} className="bg-void text-ink-100">
                    {pick(s.title)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="label mb-1 block">{pick(COPY.brief)}</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-none`}
                placeholder={pick(COPY.briefPlaceholder)}
              />
            </label>

            <button
              type="submit"
              className="group inline-flex items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-on-cream transition-colors hover:bg-brulee"
            >
              {pick(COPY.compose)}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <p className="text-xs text-ink-25">{pick(COPY.note)}</p>
          </form>
        </div>
      </section>
    </div>
  );
}
