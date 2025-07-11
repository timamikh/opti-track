import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="bg-bg-primary py-12 border-t border-text-primary/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div>
            <img
              src="/images/logo.svg"
              alt="Optitrack"
              className="h-8 mb-4"
            />
            <p className="text-text-primary/60 text-sm">
              Optitrack TMS – интеллектуальная система управления транспортом для современного бизнеса
            </p>
          </div>

          {/* Продукт */}
          <div>
            <h4 className="text-text-primary font-heading font-bold mb-4">Продукт</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-text-primary/60 hover:text-accent transition-colors">
                  Возможности
                </a>
              </li>
              <li>
                <a href="#advantages" className="text-text-primary/60 hover:text-accent transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#implementation" className="text-text-primary/60 hover:text-accent transition-colors">
                  Внедрение
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-text-primary/60 hover:text-accent transition-colors">
                  Стоимость
                </a>
              </li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-text-primary font-heading font-bold mb-4">Компания</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-text-primary/60 hover:text-accent transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-text-primary/60 hover:text-accent transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <a href="/careers" className="text-text-primary/60 hover:text-accent transition-colors">
                  Карьера
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-text-primary/60 hover:text-accent transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-text-primary font-heading font-bold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+74951234567"
                  className="text-text-primary/60 hover:text-accent transition-colors"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@optitrack.ru"
                  className="text-text-primary/60 hover:text-accent transition-colors"
                >
                  info@optitrack.ru
                </a>
              </li>
              <li className="text-text-primary/60">
                Москва, ул. Примерная, д. 1
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-12 pt-8 border-t border-text-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-primary/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Optitrack. Все права защищены.
            </div>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-text-primary/60 hover:text-accent transition-colors text-sm"
              >
                Политика конфиденциальности
              </a>
              <a
                href="/terms"
                className="text-text-primary/60 hover:text-accent transition-colors text-sm"
              >
                Условия использования
              </a>
              <Link
                to="/login"
                className="text-text-primary/60 hover:text-accent transition-colors text-sm"
              >
                Вход для авторов
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 