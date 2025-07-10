import { FC, useState, useEffect } from 'react';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <a href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="Optitrack"
              className="h-8"
            />
          </a>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className="text-text-primary hover:text-accent transition-colors"
            >
              Возможности
            </a>
            <a
              href="#advantages"
              className="text-text-primary hover:text-accent transition-colors"
            >
              Преимущества
            </a>
            <a
              href="#implementation"
              className="text-text-primary hover:text-accent transition-colors"
            >
              Внедрение
            </a>
            <a
              href="#pricing"
              className="text-text-primary hover:text-accent transition-colors"
            >
              Стоимость
            </a>
            <button className="btn-primary">Запросить демо</button>
          </nav>

          {/* Мобильное меню */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню (выпадающее) */}
        <div
          className={`lg:hidden absolute top-20 left-0 right-0 bg-bg-primary shadow-lg transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col p-4">
            <a
              href="#features"
              className="py-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Возможности
            </a>
            <a
              href="#advantages"
              className="py-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Преимущества
            </a>
            <a
              href="#implementation"
              className="py-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Внедрение
            </a>
            <a
              href="#pricing"
              className="py-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Стоимость
            </a>
            <button
              className="btn-primary mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Запросить демо
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 