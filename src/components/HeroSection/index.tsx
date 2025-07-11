import { useState } from 'react';
import ContactModal from '../ContactModal';
import routePlanningImg from '/assets/images/solution/route-planning.jpg';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'expert'>('demo');

  const openModal = (type: 'demo' | 'expert') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <section className="relative bg-bg-primary py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-product text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Optitrack – TMS-решение нового поколения для крупных грузовладельцев
            </h1>
            <h2 className="text-xl md:text-2xl text-text-primary/80 mb-8">
              Оптимизация логистики для предприятий с объемом от 200 перевозок в сутки
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openModal('demo')}
                className="btn-primary"
              >
                Запросить демо
              </button>
              <button
                onClick={() => openModal('expert')}
                className="btn-secondary"
              >
                Связаться с экспертом
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={routePlanningImg}
                alt="Optitrack TMS"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </section>
  );
};

export default HeroSection; 