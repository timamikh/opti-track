import { FC } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FunctionalScheme from './components/FunctionalScheme';
import SolutionDescription from './components/SolutionDescription';
import TechnologicalAdvantage from './components/TechnologicalAdvantage';
import ImplementationStages from './components/ImplementationStages';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main>
        <HeroSection />
        <FunctionalScheme />
        <SolutionDescription />
        <TechnologicalAdvantage />
        <ImplementationStages />
      </main>
      <Footer />
    </div>
  );
};

export default App; 