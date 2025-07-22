import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="bg-bg-primary py-12 border-t border-text-primary/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div>
            <img
              src="/images/logo.svg"
              alt="Optitrack"
              className="h-8 mb-4"
            />
            <p className="text-text-primary/60 text-sm mb-4">
              Optitrack TMS – интеллектуальная система управления транспортом для современного бизнеса
            </p>
            <div className="text-text-primary/60 text-sm">
              <p className="mb-2">Продукт компании</p>
              <a 
                href="https://prospace.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-text-highlight transition-colors font-medium"
              >
                ProSpace
              </a>
            </div>
          </div>

          {/* Политика конфиденциальности */}
          <div>
            <h4 className="text-text-primary font-heading font-bold mb-4">Документы</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-text-primary/60 hover:text-accent transition-colors"
                >
                  Политика конфиденциальности персональных данных
                </Link>
              </li>
            </ul>
          </div>

          {/* Вход для авторов */}
          <div>
            <h4 className="text-text-primary font-heading font-bold mb-4">Авторизация</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-text-primary/60 hover:text-accent transition-colors"
                >
                  Вход для авторов
                </Link>
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