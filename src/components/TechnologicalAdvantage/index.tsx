import { FC, useState, useEffect, useRef } from 'react';

interface AdvantageCard {
  id: string;
  title: string;
  icon: JSX.Element;
  features: string[];
}

const advantageCards: AdvantageCard[] = [
  {
    id: 'platform',
    title: 'Продукт реализован на платформе ProSpace',
    icon: (
      <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    features: [
      'Российская разработка',
      'Только открытые и доступные технологии от ведущих поставщиков open source',
      'Заказчик владеет кодом без ограничений на изменение',
      'Лицензирование на экземпляр, без увеличения стоимости при росте пользователей',
      'Масштабирование до 100 000+ пользователей без потери производительности',
      'Развертывание в любых средах (локальные, облачные, собственные)',
      'Микросервисная архитектура'
    ]
  },
  {
    id: 'support',
    title: 'Enterprise уровень технической поддержки',
    icon: (
      <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    features: [
      'Доступность всех уровней поддержки 24/7',
      '99.5% средний SLA за 10 лет',
      'Система проактивного мониторинга и диагностики',
      '0 остановок системы дольше 4 часов за 15 лет работы',
      'Интеграция с инфраструктурой и сервисами заказчика'
    ]
  },
  {
    id: 'security',
    title: 'Безопасность подтверждена международным аудитором',
    icon: (
      <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: [
      'Автоматизированные средства проверки безопасности',
      'Аутентификация через внешние коннекторы (Blitz, Okta, ADFS и др.)',
      'Контроль доступа к данным и действиям в системе',
      'Авторизация пользователей при работе с API',
      'Быстрая аутентификация через кеширование',
      'Хранение всех изменений полей (audit trail)',
      'Визуализация лога изменений и прослеживаемость'
    ]
  },
  {
    id: 'integration',
    title: 'Широкие интеграционные возможности',
    icon: (
      <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Бесшовная интеграция с SAP',
      'Интеграция с WMS, YMS и другими SCM продуктами',
      'Интеграция с продуктами 1С',
      'Поддержка IoT: сбор и анализ данных от устройств',
      'Поддержка GPS для отслеживания транспорта в реальном времени',
      'Мобильное приложение для водителей и сотрудников склада'
    ]
  }
];

const TechnologicalAdvantage: FC = () => {
  // Split cards into two rows
  const firstRow = advantageCards.slice(0, 2);
  const secondRow = advantageCards.slice(2, 4);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handle slider navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % advantageCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + advantageCards.length) % advantageCards.length);
  };

  // Render a single card
  const renderCard = (card: AdvantageCard) => (
    <div
      key={card.id}
      className="bg-input-button p-5 rounded-lg hover:transform hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        <div className="mr-3 flex-shrink-0">{card.icon}</div>
        <h3 className="text-lg font-heading font-bold">{card.title}</h3>
      </div>
      <ul className="space-y-1 flex-grow">
        {card.features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm">
            <span className="text-accent mr-1 flex-shrink-0">•</span>
            <span className="text-text-primary/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Mobile slider view
  if (isMobile) {
    return (
      <section className="bg-bg-primary py-16">
        <div className="container-custom">
          <h2 className="section-title text-center text-2xl mb-8">Технологическое преимущество</h2>
          
          <div className="relative">
            <div 
              ref={sliderRef}
              className="overflow-hidden"
            >
              <div className="px-4">
                {renderCard(advantageCards[currentSlide])}
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {advantageCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? 'bg-accent' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-input-button p-2 rounded-full shadow-lg"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-input-button p-2 rounded-full shadow-lg"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop view
  return (
    <section className="bg-bg-primary py-16">
      <div className="container-custom">
        <h2 className="section-title text-center text-2xl mb-8">Технологическое преимущество</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {/* First row */}
          {firstRow.map(renderCard)}
          
          {/* Second row */}
          {secondRow.map(renderCard)}
        </div>
      </div>
    </section>
  );
};

export default TechnologicalAdvantage; 