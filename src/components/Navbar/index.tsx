import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { functionalModules } from '../FunctionalModules/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Check if the path is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close dropdown when clicking outside
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
            <Link 
              to="/" 
              className={`transition-colors relative ${isActive('/') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
            >
              Главная
              {isActive('/') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
            </Link>
            
            {/* Functional modules dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Link 
                to="/features"
                className={`flex items-center transition-colors relative ${isActive('/features') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <span>Функциональные возможности</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isActive('/features') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
              </Link>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[32rem] bg-input-button rounded-lg shadow-xl border border-input-button/20 overflow-hidden transform origin-top-left transition-all duration-200 ease-out"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {functionalModules.map((module) => (
                        <Link 
                          key={module.id}
                          to={`/features/${module.id}`}
                          className="flex items-start p-3 rounded-md hover:bg-bg-primary group transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    >
                      <span>Посмотреть все возможности</span>
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            >
              Блог
              {isActive('/blog') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
            </Link>
            
            <Link 
              to="/about" 
              className={`transition-colors relative ${isActive('/about') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
            >
              О компании
              {isActive('/about') && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent"></span>}
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
              className={`block px-3 py-2 transition-colors ${isActive('/') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
            >
              Главная
            </Link>
            
            {/* Mobile dropdown for functional modules */}
            <div className="px-3 py-2">
              <Link 
                to="/features"
                className={`flex items-center w-full text-left transition-colors ${isActive('/features') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Функциональные возможности</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {isDropdownOpen && (
                <div className="mt-2 pl-4 border-l-2 border-accent/30">
                  {functionalModules.map((module) => (
                    <Link 
                      key={module.id}
                      to={`/features/${module.id}`}
                      className="flex items-center py-2 text-sm text-text-primary hover:text-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={module.icon} />
                      </svg>
                      <span className="line-clamp-1">{module.title}</span>
                    </Link>
                  ))}
                  <Link 
                    to="/features"
                    className="flex items-center py-2 mt-1 text-sm font-medium text-accent hover:text-accent/80"
                    onClick={() => setIsOpen(false)}
                  >
                    Все возможности
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/blog"
              className={`block px-3 py-2 transition-colors ${isActive('/blog') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
            >
              Блог
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 transition-colors ${isActive('/about') ? 'text-accent font-medium' : 'text-text-primary hover:text-accent'}`}
            >
              О компании
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