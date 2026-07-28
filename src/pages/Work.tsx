import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Media } from '../components/Media';
import { ShatterTitle } from '../components/ShatterTitle';
import { projects } from '../lib/content';
import { DraggableContainer, GridBody, GridItem } from '../components/DraggableGrid';

export function Work() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="shell pb-16 pt-40">
        <p className="label mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-brulee" />
          Catalogue
        </p>
        <ShatterTitle className="text-mega font-extrabold">Cinematic AI</ShatterTitle>
        <p className="mt-10 max-w-xl text-[0.95rem] leading-relaxed text-ink-70">
          Professional-grade AI-assisted creative work. We blend machine intelligence with
          human craft—no shortcuts, no sloppy filters. Every frame is considered.
        </p>
      </section>

      <div>
        <DraggableContainer variant="masonry">
          <GridBody>
            {featured.map((p) => (
              <GridItem
                key={p.slug}
                className="relative h-54 w-36 md:h-96 md:w-64"
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-surface">
                  <Media
                    src={p.poster}
                    alt={p.client ? `${p.title} — ${p.client}` : p.title}
                    aspect="4 / 3"
                    caption={p.title}
                    className="h-full w-full object-cover brightness-[0.92] transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-ink-100">
                    <h3 className="text-sm font-bold leading-tight">{p.title}</h3>
                    <p className="mt-1 text-xs text-ink-70">{p.discipline}</p>
                    <p className="mt-2 text-xs text-brulee font-medium">{p.runtime}</p>
                  </div>
                </div>
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

      <section className="bg-cream py-24">
        <div className="shell flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-minor max-w-lg font-bold text-on-cream">
              Scroll, drag, or explore the full archive.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-on-cream-soft">
              Ask us for work cut to a specific brief, medium, or format.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-on-cream px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-brulee"
          >
            Discuss a project
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
