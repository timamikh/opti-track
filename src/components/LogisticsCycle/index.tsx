import React from 'react';
import './styles.css';

const LogisticsCycle = () => {
  const cycleSteps = [
    {
      id: 1,
      icon: "document",
      title: "Order (Заявка)",
      description: "Автоматизация создания и обработки заявок на перевозку"
    },
    {
      id: 2,
      icon: "calendar",
      title: "Delivery (Доставка)",
      description: "Оптимизация маршрутов, консолидация грузов и эффективная загрузка транспорта"
    },
    {
      id: 3,
      icon: "truck",
      title: "Shipment (Поставка)",
      description: "Отслеживание перевозки и управление изменениями"
    },
    {
      id: 4,
      icon: "calculator",
      title: "Cost (Стоимость)",
      description: "Автоматический расчет и оптимизация расходов"
    },
    {
      id: 5,
      icon: "invoice",
      title: "Invoice (Счет)",
      description: "Формирование и верификация счетов"
    }
  ];

  return (
    <section className="logistics-cycle-section py-16">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Управление всей цепочкой транспортной логистики
        </h2>
        <h3 className="section-subtitle text-center">
          От заявки до инвойса в едином цифровом пространстве
        </h3>

        <div className="logistics-cycle-container">
          {cycleSteps.map((step) => (
            <div key={step.id} className="logistics-cycle-step">
              <div className="logistics-cycle-icon">
                <div className={`icon-${step.icon}`}></div>
              </div>
              <h4 className="logistics-cycle-title">{step.title}</h4>
              <p className="logistics-cycle-description">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-text-primary/70 mt-8 max-w-3xl mx-auto">
          Каждый этап процесса полностью интегрирован с вашими существующими системами и доступен для всех участников
        </p>
      </div>
    </section>
  );
};

export default LogisticsCycle; 