import { FC } from 'react';
import HeroSection from './components/HeroSection';
import FunctionalModules from './components/FunctionalModules';
import SolutionDescription from './components/SolutionDescription';
import TechnologicalAdvantage from './components/TechnologicalAdvantage';
import ImplementationStages from './components/ImplementationStages';

const App: FC = () => {
  return (
    <>
      <HeroSection />
      <FunctionalModules />
      <SolutionDescription />
      <TechnologicalAdvantage />
      <ImplementationStages />
    </>
  );
};

export default App; 