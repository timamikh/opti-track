import { useState } from 'react';

interface SolutionSlide {
  id: string;
  title: string;
  description: string;
  effect: string;
  image: string;
}

const slides: SolutionSlide[] = [
  {
    id: 'requests',
    title: 'Управление транспортными заявками',
    description: 'Автоматическое распределение заявок, приоритизация и отслеживание их выполнения. Интеграция с внешними системами заказчиков.',
    effect: '75% сокращение времени обработки заявок, 92% снижение ошибок при оформлении.',
    image: '/assets/images/solution/transport-orders.jpg'
  },
  {
    id: 'planning',
    title: 'Планирование перевозок',
    description: 'Оптимизация маршрутизации, консолидация грузов и учёт временных окон. Поддержка мультимодальных перевозок и различных типов доставки.',
    effect: 'до 30% сокращение пробега, 15-25% снижение расходов на логистику.',
    image: '/assets/images/solution/route-planning.jpg'
  },
  {
    id: 'carriers',
    title: 'Управление наемным транспортом',
    description: 'Онлайн-торги на перевозки, автоматическое распределение рейсов по KPI, электронный документооборот с перевозчиками.',
    effect: '10-18% снижение стоимости услуг перевозчиков, 85% снижение риска срыва перевозок.',
    image: '/assets/images/solution/carrier-management.jpg'
  },
  {
    id: 'analytics',
    title: 'Аналитика и отчетность',
    description: 'Мониторинг KPI логистики, визуализация метрик, многомерный анализ данных и прогнозирование на основе исторических данных.',
    effect: '90% сокращение времени на подготовку отчетов, повышение качества принимаемых решений.',
    image: '/assets/images/solution/analytics-reporting.jpg'
  }
];

const SolutionDescription = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className="bg-bg-primary py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Комплексное решение для транспортной логистики
        </h2>
        <p className="section-subtitle text-center max-w-3xl mx-auto">
          Optitrack TMS - интеллектуальная система управления транспортом для современного бизнеса
        </p>

        <div className="mt-16">
          {/* Слайдер */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-6 bg-input-button rounded-lg">
                        <h3 className="text-2xl font-heading font-bold mb-4">
                          {slide.title}
                        </h3>
                        <p className="text-text-primary/80 mb-6">
                          {slide.description}
                        </p>
                        <div className="bg-accent/10 p-4 rounded-lg">
                          <p className="text-accent font-bold">Эффект:</p>
                          <p className="text-text-primary">{slide.effect}</p>
                        </div>
                      </div>
                      <div className="relative aspect-video">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-bg-primary/80 p-3 rounded-full hover:bg-accent transition-colors"
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-bg-primary/80 p-3 rounded-full hover:bg-accent transition-colors"
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Навигация по слайдам */}
          <div className="flex justify-center gap-4 mt-8">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSlide === index
                    ? 'bg-accent text-text-primary'
                    : 'bg-input-button text-text-primary/60 hover:text-text-primary'
                }`}
              >
                {slide.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDescription; 