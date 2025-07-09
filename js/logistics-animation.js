/**
 * Анимация логистической схемы для Optitrack TMS
 * 
 * Создает интерактивную восьмиугольную схему с узлами логистики, соединенными линиями,
 * по которым двигаются транспортные средства. Поддерживает всплывающие подсказки и
 * анимационные эффекты при наведении.
 */

// Глобальные настройки анимации
const ANIMATION_SETTINGS = {
    vehicleSpeedMin: 2,     // Минимальная продолжительность движения в секундах
    vehicleSpeedMax: 5,     // Максимальная продолжительность движения в секундах
    particleSpeed: 1.5,     // Скорость частиц
    nodePulsation: 1.5,     // Скорость пульсации узлов
    particleFrequency: 300, // Как часто создаются частицы (мс)
    vehicleFrequency: {     // Частота появления транспорта
        min: 2000,          // Минимальная пауза между появлениями (мс)
        max: 5000           // Максимальная пауза между появлениями (мс)
    }
};

// Инициализация анимации после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Настраиваем интерактивность для точек и маршрутов
    setupTooltips();
    
    // Точно настраиваем маршруты к узлам
    adjustRoutesToNodes();
    
    // Создаем транспортные средства и запускаем движение
    initVehicles();
    
    // Добавляем пульсацию для узлов
    animateNodes();
    
    // Создаем движение частиц по маршрутам
    createRouteParticles();
});

/**
 * Настраивает всплывающие подсказки для всех интерактивных элементов
 */
function setupTooltips() {
    // Создаем общий контейнер для подсказок
    const tooltipContainer = document.querySelector('.tooltip-container');
    const map = document.querySelector('#logistics-map');
    
    if (!tooltipContainer || !map) return;
    
    // Добавляем обработчики для узлов логистики
    const nodes = document.querySelectorAll('.logistics-node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            showTooltip(tooltipText, e, 'Узел логистики');
        });
        
        node.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        node.addEventListener('mousemove', function(e) {
            moveTooltip(e);
        });
    });
    
    // Добавляем обработчики для центрального восьмиугольника
    const octagon = document.querySelector('.central-octagon');
    if (octagon) {
        octagon.addEventListener('mouseenter', function(e) {
            showTooltip('Центр управления логистикой', e, 'Optitrack TMS', 'Интеллектуальная система управления транспортом и маршрутами');
        });
        
        octagon.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        octagon.addEventListener('mousemove', function(e) {
            moveTooltip(e);
        });
    }
    
    // Добавляем обработчики для маршрутов
    const routes = document.querySelectorAll('.logistics-route');
    routes.forEach(route => {
        route.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            // Добавим случайную информацию о маршруте
            const distance = Math.floor(Math.random() * 1000) + 100;
            const deliveryTime = Math.floor(Math.random() * 24) + 1;
            
            const content = `
                <p>Протяженность: ${distance} км</p>
                <p>Время доставки: ${deliveryTime} ч</p>
            `;
            
            showTooltip(tooltipText, e, 'Логистический маршрут', content);
            
            // Анимируем сегменты маршрута
            const segments = this.querySelectorAll('.route-segment');
            segments.forEach(segment => {
                segment.classList.add('neon-effect');
            });
        });
        
        route.addEventListener('mouseleave', function() {
            hideTooltip();
            
            // Убираем анимацию
            const segments = this.querySelectorAll('.route-segment');
            segments.forEach(segment => {
                segment.classList.remove('neon-effect');
            });
        });
        
        route.addEventListener('mousemove', function(e) {
            moveTooltip(e);
        });
    });
    
    // Добавляем обработчики для транспорта
    const vehicles = document.querySelectorAll('.logistics-vehicle');
    vehicles.forEach(vehicle => {
        vehicle.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            // Добавим случайные данные о перевозке
            const cargo = getRandomCargo();
            const status = getRandomStatus();
            const eta = getRandomETA();
            
            const content = `
                <p>Статус: ${status}</p>
                <p>Груз: ${cargo}</p>
                <p>Прибытие: ${eta}</p>
            `;
            
            showTooltip(tooltipText, e, 'Транспорт', content);
        });
        
        vehicle.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        vehicle.addEventListener('mousemove', function(e) {
            moveTooltip(e);
        });
    });
    
    /**
     * Отображает всплывающую подсказку
     */
    function showTooltip(title, event, header, content = '') {
        const mapRect = map.getBoundingClientRect();
        
        // Вычисляем позицию для подсказки относительно карты
        let mouseX = event.clientX - mapRect.left;
        let mouseY = event.clientY - mapRect.top;
        
        tooltipContainer.innerHTML = `
            <div class="tooltip-header">${header}</div>
            <div class="tooltip-title">${title}</div>
            <div class="tooltip-content">${content}</div>
        `;
        
        // Проверяем размеры подсказки и корректируем положение,
        // чтобы она не выходила за границы карты
        tooltipContainer.style.left = `${mouseX + 15}px`;
        tooltipContainer.style.top = `${mouseY + 15}px`;
        tooltipContainer.classList.add('active');
        
        // Корректируем положение, если подсказка выходит за правую границу
        const tooltipRect = tooltipContainer.getBoundingClientRect();
        if (tooltipRect.right > mapRect.right) {
            const overflow = tooltipRect.right - mapRect.right + 10;
            mouseX -= overflow;
            tooltipContainer.style.left = `${mouseX}px`;
        }
        
        // Корректируем положение, если подсказка выходит за нижнюю границу
        if (tooltipRect.bottom > mapRect.bottom) {
            const overflow = tooltipRect.bottom - mapRect.bottom + 10;
            mouseY -= overflow;
            tooltipContainer.style.top = `${mouseY}px`;
        }
    }
    
    /**
     * Скрывает всплывающую подсказку
     */
    function hideTooltip() {
        tooltipContainer.classList.remove('active');
    }
    
    /**
     * Перемещает всплывающую подсказку за курсором
     */
    function moveTooltip(event) {
        if (!tooltipContainer.classList.contains('active')) return;
        
        const mapRect = map.getBoundingClientRect();
        
        let mouseX = event.clientX - mapRect.left;
        let mouseY = event.clientY - mapRect.top;
        
        // Установим базовое положение
        tooltipContainer.style.left = `${mouseX + 15}px`;
        tooltipContainer.style.top = `${mouseY + 15}px`;
        
        // Проверяем границы и корректируем при необходимости
        const tooltipRect = tooltipContainer.getBoundingClientRect();
        
        if (tooltipRect.right > mapRect.right) {
            const overflow = tooltipRect.right - mapRect.right + 10;
            mouseX -= overflow;
            tooltipContainer.style.left = `${mouseX}px`;
        }
        
        if (tooltipRect.bottom > mapRect.bottom) {
            const overflow = tooltipRect.bottom - mapRect.bottom + 10;
            mouseY -= overflow;
            tooltipContainer.style.top = `${mouseY}px`;
        }
    }
}

/**
 * Инициализирует и запускает анимацию транспортных средств
 */
function initVehicles() {
    const map = document.querySelector('#logistics-map');
    if (!map) return;
    
    const routes = document.querySelectorAll('.logistics-route');
    const vehicles = document.querySelectorAll('.logistics-vehicle');
    
    // Скрываем все транспортные средства изначально
    vehicles.forEach(vehicle => {
        gsap.set(vehicle, { autoAlpha: 0 });
    });
    
    // Через случайные промежутки времени запускаем движение транспорта
    setTimeout(startRandomVehicles, 1000);
    
    /**
     * Запускает случайные транспортные средства
     */
    function startRandomVehicles() {
        // Выбираем случайное количество транспортных средств для одновременного движения
        const activeVehiclesCount = Math.floor(Math.random() * 3) + 1; // от 1 до 3
        
        // Запускаем выбранное количество транспортных средств
        for (let i = 0; i < activeVehiclesCount; i++) {
            const randomVehicleIndex = Math.floor(Math.random() * vehicles.length);
            const randomRouteIndex = Math.floor(Math.random() * routes.length);
            
            const vehicle = vehicles[randomVehicleIndex];
            const route = routes[randomRouteIndex];
            
            moveVehicleAlongRoute(vehicle, route);
        }
        
        // Планируем следующий запуск через случайный интервал
        const nextLaunchTime = Math.floor(
            Math.random() * 
            (ANIMATION_SETTINGS.vehicleFrequency.max - ANIMATION_SETTINGS.vehicleFrequency.min)
        ) + ANIMATION_SETTINGS.vehicleFrequency.min;
        
        setTimeout(startRandomVehicles, nextLaunchTime);
    }
    
    /**
     * Двигает транспортное средство по маршруту
     */
    function moveVehicleAlongRoute(vehicle, route) {
        // Получаем сегменты маршрута
        const segment = route.querySelector('.route-segment');
        if (!segment) return;
        
        const mapRect = map.getBoundingClientRect();
        
        // Центр восьмиугольника
        const centerX = mapRect.width / 2;
        const centerY = mapRect.height / 2;
        
        // Извлекаем угол поворота из transform:rotate CSS свойства
        const transformStyle = window.getComputedStyle(route).getPropertyValue('transform');
        const matrix = new DOMMatrix(transformStyle);
        const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
        
        // Преобразуем угол в радианы для расчетов
        const rad = angle * (Math.PI / 180);
        
        // Получаем длину линии
        const routeWidth = parseFloat(route.style.width || '0');
        const routeLength = routeWidth > 0 ? routeWidth : segment.offsetWidth;
        
        // Определяем, откуда транспорт начинает движение (от центра или от узла)
        const startFromCenter = Math.random() > 0.5;
        
        let startOffset, endOffsetActual;
        
        if (startFromCenter) {
            startOffset = 0.1 * routeLength; // Небольшой отступ от центра
            endOffsetActual = 0.88 * routeLength; // Не доходя до узла
        } else {
            startOffset = 0.88 * routeLength;
            endOffsetActual = 0.1 * routeLength;
        }
        
        const startX = centerX + startOffset * Math.cos(rad);
        const startY = centerY + startOffset * Math.sin(rad);
        const endX = centerX + endOffsetActual * Math.cos(rad);
        const endY = centerY + endOffsetActual * Math.sin(rad);
        
        // Рассчитываем скорость на основе расстояния
        const duration = calculateDuration(startX, startY, endX, endY);
        
        // Устанавливаем начальную позицию
        gsap.set(vehicle, {
            x: startX,
            y: startY,
            autoAlpha: 0,
            // Держим транспорт вертикально
            rotation: 0
        });
        
        // Сначала показываем появление транспорта
        gsap.to(vehicle, {
            autoAlpha: 1,
            duration: 0.5,
            onComplete: function() {
                // Затем запускаем анимацию движения
                gsap.to(vehicle, {
                    x: endX,
                    y: endY,
                    duration: duration,
                    ease: "none",
                    onComplete: function() {
                        // Скрываем транспорт после завершения движения
                        gsap.to(vehicle, {
                            autoAlpha: 0,
                            duration: 0.5
                        });
                    }
                });
            }
        });
    }
    
    /**
     * Рассчитывает длительность анимации на основе расстояния
     */
    function calculateDuration(startX, startY, endX, endY) {
        // Рассчитываем расстояние
        const distance = Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
        );

        // Базовая скорость (пикселей в секунду)
        const baseSpeed = 100;

        // Рассчитываем время на основе расстояния и скорости
        let duration = distance / baseSpeed;

        // Ограничиваем минимум и максимум
        duration = Math.max(
            ANIMATION_SETTINGS.vehicleSpeedMin,
            Math.min(ANIMATION_SETTINGS.vehicleSpeedMax, duration)
        );

        return duration;
    }
}

/**
 * Настраивает линии, чтобы они точно указывали на узлы логистики
 */
function adjustRoutesToNodes() {
    const map = document.querySelector('#logistics-map');
    if (!map) return;

    const centerX = map.offsetWidth / 2;
    const centerY = map.offsetHeight / 2;

    const nodes = document.querySelectorAll('.logistics-node');
    const routes = document.querySelectorAll('.logistics-route');

    // Для каждого маршрута вычисляем правильный угол к соответствующему узлу
    routes.forEach((route, index) => {
        if (index >= nodes.length) return;

        const node = nodes[index];
        const segment = route.querySelector('.route-segment');
        if (!node || !segment) return;

        const nodeRect = node.getBoundingClientRect();
        const mapRect = map.getBoundingClientRect();

        // Находим позицию узла относительно центра
        const nodeX = (nodeRect.left + nodeRect.width/2) - (mapRect.left + centerX);
        const nodeY = (nodeRect.top + nodeRect.height/2) - (mapRect.top + centerY);

        // Вычисляем угол в радианах, затем конвертируем в градусы
        let angle = Math.atan2(nodeY, nodeX) * (180 / Math.PI);

        // Вычисляем расстояние от центра до узла (используем теорему Пифагора)
        const distance = Math.sqrt(nodeX * nodeX + nodeY * nodeY);

        // Устанавливаем новые параметры для маршрута
        route.style.width = `${distance * 0.92}px`; // 92% расстояния для линии
        route.style.transform = `translateY(-50%) rotate(${angle}deg)`;

        // Обеспечиваем, чтобы сегмент имел правильную ширину
        segment.style.width = '100%';
    });
}

/**
 * Анимирует узлы логистики и центральный восьмиугольник
 */
function animateNodes() {
    const nodes = document.querySelectorAll('.logistics-node');
    const octagon = document.querySelector('.central-octagon');

    // Анимация для центрального восьмиугольника
    if (octagon) {
        gsap.to(octagon, {
            boxShadow: "0 0 25px rgba(42, 132, 211, 0.6)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Анимация для узлов
    nodes.forEach((node, index) => {
        // Создаем пульсирующую анимацию с разной задержкой для каждого узла
        gsap.to(node, {
            boxShadow: "0 0 15px rgba(42, 132, 211, 0.7)",
            scale: 1.1,
            duration: ANIMATION_SETTINGS.nodePulsation,
            repeat: -1,
            yoyo: true,
            delay: index * 0.2 // Разные задержки для естественности
        });
    });
}

/**
 * Периодически добавляет эффект движения частиц по маршрутам
 */
function createRouteParticles() {
    const routes = document.querySelectorAll('.logistics-route');
    const map = document.querySelector('#logistics-map');

    if (!map) return;

    // Центр карты (начало всех маршрутов)
    const centerX = map.offsetWidth / 2;
    const centerY = map.offsetHeight / 2;

    setInterval(() => {
        // Выбираем случайный маршрут
        const randomRouteIndex = Math.floor(Math.random() * routes.length);
        const route = routes[randomRouteIndex];

        const segment = route.querySelector('.route-segment');
        if (!segment) return;

        // Создаем частицу
        const particle = document.createElement('div');
        particle.className = 'route-particle';

        // Извлекаем угол поворота из transform:rotate CSS свойства
        const transformStyle = window.getComputedStyle(route).getPropertyValue('transform');
        const matrix = new DOMMatrix(transformStyle);
        const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

        // Преобразуем угол в радианы для расчетов
        const rad = angle * (Math.PI / 180);

        // Получаем длину линии
        const routeWidth = parseFloat(route.style.width || '0');
        const routeLength = routeWidth > 0 ? routeWidth : segment.offsetWidth;

        // 50/50 шанс движения в любую сторону (от центра или к центру)
        const fromCenter = Math.random() > 0.5;

        let startPos, endPos;

        if (fromCenter) {
            startPos = 0.1 * routeLength; // Небольшой отступ от центра
            endPos = 0.88 * routeLength; // Не доходя до узла
        } else {
            startPos = 0.88 * routeLength;
            endPos = 0.1 * routeLength;
        }

        const startX = centerX + startPos * Math.cos(rad);
        const startY = centerY + startPos * Math.sin(rad);
        const endX = centerX + endPos * Math.cos(rad);
        const endY = centerY + endPos * Math.sin(rad);

        // Устанавливаем начальную позицию
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        map.appendChild(particle);

        // Анимируем движение частицы
        gsap.to(particle, {
            left: `${endX}px`,
            top: `${endY}px`,
            duration: ANIMATION_SETTINGS.particleSpeed,
            ease: "power1.inOut",
            onComplete: () => {
                // Удаляем частицу после анимации
                particle.remove();
            }
        });
    }, ANIMATION_SETTINGS.particleFrequency); // Частота создания новых частиц
}

/**
 * Вспомогательные функции для генерации случайных данных
 */
function getRandomCargo() {
    const cargos = [
        'Электроника', 'Продукты питания', 'Строительные материалы',
        'Автозапчасти', 'Оборудование', 'Мебель', 'Бытовая техника'
    ];
    return cargos[Math.floor(Math.random() * cargos.length)];
}

function getRandomStatus() {
    const statuses = [
        'В пути', 'Загрузка', 'Разгрузка', 'Ожидание', 'Прибытие через 30 мин'
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomETA() {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
}