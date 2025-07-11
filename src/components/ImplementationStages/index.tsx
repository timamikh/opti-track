import { FC, useState, useRef, useEffect } from 'react';

interface Stage {
  id: string;
  number: number;
  title: string;
  duration: string;
  tasks: string[];
  highlight?: boolean;
  isMvp?: boolean;
}

const stages: Stage[] = [
  {
    id: 'analysis',
    number: 1,
    title: 'Предварительный анализ и формирование КП',
    duration: '2-4 недели',
    tasks: [
      'Первичный анализ требований',
      'Встреча для демо и обсуждения',
      'Формирование плана работ и КП'
    ]
  },
  {
    id: 'requirements',
    number: 2,
    title: 'Детальная БА и формирование требований',
    duration: '2-4 месяца',
    tasks: [
      'Подготовка оборудования',
      'Развертывание и настройка решения',
      'Обучение',
      'Бизнес-аналитика',
      'Системный анализ',
      'Проектирование архитектуры'
    ]
  },
  {
    id: 'basic-version',
    number: 3,
    title: 'Запуск базовой версии',
    duration: '3-5 месяцев',
    tasks: [
      'Настройка интеграций',
      'Включение всех участников цепочки',
      'Запуск основных процессов диспетчеризации, маршрутизации и планирования',
      'Формирование ролевой модели',
      'Интеграции с ERP, WMS',
      'Организация прав доступа',
      'Создание профилей сотрудников и партнеров, обучение'
    ],
    highlight: true,
    isMvp: true
  },
  {
    id: 'additional-modules',
    number: 4,
    title: 'Внедрение дополнительных модулей',
    duration: 'от 2 месяцев',
    tasks: [
      'Механизмы контрактов',
      'Модуль тендеров',
      'Механизм аукционов',
      'Полный расчет стоимости перевозки',
      'Алгоритмы оптимизации стоимости',
      'GPS отслеживание и мобильное приложение',
      'Модуль Inbound перевозок'
    ]
  },
  {
    id: 'improvement',
    number: 5,
    title: 'Анализ и непрерывное улучшение',
    duration: 'от 2 месяцев',
    tasks: [
      'Модуль тайм-слотирования',
      'Подключение поставщиков в систему',
      'Интеграция с государственными системами и ЭТРН',
      'Механизм трансграничного импорта',
      'Индивидуальные оптимизационные алгоритмы (на основе KPI)',
      'Цифровые помощники'
    ]
  }
];

const StageCard: FC<{
  stage: Stage;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ stage, isExpanded, onToggle }) => {
  return (
    <div
      className={`
        relative bg-input-button rounded-lg transition-all duration-500 h-full
        ${stage.highlight ? 'border border-accent/40' : ''}
        transform ${isExpanded ? 'scale-[1.02]' : 'scale-100'}
      `}
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      {stage.isMvp && (
        <div className="absolute -top-3 -right-3 bg-accent text-black font-bold py-1 px-3 rounded-full text-xs shadow-lg transform rotate-12 z-10">
          MVP
        </div>
      )}
      
      {/* Stage header - always visible */}
      <div 
        className={`
          p-4 cursor-pointer flex flex-col h-[180px]
          ${stage.highlight ? 'bg-[#2a84d315]' : ''}
        `}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between mb-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
            ${stage.highlight 
              ? 'bg-[#2a84d315] text-accent border border-accent/40' 
              : 'bg-[#2a84d305] border border-accent/20 text-accent/90'
            }
            transition-all duration-300
          `}>
            {stage.number}
          </div>
          <div className={`text-base font-medium text-text-primary/90 ${stage.highlight ? 'text-accent/90' : ''}`}>
            {stage.duration}
          </div>
        </div>
        
        <h3 className={`text-base font-medium mb-2 ${stage.highlight ? 'text-accent' : 'text-white'}`}>
          {stage.title}
        </h3>
        
        <div className="flex-grow"></div>
        
        {/* Toggle button - positioned at the bottom */}
        <div className="mt-auto">
          <button 
            className="flex items-center text-accent text-sm"
            aria-label={isExpanded ? 'Скрыть детали' : 'Показать детали'}
          >
            <span className="mr-1">{isExpanded ? 'Скрыть' : 'Подробнее'}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Expandable content */}
      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${isExpanded ? 'max-h-[300px] opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 p-0'}
      `}>
        <div className="h-px bg-accent/20 mb-4" />
        <ul className="space-y-2">
          {stage.tasks.map((task, index) => (
            <li 
              key={index} 
              className="flex items-start text-sm" 
              style={{ 
                animation: isExpanded ? `fadeInSlideUp 0.3s ease-out forwards ${index * 0.05}s` : 'none',
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <span className="text-accent mr-2 flex-shrink-0">•</span>
              <span className="text-text-primary/80">{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ImplementationStages: FC = () => {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const toggleExpand = (stageId: string) => {
    if (expandedStage === stageId) {
      setExpandedStage(null);
    } else {
      setExpandedStage(stageId);
    }
  };

  // Mobile slider navigation
  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;
    
    setCurrentSlide(index);
    const slideWidth = sliderRef.current.scrollWidth / stages.length;
    sliderRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  };

  // Handle slider scroll
  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    
    const scrollPosition = sliderRef.current.scrollLeft;
    const slideWidth = sliderRef.current.scrollWidth / stages.length;
    const newIndex = Math.round(scrollPosition / slideWidth);
    
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleSliderScroll);
      return () => slider.removeEventListener('scroll', handleSliderScroll);
    }
  }, [currentSlide]);

  return (
    <section className="bg-bg-primary py-16 md:py-20" style={{ fontFamily: 'var(--font-roboto)' }}>
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl text-white mb-12 text-center">
          Этапы внедрения Optitrack TMS
        </h2>

        {/* Desktop version */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mt-8">
          {stages.map((stage) => (
            <StageCard 
              key={stage.id}
              stage={stage}
              isExpanded={expandedStage === stage.id}
              onToggle={() => toggleExpand(stage.id)}
            />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="lg:hidden mt-8">
          <div 
            ref={sliderRef}
            className="overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="snap-center min-w-[85vw] px-2 flex-shrink-0"
                >
                  <StageCard 
                    stage={stage}
                    isExpanded={expandedStage === stage.id}
                    onToggle={() => toggleExpand(stage.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider pagination dots */}
          <div className="flex justify-center space-x-3 mt-6">
            {stages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-accent scale-125' : 'bg-accent/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInSlideUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default ImplementationStages; 