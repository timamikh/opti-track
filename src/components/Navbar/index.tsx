import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-bg-primary/80 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Optitrack Logo" className="h-8 w-auto" />
            <span className="text-text-primary text-xl font-bold font-product">
              OptiTrack
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-accent"
          >
            <span className="sr-only">Open menu</span>
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

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-primary hover:text-accent transition-colors">
              Главная
            </Link>
            <Link to="/about" className="text-text-primary hover:text-accent transition-colors">
              О нас
            </Link>
            <Link to="/contact" className="text-text-primary hover:text-accent transition-colors">
              Контакты
            </Link>
            <button className="btn-primary">
              Попробовать
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-text-primary hover:text-accent transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-text-primary hover:text-accent transition-colors"
            >
              О нас
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-text-primary hover:text-accent transition-colors"
            >
              Контакты
            </Link>
            <button className="w-full text-left px-3 py-2 btn-primary">
              Попробовать
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 