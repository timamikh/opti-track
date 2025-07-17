import { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { functionalModules, FunctionalModule } from '../../components/FunctionalModules/data';
import { moduleDetails, ModuleDetail } from '../../components/FunctionalModules/moduleDetails';

// Функция для получения изображения модуля
const getModuleImage = (moduleId: string): string => {
  // Карта соответствия ID модулей и изображений
  const imageMap: Record<string, string> = {
    'transport-requests': '/images/solution/transport-orders.jpg',
    'transport-planning': '/images/solution/route-planning.jpg',
    'carrier-management': '/images/solution/carrier-management.jpg',
    'tracking': '/images/solution/route-planning.jpg',
    'document-management': '/images/solution/transport-orders.jpg',
    'cost-control': '/images/solution/analytics-reporting.jpg',
    'integrations': '/images/solution/carrier-management.jpg',
    'load-optimization': '/images/solution/route-planning.jpg',
    'analytics': '/images/solution/analytics-reporting.jpg',
    'yard-management': '/images/solution/carrier-management.jpg',
    'risk-management': '/images/solution/transport-orders.jpg'
  };

  // Возвращаем соответствующее изображение или изображение по умолчанию
  return imageMap[moduleId] || '/images/solution/transport-orders.jpg';
};

const FeatureModule: FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<FunctionalModule | null>(null);
  const [details, setDetails] = useState<ModuleDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'benefits' | 'screenshots'>('overview');
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    if (moduleId) {
      // Find the module info
      const foundModule = functionalModules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }

      // Find the detailed module info
      const foundDetails = moduleDetails[moduleId];
      if (foundDetails) {
        setDetails(foundDetails);
      }
    }
  }, [moduleId]);

  if (!module || !details) {
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

  // Получаем путь к изображению для текущего модуля
  const moduleImage = getModuleImage(module.id);

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
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">{details.title}</h1>
          </div>
          <p className="text-lg text-text-primary/80 max-w-3xl">{details.overview}</p>
          
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
              <p className="mb-6 text-text-primary/80">{details.overview}</p>
              
              <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={moduleImage} 
                  alt={`Интерфейс модуля ${details.title}`}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-text-primary">Ключевые возможности</h3>
              <ul className="space-y-3 mb-8">
                {details.technicalFeatures.slice(0, 4).map((item, index) => (
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
                  {details.benefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{benefit.title}</h4>
                        <p className="text-sm text-text-primary/70">{benefit.value}</p>
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
              {details.technicalFeatures.map((item, index) => (
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
            
            <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Хотите узнать больше о технических возможностях?</h3>
                <p className="mb-6 text-text-primary/80">Наши эксперты готовы продемонстрировать все функциональные возможности модуля и ответить на ваши вопросы.</p>
                <button className="btn-primary">Запросить техническую консультацию</button>
              </div>
            </div>
          </div>
        )}

        {/* Benefits tab */}
        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary">Эффект от внедрения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {details.benefits.map((benefit, index) => (
                <div key={index} className="bg-input-button p-6 rounded-lg border border-input-button/20 hover:border-accent/30 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-text-primary">{benefit.title}</h3>
                  <p className="text-accent font-bold text-xl">{benefit.value}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Рассчитайте свою выгоду</h3>
                <p className="mb-6 text-text-primary/80">Мы поможем рассчитать потенциальную экономию и эффект от внедрения для вашего бизнеса.</p>
                <button className="btn-primary">Получить расчет эффективности</button>
              </div>
            </div>
          </div>
        )}

        {/* Screenshots tab */}
        {activeTab === 'screenshots' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary">Скриншоты интерфейса</h2>
            
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={moduleImage}
                  alt={`Интерфейс модуля ${details.title}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center mt-3 text-text-primary/70">Интерфейс модуля {details.title}</p>
            </div>
            
            <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-8 mt-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Хотите увидеть систему в действии?</h3>
                <p className="mb-6 text-text-primary/80">Запросите демонстрацию, и наши специалисты покажут работу модуля на реальных примерах.</p>
                <button className="btn-primary">Запросить демонстрацию</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related modules section */}
      <div className="container-custom mt-12 pt-12 border-t border-input-button/20">
        <h2 className="text-2xl font-bold mb-8 text-text-primary">Связанные модули</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {functionalModules.slice(0, 3).map((relatedModule) => (
            relatedModule.id !== moduleId && (
              <Link 
                key={relatedModule.id}
                to={`/features/${relatedModule.id}`}
                className="bg-input-button p-6 rounded-lg border border-input-button/20 hover:border-accent/50 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={relatedModule.icon} />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{relatedModule.title}</h2>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="flex items-center text-sm text-accent font-medium">
                    <span>Подробнее</span>
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/features" className="btn-secondary">
            Все функциональные модули
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureModule; 