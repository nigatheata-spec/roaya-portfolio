import { HeroInkFlow } from '../sections/HeroInkFlow';
import { ClientsMarquee } from '../sections/ClientsMarquee';
import { StatementLightBar } from '../sections/StatementLightBar';
import { WorkLens } from '../sections/WorkLens';
import { ServicesReconfig } from '../sections/ServicesReconfig';
import { MetricsWave } from '../sections/MetricsWave';
import { CTAMelt } from '../sections/CTAMelt';

export function Home() {
  return (
    <>
      <HeroInkFlow />
      <ClientsMarquee />
      <StatementLightBar />
      <WorkLens />
      <ServicesReconfig />
      <MetricsWave />
      <CTAMelt />
    </>
  );
}
