import { FC } from 'react';
import HeroSection from './components/HeroSection';
import LogisticsCycle from './components/LogisticsCycle';
import LogisticsEcosystem from './components/LogisticsEcosystem';
import FunctionalModules from './components/FunctionalModules';
import ExperienceSection from './components/ExperienceSection';
import SolutionDescription from './components/SolutionDescription';
import TechnologicalAdvantage from './components/TechnologicalAdvantage';
import ImplementationStages from './components/ImplementationStages';

const App: FC = () => {
  return (
    <>
      <HeroSection />
      <LogisticsCycle />
      <LogisticsEcosystem />
      <FunctionalModules />
      <ExperienceSection />
      <SolutionDescription />
      <TechnologicalAdvantage />
      <ImplementationStages />
    </>
  );
};

export default App; 