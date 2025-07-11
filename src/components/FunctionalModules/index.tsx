import { useState } from 'react';
import { functionalModules, FunctionalModule } from './data';

const FunctionalModules = () => {
  const [selectedModule, setSelectedModule] = useState<FunctionalModule | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle module selection with animation
  const handleModuleSelect = (module: FunctionalModule) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedModule?.id === module.id) {
      // Deselect if clicking the same module
      setTimeout(() => {
        setSelectedModule(null);
        setIsAnimating(false);
      }, 300);
    } else {
      // Select new module
      setTimeout(() => {
        setSelectedModule(module);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Organize modules into rows: 4-3-4
  const topRow = functionalModules.slice(0, 4);
  const middleRow = functionalModules.slice(4, 7);
  const bottomRow = functionalModules.slice(7, 11);

  return (
    <section className="bg-bg-primary py-16 md:py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Module grid (2/3 width) */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Top row - 4 modules */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topRow.map((module) => (
                <div 
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className={`
                    bg-input-button rounded-lg p-4 flex flex-col gap-3 
                    transition-all duration-300 hover:bg-opacity-80 cursor-pointer
                    transform hover:scale-105 hover:shadow-lg w-full
                    ${selectedModule?.id === module.id ? 'ring-2 ring-accent shadow-lg' : ''}
                  `}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 text-accent">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={selectedModule?.id === module.id ? 'animate-pulse' : ''}
                    >
                      <path d={module.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-product text-xs md:text-sm lg:text-base leading-tight">{module.title}</h3>
                </div>
              ))}
            </div>

            {/* Middle row - 3 modules centered */}
            <div className="grid grid-cols-3 gap-4 md:px-[12.5%]">
              {middleRow.map((module) => (
                <div 
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className={`
                    bg-input-button rounded-lg p-4 flex flex-col gap-3 
                    transition-all duration-300 hover:bg-opacity-80 cursor-pointer
                    transform hover:scale-105 hover:shadow-lg w-full
                    ${selectedModule?.id === module.id ? 'ring-2 ring-accent shadow-lg' : ''}
                  `}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 text-accent">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={selectedModule?.id === module.id ? 'animate-pulse' : ''}
                    >
                      <path d={module.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-product text-xs md:text-sm lg:text-base leading-tight">{module.title}</h3>
                </div>
              ))}
            </div>

            {/* Bottom row - 4 modules */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bottomRow.map((module) => (
                <div 
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className={`
                    bg-input-button rounded-lg p-4 flex flex-col gap-3 
                    transition-all duration-300 hover:bg-opacity-80 cursor-pointer
                    transform hover:scale-105 hover:shadow-lg w-full
                    ${selectedModule?.id === module.id ? 'ring-2 ring-accent shadow-lg' : ''}
                  `}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 text-accent">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={selectedModule?.id === module.id ? 'animate-pulse' : ''}
                    >
                      <path d={module.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-product text-xs md:text-sm lg:text-base leading-tight">{module.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Text panel (1/3 width) */}
          <div className="w-full lg:w-1/3 bg-input-button rounded-lg p-5 md:p-6 h-full lg:sticky lg:top-24 transition-all duration-500 ease-in-out mt-6 lg:mt-0">
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {selectedModule ? (
                // Selected module content
                <>
                  <div className="w-12 h-12 md:w-16 md:h-16 text-accent mb-4">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pulse"
                    >
                      <path d={selectedModule.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-product text-white mb-4 border-b border-accent pb-2">{selectedModule.title}</h3>
                  <p className="text-gray-300 mb-6 font-body text-sm md:text-base">
                    Подробное описание модуля "{selectedModule.title}". Здесь будет размещена информация о функциональности, преимуществах и особенностях данного модуля.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '100ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Ключевая функция 1</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '200ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Ключевая функция 2</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '300ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Ключевая функция 3</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '400ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Ключевая функция 4</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <button className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80 transition-colors text-sm md:text-base">
                      Подробнее
                    </button>
                  </div>
                </>
              ) : (
                // Default content when no module is selected
                <>
                  <div className="w-16 h-16 text-accent mb-4">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-product text-white mb-4 border-b border-accent pb-2">Opti-Track TMS</h3>
                  <p className="text-gray-300 mb-6 font-body text-sm md:text-base">
                    Opti-Track TMS — это комплексная система управления транспортной логистикой, разработанная для крупных грузовладельцев. Выберите функциональный модуль слева, чтобы узнать подробнее о его возможностях.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '100ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Единая платформа управления логистикой</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '200ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Масштабируемость и гибкость</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '300ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Современные технологии</span>
                    </li>
                    <li className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: '400ms' }}>
                      <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 font-body text-sm md:text-base">Облачное решение</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunctionalModules; 