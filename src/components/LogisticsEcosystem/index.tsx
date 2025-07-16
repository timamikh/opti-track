import React from 'react';
import './styles.css';

const LogisticsEcosystem = () => {
  const participants = [
    {
      id: 1,
      icon: "customer-service",
      title: "Клиентский сервис",
      description: "Управление ожиданиями клиентов и контроль SLA"
    },
    {
      id: 2,
      icon: "logistics-manager",
      title: "Логистические менеджеры",
      description: "Планирование и оптимизация логистических процессов"
    },
    {
      id: 3,
      icon: "transport-company",
      title: "Транспортные компании",
      description: "Координация перевозок и оперативная связь"
    },
    {
      id: 4,
      icon: "supplier",
      title: "Поставщики сырья",
      description: "Синхронизация поставок и производственных циклов"
    },
    {
      id: 5,
      icon: "warehouse",
      title: "Склады и распределительные центры",
      description: "Контроль запасов и оптимизация размещения"
    },
    {
      id: 6,
      icon: "finance",
      title: "Финансовые службы",
      description: "Автоматизация взаиморасчетов и финансовый контроль"
    }
  ];

  const integrations = [
    {
      id: 1,
      icon: "gis",
      title: "Государственные информационные системы",
      description: "Соответствие отраслевым требованиям и стандартам",
      badge: "Нормативное соответствие"
    },
    {
      id: 2,
      icon: "erp",
      title: "Корпоративные ERP-системы",
      description: "Соответствие требованиям ФНС и финансового аудита",
      badge: "Финансовая прозрачность"
    },
    {
      id: 3,
      icon: "wms",
      title: "Системы управления складом",
      description: "Сквозные процессы и контроль складских нормативов",
      badge: "Оптимизация запасов"
    },
    {
      id: 4,
      icon: "carrier-erp",
      title: "Системы перевозчиков",
      description: "Сквозные процессы, аудит финансов и документооборот",
      badge: "Прозрачная логистика"
    }
  ];

  return (
    <section className="logistics-ecosystem-section py-16">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Единая экосистема для всех участников логистического процесса
        </h2>

        <div className="ecosystem-layout">
          {/* Left Side - Hexagonal Grid */}
          <div className="ecosystem-left">
            <h3 className="section-subtitle text-center">
              Эффективное взаимодействие всех ролей
            </h3>

            <div className="hexagon-structure">
              <div className="hexagon-center">
                <div className="hexagon-content">
                  <div className="tms-icon">Opti-track<br/>TMS</div>
                </div>
              </div>
              
              {participants.map((participant, index) => (
                <div 
                  key={participant.id} 
                  className={`hexagon-item hexagon-item-${index + 1}`}
                >
                  <div className="hexagon-content">
                    <div className="participant-icon">
                      <div className={`icon-${participant.icon}`}></div>
                    </div>
                    <h4 className="participant-title">{participant.title}</h4>
                    <p className="participant-description">{participant.description}</p>
                  </div>
                  <div className="hexagon-connection"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Integration Blocks */}
          <div className="ecosystem-right">
            <h3 className="section-subtitle text-center">
              Бесшовная интеграция с ключевыми системами
            </h3>

            <div className="integrations-grid">
              {integrations.map((integration) => (
                <div key={integration.id} className="integration-card">
                  <div className="integration-icon">
                    <div className={`icon-${integration.icon}`}></div>
                  </div>
                  <h4 className="integration-title">{integration.title}</h4>
                  <p className="integration-description">{integration.description}</p>
                  <span className="integration-badge">{integration.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsEcosystem; 