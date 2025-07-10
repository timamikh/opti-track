import { FC, useState } from 'react';

interface Stage {
  id: string;
  number: number;
  title: string;
  duration: string;
  tasks: string[];
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
    ]
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

const ImplementationStages: FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="bg-bg-primary py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Этапы внедрения Optitrack TMS</h2>

        {/* Десктопная версия */}
        <div className="hidden lg:grid grid-cols-5 gap-6 mt-12">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`bg-input-button p-6 rounded-lg transition-all duration-300 ${
                activeStage === stage.number ? 'transform -translate-y-2' : ''
              }`}
              onMouseEnter={() => setActiveStage(stage.number)}
              onMouseLeave={() => setActiveStage(null)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-xl font-bold">
                  {stage.number}
                </div>
                <div className="ml-4 text-sm text-text-primary/60">{stage.duration}</div>
              </div>
              <h3 className="text-lg font-heading font-bold mb-4">{stage.title}</h3>
              <div className="h-px bg-accent/20 mb-4" />
              <ul className="space-y-2">
                {stage.tasks.map((task, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-accent mr-2">•</span>
                    <span className="text-text-primary/80">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Мобильная версия (слайдер) */}
        <div className="lg:hidden mt-12">
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="bg-input-button p-6 rounded-lg min-w-[300px]"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-xl font-bold">
                      {stage.number}
                    </div>
                    <div className="ml-4 text-sm text-text-primary/60">{stage.duration}</div>
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-4">{stage.title}</h3>
                  <div className="h-px bg-accent/20 mb-4" />
                  <ul className="space-y-2">
                    {stage.tasks.map((task, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-accent mr-2">•</span>
                        <span className="text-text-primary/80">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationStages; 