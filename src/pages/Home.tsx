import { HeroInkFlow } from '../sections/HeroInkFlow';
import { ClientsMarquee } from '../sections/ClientsMarquee';
import { StatementLightBar } from '../sections/StatementLightBar';
import { WorkLens } from '../sections/WorkLens';
import { CinematicAI } from '../sections/CinematicAI';
import { DragGallery } from '../sections/DragGallery';
import { ServicesReconfig } from '../sections/ServicesReconfig';
import { CTAMelt } from '../sections/CTAMelt';

export function Home() {
  return (
    <>
      <HeroInkFlow />
      <ClientsMarquee />
      <StatementLightBar />
      <WorkLens />
      <CinematicAI />
      <DragGallery />
      <ServicesReconfig />
      <CTAMelt />
    </>
  );
}
