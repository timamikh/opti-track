import { useState } from 'react';
import { functionalModules } from './data';

const FunctionalScheme = () => {
  const [selectedModule, setSelectedModule] = useState(functionalModules[0]);

  return (
    <section className="bg-bg-primary py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-accent font-product">Opti-Track TMS</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-product text-white mb-12">
          Функциональные модули Opti-Track TMS
        </h2>

        <div className="flex gap-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-grow">
            {functionalModules.map((module) => (
              <button 
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className={`
                  relative bg-input-button rounded-lg p-6 flex flex-col gap-2 
                  transition-all duration-300 transform hover:scale-105 hover:bg-opacity-80
                  ${module.isMain ? 'bg-opacity-50' : ''}
                  ${selectedModule.id === module.id ? 'ring-2 ring-accent shadow-lg scale-105' : ''}
                `}
              >
                <div className="w-8 h-8 text-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-white font-product text-lg">{module.title}</h3>
                <p className="text-gray-300 text-sm font-body">{module.description}</p>
              </button>
            ))}
          </div>

          <div className="hidden lg:block w-1/3 bg-input-button rounded-lg p-6">
            <h3 className="text-xl font-product text-white mb-4">{selectedModule.title}</h3>
            <p className="text-gray-300 mb-6 font-body">{selectedModule.description}</p>
            <div className="space-y-2">
              {selectedModule.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-1 text-accent">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-body">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunctionalScheme; 