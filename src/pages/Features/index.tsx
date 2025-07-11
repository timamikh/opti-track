import { FC } from 'react';
import { Link } from 'react-router-dom';
import { functionalModules } from '../../components/FunctionalModules/data';

const Features: FC = () => {
  return (
    <div className="pt-20 pb-16 bg-bg-primary">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-input-button to-bg-primary border-b border-input-button/20">
        <div className="container-custom py-16">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-primary">Функциональные возможности</h1>
          <p className="text-lg text-text-primary/80 max-w-3xl">
            Полный набор инструментов для оптимизации транспортной логистики вашего бизнеса.
            Выберите интересующий вас модуль для получения подробной информации.
          </p>
        </div>
      </div>

      {/* Modules grid */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalModules.map((module) => (
            <Link 
              key={module.id}
              to={`/features/${module.id}`}
              className="bg-input-button p-6 rounded-lg border border-input-button/20 hover:border-accent/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={module.icon} />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{module.title}</h2>
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
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="container-custom mt-8">
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">Нужна помощь в выборе модулей?</h2>
            <p className="text-lg mb-8 text-text-primary/90">Наши эксперты помогут подобрать оптимальный набор функциональных возможностей под ваши бизнес-задачи.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">Получить консультацию</button>
              <button className="btn-secondary">Запросить демонстрацию</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 