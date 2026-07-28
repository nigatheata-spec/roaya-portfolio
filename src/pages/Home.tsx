import { HeroInkFlow } from '../sections/HeroInkFlow';
import { ClientsMarquee } from '../sections/ClientsMarquee';
import { StatementLightBar } from '../sections/StatementLightBar';
import { CinematicAI } from '../sections/CinematicAI';
import { ReelWall } from '../sections/ReelWall';
import { DragGallery } from '../sections/DragGallery';
import { ServicesReconfig } from '../sections/ServicesReconfig';
import { CTAMelt } from '../sections/CTAMelt';

export function Home() {
  return (
    <>
      <HeroInkFlow />
      <ClientsMarquee />
      <ReelWall />
      <CinematicAI />
      <StatementLightBar />
      <DragGallery />
      <ServicesReconfig />
      <CTAMelt />
    </>
  );
}
