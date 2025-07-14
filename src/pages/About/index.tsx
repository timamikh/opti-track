import { FC } from 'react';
import { advantages, historyItems, clients, products } from '../../data/aboutData';
import '../../styles/about.css';

const About: FC = () => {
  return (
    <div className="bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center">
            <h1 className="section-title">О нас</h1>
            <p className="section-subtitle max-w-3xl mx-auto">
              Наша миссия — создавать лучшие цифровые продукты, которые помогают достигать новых высот, 
              делают работу проще, данные полезнее, а опыт пользователя потрясающим
            </p>
          </div>
        </div>
      </section>

      {/* Years Section */}
      <section className="py-16 bg-input-button">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Создаем цифровые решения уже более 15 лет</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">15 лет</div>
              <p>успешной работы</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">120+</div>
              <p>экспертов в команде</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">300+</div>
              <p>реализованных проектов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage) => (
              <div key={advantage.id} className="bg-input-button p-8 rounded-lg advantage-card">
                <div 
                  className="advantage-icon"
                  dangerouslySetInnerHTML={{ __html: advantage.icon }}
                />
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-input-button">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">История компании</h2>
          <div className="space-y-12 history-timeline">
            {historyItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-6 history-item history-point">
                <div className="md:w-1/4 flex flex-col items-center md:items-start">
                  <div className="bg-accent text-white text-xl font-bold px-4 py-2 rounded-lg">
                    {item.period}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Наши клиенты</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div key={client.id} className="bg-input-button p-6 rounded-lg flex items-center justify-center h-24 client-card">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-input-button">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Подстраиваем подход под клиента и задачу</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-bg-primary p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">01</div>
              <p>Классическое проектное управление в каскадном стиле и проработанным шаблоном</p>
            </div>
            <div className="bg-bg-primary p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">02</div>
              <p>SCRUM — разработка, структурированный и отработанный процесс Agile разработки</p>
            </div>
            <div className="bg-bg-primary p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">03</div>
              <p>Scaled Agile Framework (SAFe) для управления процессами организации</p>
            </div>
            <div className="bg-bg-primary p-6 rounded-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">04</div>
              <p>Строим и развиваем DevOps практики, которые оптимизируют процессы разработки и эксплуатации</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Наши продукты</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-input-button p-8 rounded-lg product-card">
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="mb-4">{product.description}</p>
                <a href={product.link} className="text-accent product-link">Подробнее →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-input-button">
        <div className="container-custom">
          <div className="bg-bg-primary p-8 md:p-12 rounded-lg">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Обсудить проект</h2>
                <p className="mb-6">
                  Оставьте свои контакты, мы свяжемся с вами и проконсультируем вас по интересующим вопросам
                </p>
              </div>
              <div>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-input-button border border-gray-700 rounded-lg p-3 text-white"
                      placeholder="Имя"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-input-button border border-gray-700 rounded-lg p-3 text-white"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-input-button border border-gray-700 rounded-lg p-3 text-white"
                      placeholder="Телефон"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Отправить</button>
                  <p className="text-xs text-gray-400 mt-2">
                    Нажимая кнопку Отправить, вы подтверждаете своё согласие на обработку персональных данных
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 