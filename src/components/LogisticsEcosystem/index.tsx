import { FC } from 'react';
import './styles.css';

/**
 * Компонент LogisticsEcosystem - отображает экосистему логистических процессов
 * с участниками и интеграциями в гексагональной структуре
 */
const LogisticsEcosystem: FC = () => {
  // Данные участников логистического процесса
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

  // Данные интеграций с внешними системами
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
    <section className="logistics-ecosystem-section py-16" aria-label="Экосистема логистических процессов">
      <div className="container-custom">
        <h2 className="section-title text-center">
          Единая экосистема для всех участников логистического процесса
        </h2>

        <div className="ecosystem-layout">
          {/* Левая часть - Гексагональная структура */}
          <div className="ecosystem-left">
            <h3 className="section-subtitle text-center">
              Эффективное взаимодействие всех ролей
            </h3>

            <div className="hexagon-structure">
              <div className="hexagon-center">
                <div className="hexagon-content">
                  <div className="tms-icon font-product" aria-label="Центральный элемент - Opti-track TMS">
                    Opti-track<br/>TMS
                  </div>
                </div>
              </div>
              
              {participants.map((participant, index) => (
                <div 
                  key={participant.id} 
                  className={`hexagon-item hexagon-item-${index + 1}`}
                  aria-label={`Участник: ${participant.title}`}
                >
                  <div className="hexagon-content">
                    <div className="participant-icon">
                      <div className={`icon-${participant.icon}`} aria-hidden="true"></div>
                    </div>
                    <h4 className="participant-title">{participant.title}</h4>
                    <p className="participant-description">{participant.description}</p>
                  </div>
                  <div className="hexagon-connection"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая часть - Блоки интеграций */}
          <div className="ecosystem-right">
            <h3 className="section-subtitle text-center">
              Бесшовная интеграция с ключевыми системами
            </h3>

            <div className="integrations-grid">
              {integrations.map((integration) => (
                <div 
                  key={integration.id} 
                  className="integration-card"
                  aria-label={`Интеграция: ${integration.title}`}
                >
                  <div className="integration-icon">
                    <div className={`icon-${integration.icon}`} aria-hidden="true"></div>
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