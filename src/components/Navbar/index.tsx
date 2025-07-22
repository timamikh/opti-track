import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, FC } from 'react';
import { functionalModules } from '../FunctionalModules/data';

/**
 * Компонент Navbar - основная навигационная панель сайта
 * Отображает логотип, основные разделы и выпадающее меню с функциональными модулями
 * Адаптирован для мобильных устройств с выпадающим меню-бургером
 */
const Navbar: FC = () => {
  // Состояния для управления мобильным меню и выпадающим списком
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  /**
   * Проверяет, активен ли указанный путь
   * @param path - Путь для проверки
   * @returns true, если путь активен
   */
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Закрытие выпадающего меню при клике вне его области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-bg-primary/80 backdrop-blur-md" aria-label="Главная навигация">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2" aria-label="На главную">
            <img src="/images/logo.svg" alt="Optitrack Logo" className="h-8 w-auto" />
            <span className="text-text-primary text-xl font-bold font-product">
              OptiTrack
            </span>
          </Link>

          {/* Кнопка мобильного меню */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-accent"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className="sr-only">Открыть меню</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors relative ${isActive('/') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Главная
              {isActive('/') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
            </Link>
            
            {/* Выпадающий список функциональных модулей */}
            <div className="relative" ref={dropdownRef}>
              <Link 
                to="/features"
                className={`flex items-center transition-colors relative ${isActive('/features') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                aria-expanded={isDropdownOpen}
                aria-controls="features-dropdown"
                aria-current={isActive('/features') ? 'page' : undefined}
              >
                <span>Возможности продукта</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isActive('/features') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
              </Link>
              
              {/* Выпадающее меню */}
              {isDropdownOpen && (
                <div 
                  id="features-dropdown"
                  className="absolute left-0 mt-2 w-[32rem] bg-input-button rounded-lg shadow-xl border border-input-button/20 overflow-hidden transform origin-top-left transition-all duration-200 ease-out"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="features-menu-button"
                >
                  <div className="p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {functionalModules.map((module) => (
                        <Link 
                          key={module.id}
                          to={`/features/${module.id}`}
                          className="flex items-start p-3 rounded-md hover:bg-bg-primary group transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                          role="menuitem"
                        >
                          <div className="flex-shrink-0 mr-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={module.icon} />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary group-hover:text-accent">{module.title}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-bg-primary p-3 mt-1">
                    <Link 
                      to="/features"
                      className="text-sm text-accent hover:text-accent/80 font-medium flex items-center justify-center"
                      onClick={() => setIsDropdownOpen(false)}
                      role="menuitem"
                    >
                      <span>Посмотреть все возможности</span>
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/blog" 
              className={`transition-colors relative ${isActive('/blog') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/blog') ? 'page' : undefined}
            >
              Блог
              {isActive('/blog') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
            </Link>
            
            <Link 
              to="/about" 
              className={`transition-colors relative ${isActive('/about') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              О компании
              {isActive('/about') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
            </Link>
            
            <button className="btn-primary" aria-label="Попробовать продукт">
              Попробовать
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 transition-colors ${isActive('/') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Главная
            </Link>
            
            {/* Мобильное выпадающее меню для функциональных модулей */}
            <div className="px-3 py-2">
              <Link 
                to="/features"
                className={`flex items-center w-full text-left transition-colors ${isActive('/features') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="mobile-features-dropdown"
                aria-current={isActive('/features') ? 'page' : undefined}
              >
                <span>Возможности продукта</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {isDropdownOpen && (
                <div 
                  id="mobile-features-dropdown" 
                  className="mt-2 pl-4 border-l-2 border-accent/30"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {functionalModules.map((module) => (
                    <Link 
                      key={module.id}
                      to={`/features/${module.id}`}
                      className="flex items-center py-2 text-sm text-text-primary hover:text-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                    >
                      <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={module.icon} />
                      </svg>
                      <span className="line-clamp-1">{module.title}</span>
                    </Link>
                  ))}
                  <Link 
                    to="/features"
                    className="flex items-center py-2 mt-1 text-sm font-medium text-accent hover:text-accent/80"
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                  >
                    Все возможности
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/blog"
              className={`block px-3 py-2 transition-colors ${isActive('/blog') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/blog') ? 'page' : undefined}
            >
              Блог
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 transition-colors ${isActive('/about') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              О компании
            </Link>
            <button className="w-full text-left px-3 py-2 btn-primary" aria-label="Попробовать продукт">
              Попробовать
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 