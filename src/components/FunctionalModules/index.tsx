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

  // Описания модулей для главной страницы
  const moduleDescriptions: Record<string, {description: string, features: string[]}> = {
    'transport-requests': {
      description: 'Интеллектуальное решение для полного цикла управления транспортными заявками — от создания до завершения выполнения. Модуль автоматизирует обработку заявок, их распределение между исполнителями и контроль выполнения, что значительно повышает эффективность логистических процессов.',
      features: [
        'Создание и обработка различных типов заявок с гибкой системой статусов',
        'Автоматическое распределение заявок по исполнителям с учетом настраиваемых правил',
        'Интеллектуальная приоритизация заявок согласно бизнес-критериям',
        'Предварительная оценка стоимости перевозок с учетом актуальных тарифов'
      ]
    },
    'transport-planning': {
      description: 'Высокотехнологичная система для стратегического и тактического планирования транспортных операций. Модуль оптимизирует маршруты с учетом множества переменных факторов, включая дорожную обстановку, временные ограничения и специфику перевозимых грузов.',
      features: [
        'Динамическая оптимизация маршрутов с учетом дорожной обстановки и временных окон',
        'Консолидация грузов и интеллектуальное объединение заказов',
        'Поддержка различных типов перевозок: прямые, кросс-докинг, пулинг',
        'Планирование дальнемагистральных и мультимодальных перевозок'
      ]
    },
    'carrier-management': {
      description: 'Комплексная система для эффективного взаимодействия с транспортными компаниями, включающая тендерные механизмы, аукционы и контрактное управление. Модуль обеспечивает справедливое распределение заказов между перевозчиками и контроль качества их работы.',
      features: [
        'Ведение базы данных перевозчиков с историей сотрудничества и рейтингованием',
        'Онлайн-система проведения тендеров и аукционов с гибкими механизмами торгов',
        'Автоматическое распределение рейсов на основе KPI и типа компании',
        'Управление долгосрочными контрактами по принципу fair share'
      ]
    },
    'tracking': {
      description: 'Современная система мониторинга и контроля транспортных операций в режиме реального времени. Модуль обеспечивает полную прозрачность процесса перевозки и позволяет оперативно реагировать на любые отклонения от запланированного графика.',
      features: [
        'Диспетчеризация перевозок по всей логистической цепочке',
        'Мониторинг статусов перевозок в реальном времени с визуализацией на карте',
        'Система контроля сроков доставки с прогнозированием опозданий',
        'Автоматическое оповещение об отклонениях от графика движения'
      ]
    },
    'document-management': {
      description: 'Интегрированное решение для автоматизации документационного сопровождения логистических операций. Модуль обеспечивает создание, хранение и обработку всех типов транспортных документов в электронном виде с соблюдением нормативных требований.',
      features: [
        'Формирование полного комплекта транспортных документов по законодательству',
        'Электронный документооборот с использованием ЭЦП',
        'Централизованное ведение архива документов с гибкой системой поиска',
        'Управление доверенностями с контролем сроков действия'
      ]
    },
    'cost-control': {
      description: 'Точная система финансового планирования и учета логистических издержек. Модуль обеспечивает прозрачность формирования затрат на перевозки, позволяет контролировать расходы и выявлять возможности для оптимизации бюджета.',
      features: [
        'Расчет плановой стоимости перевозки на основе актуальных тарифов',
        'Детальный учет фактических затрат с аналитической разбивкой',
        'Автоматическая сверка плановых и фактических затрат',
        'Интеллектуальная проверка корректности применяемых тарифов'
      ]
    },
    'integrations': {
      description: 'Универсальная платформа для бесшовного взаимодействия TMS с корпоративными и государственными информационными системами. Модуль создает единое информационное пространство для всех участников логистического процесса, повышая эффективность обмена данными.',
      features: [
        'Интеграция с государственными системами (ГИС ЭПД, ЭТРАН)',
        'Двунаправленный обмен данными с ERP и WMS системами',
        'Стандартизированные API для подключения внешних сервисов',
        'Синхронизация с бухгалтерскими системами'
      ]
    },
    'load-optimization': {
      description: 'Инновационное решение для максимально эффективного использования грузового пространства транспортных средств. Модуль применяет передовые алгоритмы объемного планирования для оптимального размещения различных типов грузов.',
      features: [
        '3D-моделирование загрузки транспортного средства',
        'Учет совместимости различных типов грузов и требований к креплению',
        'Оптимизация паллетированных, непаллетированных и смешанных загрузок',
        'Учет последовательности погрузки/разгрузки при многоточечных доставках'
      ]
    },
    'analytics': {
      description: 'Мощный инструмент бизнес-аналитики для всестороннего анализа логистических операций. Модуль предоставляет полную картину ключевых показателей эффективности и позволяет принимать обоснованные управленческие решения на основе актуальных данных.',
      features: [
        'Анализ KPI транспортной логистики в режиме реального времени',
        'Многомерная аналитика с детализацией до отдельных перевозок',
        'Интерактивные дашборды с визуализацией ключевых метрик',
        'Отчетность в различных разрезах (направления, перевозчики, типы ТС)'
      ]
    },
    'yard-management': {
      description: 'Специализированное решение для эффективного управления движением транспорта на территории складского комплекса. Модуль координирует все этапы прибытия, обработки и отправления транспортных средств, оптимизируя использование складской инфраструктуры.',
      features: [
        'Планирование прибытия и отправления транспорта с точностью до минут',
        'Управление электронной очередью на погрузку/разгрузку',
        'Интеллектуальное назначение ворот и доков',
        'Система электронного бронирования временных слотов'
      ]
    },
    'risk-management': {
      description: 'Комплексная система для идентификации, оценки и минимизации рисков в транспортной логистике. Модуль обеспечивает соблюдение нормативных требований и стандартов, контролирует легальность и безопасность перевозок, защищая бизнес от возможных рисков.',
      features: [
        'Контроль соблюдения нормативных требований в сфере перевозок',
        'Мониторинг наличия и актуальности разрешительной документации',
        'Контроль допустимых весовых параметров и предотвращение перегрузов',
        'Проверка документации водителей и технического состояния ТС'
      ]
    }
  };

  return (
    <section className="bg-bg-primary py-16 md:py-20 relative overflow-hidden">
      <div className="container-custom">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Соберем решение под потребности вашего бизнеса
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Выберите функциональные модули, которые нужны именно вам
          </p>
        </div>

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
                    {moduleDescriptions[selectedModule.id]?.description || 'Описание модуля загружается...'}
                  </p>
                  <ul className="space-y-3">
                    {moduleDescriptions[selectedModule.id]?.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 animate-slideIn" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                        <div className="w-5 h-5 mt-0.5 text-accent flex-shrink-0">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300 font-body text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
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