import { FC } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy: FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 pt-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">
              Политика конфиденциальности персональных данных
            </h1>
            
            <div className="prose prose-lg max-w-none text-text-primary/80 space-y-6">
              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  1. Общие положения
                </h2>
                <p className="mb-4">
                  Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении всей информации, которую компания ProSpace может получить о пользователе во время использования им сайта Opti-track TMS.
                </p>
                <p className="mb-4">
                  Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  2. Сбор и использование персональной информации
                </h2>
                <p className="mb-4">
                  Персональная информация пользователей собирается и используется исключительно в целях предоставления пользователям персонализированного сервиса.
                </p>
                <p className="mb-4">
                  Мы собираем следующие виды персональной информации:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Имя и фамилия</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона</li>
                  <li>Информация о компании</li>
                  <li>Техническая информация о посещениях сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  3. Цели обработки персональных данных
                </h2>
                <p className="mb-4">
                  Персональные данные пользователей обрабатываются в следующих целях:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Предоставление услуг и поддержки пользователям</li>
                  <li>Связь с пользователями для предоставления информации о продуктах и услугах</li>
                  <li>Улучшение качества услуг и разработка новых продуктов</li>
                  <li>Проведение статистических и аналитических исследований</li>
                  <li>Выполнение правовых обязательств</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  4. Передача персональных данных третьим лицам
                </h2>
                <p className="mb-4">
                  Мы не передаем персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
                </p>
                <p className="mb-4">
                  Передача персональных данных может осуществляться в следующих случаях:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>По требованию уполномоченных государственных органов</li>
                  <li>При получении согласия пользователя</li>
                  <li>Для защиты прав и интересов компании</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  5. Хранение и защита персональных данных
                </h2>
                <p className="mb-4">
                  Мы принимаем необходимые технические и организационные меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения.
                </p>
                <p className="mb-4">
                  Персональные данные хранятся в течение времени, необходимого для достижения целей их обработки, но не дольше, чем этого требует законодательство.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  6. Права пользователей
                </h2>
                <p className="mb-4">
                  Пользователи имеют право:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Получать информацию о обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                  <li>Отзывать согласие на обработку персональных данных</li>
                  <li>Обращаться с жалобами в уполномоченный орган по защите прав субъектов персональных данных</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  7. Изменения в Политике конфиденциальности
                </h2>
                <p className="mb-4">
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений мы уведомляем пользователей путем размещения новой версии на сайте.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                  8. Контактная информация
                </h2>
                <p className="mb-4">
                  По всем вопросам, связанным с настоящей Политикой конфиденциальности, вы можете обратиться к нам по адресу электронной почты: 
                  <a href="mailto:privacy@prospace.tech" className="text-accent hover:text-text-highlight ml-2">
                    privacy@prospace.tech
                  </a>
                </p>
              </section>

              <div className="mt-8 pt-8 border-t border-text-primary/10">
                <p className="text-sm text-text-primary/60">
                  Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 