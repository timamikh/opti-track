import { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { functionalModules, FunctionalModule } from '../../components/FunctionalModules/data';

interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  technicalFeatures: string[];
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

// This is placeholder data - in a real app, you would fetch this from an API or CMS
const featureDetails: Record<string, FeatureDetail> = {
  'transport-requests': {
    id: 'transport-requests',
    title: 'Управление транспортными заявками',
    description: 'Модуль управления транспортными заявками позволяет эффективно создавать, отслеживать и управлять всеми транспортными заявками в единой системе. Решение автоматизирует процесс от создания заявки до завершения перевозки, обеспечивая полную прозрачность и контроль на всех этапах.',
    technicalFeatures: [
      'Централизованное хранение всех транспортных заявок',
      'Настраиваемые шаблоны заявок для разных типов перевозок',
      'Автоматическая валидация данных при создании заявок',
      'Система согласования и утверждения заявок с гибкими рабочими процессами',
      'Интеграция с системами планирования маршрутов',
      'API для интеграции с внешними системами',
      'Уведомления и оповещения о статусе заявок',
      'Полная история изменений по каждой заявке'
    ],
    benefits: [
      {
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Сокращение времени обработки',
        description: 'Снижение времени обработки заявок на 60% благодаря автоматизации рутинных операций'
      },
      {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        title: 'Повышение точности данных',
        description: 'Уменьшение ошибок в данных на 85% за счет автоматической валидации'
      },
      {
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        title: 'Рост эффективности',
        description: 'Увеличение количества обрабатываемых заявок на 40% без увеличения штата'
      },
      {
        icon: 'M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76',
        title: 'Улучшение коммуникации',
        description: 'Сокращение времени на коммуникацию между отделами на 75%'
      }
    ],
    screenshots: [
      {
        src: '/assets/images/solution/transport-orders.jpg',
        alt: 'Интерфейс управления транспортными заявками',
        caption: 'Панель управления транспортными заявками с фильтрацией и сортировкой'
      },
      {
        src: '/assets/images/solution/transport-orders.jpg',
        alt: 'Форма создания новой заявки',
        caption: 'Интуитивно понятная форма создания новой транспортной заявки'
      }
    ]
  },
  // Здесь будут другие модули
};

const FeatureModule: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [feature, setFeature] = useState<FeatureDetail | null>(null);
  const [module, setModule] = useState<FunctionalModule | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'benefits' | 'screenshots'>('overview');
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    if (moduleId) {
      // Find the module info
      const foundModule = functionalModules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }

      // Find the detailed feature info
      const foundFeature = featureDetails[moduleId];
      if (foundFeature) {
        setFeature(foundFeature);
      }
    }
  }, [moduleId]);

  if (!feature || !module) {
    return (
      <div className="container-custom py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Модуль не найден</h2>
          <p className="mb-6 text-text-primary/80">Запрашиваемый функциональный модуль не существует или находится в разработке.</p>
          <Link to="/features" className="btn-primary">
            Вернуться к списку модулей
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-bg-primary">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-input-button to-bg-primary border-b border-input-button/20">
        <div className="container-custom py-16">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mr-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={module.icon} />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">{feature.title}</h1>
          </div>
          <p className="text-lg text-text-primary/80 max-w-3xl">{feature.description}</p>
          
          {/* Navigation tabs */}
          <div className="flex flex-wrap mt-10 border-b border-input-button/20">
            <button 
              className={`px-5 py-3 font-medium text-sm transition-colors ${activeTab === 'overview' ? 'border-b-2 border-accent text-accent' : 'text-text-primary/70 hover:text-text-primary'}`}
              onClick={() => setActiveTab('overview')}
            >
              Обзор
            </button>
            <button 
              className={`px-5 py-3 font-medium text-sm transition-colors ${activeTab === 'technical' ? 'border-b-2 border-accent text-accent' : 'text-text-primary/70 hover:text-text-primary'}`}
              onClick={() => setActiveTab('technical')}
            >
              Технические особенности
            </button>
            <button 
              className={`px-5 py-3 font-medium text-sm transition-colors ${activeTab === 'benefits' ? 'border-b-2 border-accent text-accent' : 'text-text-primary/70 hover:text-text-primary'}`}
              onClick={() => setActiveTab('benefits')}
            >
              Эффект от внедрения
            </button>
            <button 
              className={`px-5 py-3 font-medium text-sm transition-colors ${activeTab === 'screenshots' ? 'border-b-2 border-accent text-accent' : 'text-text-primary/70 hover:text-text-primary'}`}
              onClick={() => setActiveTab('screenshots')}
            >
              Скриншоты
            </button>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="container-custom py-12">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Описание модуля</h2>
              <p className="mb-6 text-text-primary/80">{feature.description}</p>
              
              <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={feature.screenshots[0].src} 
                  alt={feature.screenshots[0].alt}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-text-primary">Ключевые возможности</h3>
              <ul className="space-y-3 mb-8">
                {feature.technicalFeatures.slice(0, 4).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-primary/90">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-8">
                <button className="btn-primary">Запросить демонстрацию</button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-input-button p-6 rounded-lg border border-input-button/20 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-text-primary">Преимущества модуля</h3>
                <ul className="space-y-4">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{benefit.title}</h4>
                        <p className="text-sm text-text-primary/70">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-input-button/20">
                  <h4 className="font-medium mb-3 text-text-primary">Интеграция с другими модулями</h4>
                  <div className="flex flex-wrap gap-2">
                    {functionalModules.slice(0, 4).map((relatedModule) => (
                      relatedModule.id !== moduleId && (
                        <Link 
                          key={relatedModule.id}
                          to={`/features/${relatedModule.id}`}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-bg-primary text-sm hover:bg-accent hover:text-white transition-colors text-text-primary/90"
                        >
                          <svg className="w-3 h-3 mr-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={relatedModule.icon} />
                          </svg>
                          {relatedModule.title.length > 20 
                            ? `${relatedModule.title.substring(0, 20)}...` 
                            : relatedModule.title}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical features tab */}
        {activeTab === 'technical' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary">Технические особенности</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              {feature.technicalFeatures.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-text-primary/90">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-input-button p-8 rounded-lg border border-input-button/20">
              <h3 className="text-xl font-bold mb-4 text-text-primary">Системные требования</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-accent mb-2">Сервер</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">CPU: 4+ ядра, 2.5+ ГГц</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">RAM: от 16 ГБ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Хранилище: от 100 ГБ SSD</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">ОС: Windows Server 2016+, Linux</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-accent mb-2">База данных</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">PostgreSQL 12+</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Microsoft SQL Server 2016+</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Oracle Database 19c+</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-accent mb-2">Клиент</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Современный веб-браузер</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Разрешение экрана: от 1366x768</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-text-primary/90">Интернет: от 1 Мбит/с</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits tab */}
        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary">Эффект от внедрения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="bg-input-button p-6 rounded-lg border border-input-button/20 hover:border-accent/30 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">{benefit.title}</h3>
                  </div>
                  <p className="text-text-primary/80">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-input-button to-bg-primary p-8 rounded-lg border border-input-button/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-bold mb-4 text-text-primary">Расчет ROI от внедрения</h3>
                  <p className="text-text-primary/80 mb-6">
                    Получите персонализированный расчет окупаемости инвестиций при внедрении модуля в вашей компании.
                  </p>
                  <button className="btn-primary">Рассчитать ROI</button>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-32 h-32 rounded-full bg-accent/10 text-accent">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screenshots tab */}
        {activeTab === 'screenshots' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary">Скриншоты</h2>
            
            <div className="mb-6">
              <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={feature.screenshots[activeScreenshot].src} 
                  alt={feature.screenshots[activeScreenshot].alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center text-text-primary/70">{feature.screenshots[activeScreenshot].caption}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {feature.screenshots.map((screenshot, index) => (
                <button 
                  key={index}
                  className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 transition-colors ${activeScreenshot === index ? 'border-accent' : 'border-transparent hover:border-accent/50'}`}
                  onClick={() => setActiveScreenshot(index)}
                >
                  <img 
                    src={screenshot.src} 
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA section */}
      <div className="container-custom mt-16">
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">Готовы оптимизировать ваши логистические процессы?</h2>
            <p className="text-lg mb-8 text-text-primary/90">Запросите демонстрацию модуля {feature.title} и узнайте, как наше решение может помочь вашему бизнесу.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">Запросить демонстрацию</button>
              <button className="btn-secondary">Связаться с экспертом</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureModule; 