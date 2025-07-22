import { FC, useState, useEffect, useRef } from 'react';
import './styles.css';
import { benefitCategories } from './data';
import { BenefitIcon } from './icons';

const BenefitsSection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0); // Первая категория выбрана по умолчанию
  const [activeSubcategory, setActiveSubcategory] = useState<number>(0); // Первая подкатегория выбрана по умолчанию
  const [animateDetails, setAnimateDetails] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Эффект для анимации при смене подкатегории
  useEffect(() => {
    setAnimateDetails(true);
    const timer = setTimeout(() => {
      setAnimateDetails(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, activeSubcategory]);

  // Эффект для прокрутки к деталям на мобильных устройствах
  useEffect(() => {
    if (window.innerWidth < 768 && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeSubcategory]);

  const handleCategoryClick = (index: number) => {
    if (activeCategory === index) {
      return; // Не снимаем выбор с категории
    } else {
      setActiveCategory(index);
      setActiveSubcategory(0); // Автоматически выбираем первую подкатегорию
      
      // Прокрутка к контейнеру подкатегорий
      if (containerRef.current) {
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }
  };

  const handleSubcategoryClick = (index: number) => {
    setActiveSubcategory(index);
  };

  return (
    <section className="benefits-section py-16 bg-bg-primary">
      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-4xl font-heading mb-4">Эффекты от внедрения Opti-Track TMS</h2>
          <p className="section-subtitle text-xl max-w-4xl mx-auto">
            Комплексная система для повышения эффективности логистики и сокращения затрат на всех этапах транспортировки
          </p>
        </div>

        <div className="benefits-categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {benefitCategories.map((category, index) => (
            <div 
              key={index} 
              className={`benefit-category p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                activeCategory === index ? 'active-category' : ''
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              <div className="benefit-icon mb-4">
                {category.iconName && <BenefitIcon name={category.iconName} />}
              </div>
              <h3 className="text-xl font-heading mb-2">{category.title}</h3>
              <p className="text-sm">{category.shortDescription}</p>
            </div>
          ))}
        </div>

        <div ref={containerRef} className="subcategories-container mt-8">
          <h3 className="text-2xl font-heading mb-6 text-center md:text-left">
            {benefitCategories[activeCategory].title}
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Левая колонка с подкатегориями */}
            <div className="subcategories-tabs w-full md:w-1/3 flex flex-col gap-3">
              {benefitCategories[activeCategory].subcategories.map((subcategory, index) => (
                <div 
                  key={index} 
                  className={`subcategory-tab p-4 rounded-md cursor-pointer transition-all duration-300 ${
                    activeSubcategory === index ? 'active-subcategory' : ''
                  }`}
                  onClick={() => handleSubcategoryClick(index)}
                >
                  <h4 className="text-lg font-medium">{subcategory.title}</h4>
                </div>
              ))}
            </div>
            
            {/* Правая колонка с детальным описанием */}
            <div 
              ref={detailsRef}
              className={`subcategory-details w-full md:w-2/3 p-6 rounded-lg ${animateDetails ? 'animate-fadeIn' : ''}`}
            >
              <h4 className="text-xl font-heading mb-6 text-accent">
                {benefitCategories[activeCategory].subcategories[activeSubcategory].title}
              </h4>
              <ul className="benefit-list space-y-4">
                {benefitCategories[activeCategory].subcategories[activeSubcategory].details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="benefit-bullet mr-3 flex-shrink-0">•</span>
                    <span className="text-text-primary/90">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 