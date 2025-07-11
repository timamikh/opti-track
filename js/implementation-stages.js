// Implementation Stages Component

document.addEventListener('DOMContentLoaded', function() {
  // Data for implementation stages
  const stages = [
    {
      id: 'analysis',
      number: 1,
      title: 'Предварительный анализ и формирование КП',
      duration: '2-4 недели',
      tasks: [
        'Первичный анализ требований',
        'Встреча для демо и обсуждения',
        'Формирование плана работ и КП'
      ]
    },
    {
      id: 'requirements',
      number: 2,
      title: 'Детальная БА и формирование требований',
      duration: '2-4 месяца',
      tasks: [
        'Подготовка оборудования',
        'Развертывание и настройка решения',
        'Обучение',
        'Бизнес-аналитика',
        'Системный анализ',
        'Проектирование архитектуры'
      ]
    },
    {
      id: 'basic-version',
      number: 3,
      title: 'Запуск базовой версии',
      duration: '3-5 месяцев',
      tasks: [
        'Настройка интеграций',
        'Включение всех участников цепочки',
        'Запуск основных процессов диспетчеризации, маршрутизации и планирования',
        'Формирование ролевой модели',
        'Интеграции с ERP, WMS',
        'Организация прав доступа',
        'Создание профилей сотрудников и партнеров, обучение'
      ],
      highlight: true
    },
    {
      id: 'additional-modules',
      number: 4,
      title: 'Внедрение дополнительных модулей',
      duration: 'от 2 месяцев',
      tasks: [
        'Механизмы контрактов',
        'Модуль тендеров',
        'Механизм аукционов',
        'Полный расчет стоимости перевозки',
        'Алгоритмы оптимизации стоимости',
        'GPS отслеживание и мобильное приложение',
        'Модуль Inbound перевозок'
      ]
    },
    {
      id: 'improvement',
      number: 5,
      title: 'Анализ и непрерывное улучшение',
      duration: 'от 2 месяцев',
      tasks: [
        'Модуль тайм-слотирования',
        'Подключение поставщиков в систему',
        'Интеграция с государственными системами и ЭТРН',
        'Механизм трансграничного импорта',
        'Индивидуальные оптимизационные алгоритмы (на основе KPI)',
        'Цифровые помощники'
      ]
    }
  ];

  // Find the implementation stages section
  const implementationStagesSection = document.getElementById('implementation-stages');
  if (!implementationStagesSection) return;

  // Variables for tracking state
  let expandedStageId = null;
  let currentSlide = 0;
  let sliderElement = null;

  // Create the desktop version
  function createDesktopVersion() {
    const desktopContainer = document.createElement('div');
    desktopContainer.className = 'hidden lg:grid grid-cols-5 gap-4 mt-8';
    
    stages.forEach(stage => {
      const stageCard = createStageCard(stage);
      desktopContainer.appendChild(stageCard);
    });
    
    return desktopContainer;
  }

  // Create the mobile slider
  function createMobileSlider() {
    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'lg:hidden mt-8';
    
    // Slider container
    sliderElement = document.createElement('div');
    sliderElement.className = 'mobile-slider';
    
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'flex';
    
    stages.forEach(stage => {
      const slideWrapper = document.createElement('div');
      slideWrapper.className = 'slider-slide';
      
      const stageCard = createStageCard(stage);
      slideWrapper.appendChild(stageCard);
      slidesContainer.appendChild(slideWrapper);
    });
    
    sliderElement.appendChild(slidesContainer);
    mobileContainer.appendChild(sliderElement);
    
    // Pagination dots
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    stages.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `pagination-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
    });
    
    mobileContainer.appendChild(pagination);
    
    // Set up scroll event listener
    sliderElement.addEventListener('scroll', handleSliderScroll);
    
    return mobileContainer;
  }

  // Create a stage card
  function createStageCard(stage) {
    const isHighlighted = stage.highlight;
    const isExpanded = stage.id === expandedStageId;
    
    // Main card container
    const card = document.createElement('div');
    card.className = `stage-card ${isHighlighted ? 'highlight' : ''} ${isExpanded ? 'expanded' : ''}`;
    card.id = `stage-${stage.id}`;
    
    // Header section
    const header = document.createElement('div');
    header.className = `stage-header ${isHighlighted ? 'highlight' : ''}`;
    header.addEventListener('click', () => toggleExpand(stage.id));
    
    // Number and duration row
    const topRow = document.createElement('div');
    topRow.className = 'flex items-center justify-between mb-3';
    
    const numberCircle = document.createElement('div');
    numberCircle.className = `stage-number ${isHighlighted ? 'highlight' : ''}`;
    numberCircle.textContent = stage.number;
    
    const durationText = document.createElement('div');
    durationText.className = 'stage-duration';
    durationText.textContent = stage.duration;
    
    topRow.appendChild(numberCircle);
    topRow.appendChild(durationText);
    
    // Title
    const title = document.createElement('h3');
    title.className = 'stage-title';
    title.textContent = stage.title;
    
    // Spacer
    const spacer = document.createElement('div');
    spacer.className = 'flex-grow';
    
    // Toggle button
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'pt-2';
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.setAttribute('aria-label', isExpanded ? 'Скрыть детали' : 'Показать детали');
    
    const toggleText = document.createElement('span');
    toggleText.className = 'mr-1';
    toggleText.textContent = isExpanded ? 'Скрыть' : 'Подробнее';
    
    const toggleIcon = document.createElement('svg');
    toggleIcon.className = `toggle-icon ${isExpanded ? 'expanded' : ''}`;
    toggleIcon.setAttribute('fill', 'none');
    toggleIcon.setAttribute('stroke', 'currentColor');
    toggleIcon.setAttribute('viewBox', '0 0 24 24');
    toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
    
    toggleButton.appendChild(toggleText);
    toggleButton.appendChild(toggleIcon);
    toggleContainer.appendChild(toggleButton);
    
    // Assemble header
    header.appendChild(topRow);
    header.appendChild(title);
    header.appendChild(spacer);
    header.appendChild(toggleContainer);
    
    // Content section
    const content = document.createElement('div');
    content.className = `stage-content ${isExpanded ? 'expanded' : 'collapsed'}`;
    
    const divider = document.createElement('div');
    divider.className = 'divider';
    
    const taskList = document.createElement('ul');
    taskList.className = 'task-list';
    
    stage.tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item fade-in-slide-up';
      taskItem.style.animationDelay = `${index * 0.05}s`;
      
      const bullet = document.createElement('span');
      bullet.className = 'task-bullet';
      bullet.textContent = '•';
      
      const taskText = document.createElement('span');
      taskText.className = 'task-text';
      taskText.textContent = task;
      
      taskItem.appendChild(bullet);
      taskItem.appendChild(taskText);
      taskList.appendChild(taskItem);
    });
    
    content.appendChild(divider);
    content.appendChild(taskList);
    
    // Assemble card
    card.appendChild(header);
    card.appendChild(content);
    
    return card;
  }

  // Toggle expand/collapse of a stage
  function toggleExpand(stageId) {
    if (expandedStageId === stageId) {
      expandedStageId = null;
    } else {
      expandedStageId = stageId;
    }
    
    // Re-render the section
    renderImplementationStages();
  }

  // Go to a specific slide in the mobile slider
  function goToSlide(index) {
    if (!sliderElement) return;
    
    currentSlide = index;
    updatePaginationDots();
    
    const slideWidth = sliderElement.scrollWidth / stages.length;
    sliderElement.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  }

  // Handle slider scroll events
  function handleSliderScroll() {
    if (!sliderElement) return;
    
    const scrollPosition = sliderElement.scrollLeft;
    const slideWidth = sliderElement.scrollWidth / stages.length;
    const newIndex = Math.round(scrollPosition / slideWidth);
    
    if (newIndex !== currentSlide) {
      currentSlide = newIndex;
      updatePaginationDots();
    }
  }

  // Update the active state of pagination dots
  function updatePaginationDots() {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Render the implementation stages section
  function renderImplementationStages() {
    // Clear the section
    implementationStagesSection.innerHTML = '';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container-custom';
    
    // Add title
    const title = document.createElement('h2');
    title.className = 'text-3xl md:text-4xl text-white mb-12 text-center';
    title.textContent = 'Этапы внедрения Optitrack TMS';
    container.appendChild(title);
    
    // Add desktop version
    container.appendChild(createDesktopVersion());
    
    // Add mobile slider
    container.appendChild(createMobileSlider());
    
    // Add container to section
    implementationStagesSection.appendChild(container);
  }

  // Initial render
  renderImplementationStages();
});
