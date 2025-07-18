# Технические стандарты проекта OptiTrack

## 🛠️ Стек технологий

### Frontend
- **React 18.2.0** - основная библиотека для UI
- **TypeScript 5.2.2** - строгая типизация
- **Vite 5.0.0** - сборщик и dev-сервер
- **React Router DOM 6.22.1** - маршрутизация
- **Axios 1.10.0** - HTTP-клиент для API запросов

### Стили
- **Tailwind CSS 3.3.5** - utility-first CSS фреймворк
- **PostCSS 8.4.31** - обработка CSS
- **Autoprefixer 10.4.16** - автоматические вендорные префиксы

### Backend/CMS
- **Keystone.js 6.5.1** - headless CMS
- **GraphQL** - API для CMS
- **TypeScript** - для CMS конфигурации

### Сборка и развертывание
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация контейнеров
- **Nginx** - веб-сервер для продакшена
- **Terser 5.26.0** - минификация JavaScript

### Инструменты разработки
- **ESLint** - линтер кода
- **TypeScript ESLint** - правила для TypeScript
- **Vite Plugin React** - поддержка React в Vite

## 🎨 Дизайн-система

### Цветовая палитра
```css
--text-primary: #FFFFFF      /* Основной текст */
--text-highlight: #FFFF00    /* Выделенный текст */
--bg-primary: #0E111B        /* Основной фон */
--bg-secondary: #FFFFFF      /* Вторичный фон */
--accent: #2A84D3           /* Акцентный цвет */
--input-button: #181C28     /* Фон кнопок и инпутов */
```

### Типографика
- **Orbitron** - название продукта (`.product-name`)
- **Inter** - заголовки (`.font-heading`)
- **Montserrat** - основной текст (`.font-body`)
- **Roboto** - кнопки (`.font-button`)

### Брейкпоинты
```css
sm: 320px   /* Мобильные устройства */
md: 768px   /* Планшеты */
lg: 1024px  /* Десктопы */
xl: 1440px  /* Большие экраны */
```

### Компоненты
- `.container-custom` - контейнер с отступами
- `.section-title` - заголовки секций
- `.section-subtitle` - подзаголовки
- `.btn-primary` - основные кнопки
- `.btn-secondary` - вторичные кнопки

## 🔧 Настройки портов

### Разработка
- **Frontend (React)**: `8000`
- **Backend (Keystone CMS)**: `3000`

### Команды запуска
```bash
# Разработка
npm run dev                 # Frontend на порту 8000
npm run keystone           # CMS на порту 3000
npm run start:dev          # Docker Compose (оба сервиса)

# Продакшн
npm run start:prod         # Docker Compose Production
```

## 📁 Структура проекта

### Алиасы путей
```typescript
@/*: src/*
@components/*: src/components/*
@assets/*: src/assets/*
@styles/*: src/styles/*
@utils/*: src/utils/*
@hooks/*: src/hooks/*
@types/*: src/types/*
@config/*: src/config/*
```

### Ключевые файлы
- `src/App.tsx` - **ГЛАВНЫЙ КОМПОНЕНТ** для изменений на главной странице
- `src/index.css` - основные стили
- `src/styles/global.css` - глобальные Tailwind стили
- `vite.config.ts` - конфигурация сборки
- `tailwind.config.js` - настройки дизайн-системы

## 🚀 Правила разработки

### 1. Изменения на главной странице
- **ВСЕ изменения главной страницы** вносятся только через `src/App.tsx`
- Новые секции добавляются как компоненты в `src/components/`
- Порядок секций контролируется в `App.tsx`

### 2. Компоненты
- Каждый компонент в отдельной папке с `index.tsx`
- Локальные стили в `styles.css` внутри папки компонента
- Экспорт по умолчанию из `index.tsx`

### 3. Стили
- **Приоритет**: Tailwind CSS классы
- Кастомные стили только в `@layer components` или `@layer utilities`
- Использовать CSS переменные из `tailwind.config.js`

### 4. TypeScript
- Строгая типизация включена
- Интерфейсы в `src/types/`
- Типы для API в отдельных файлах

### 5. Импорты
- Использовать алиасы (`@components`, `@styles`, etc.)
- Группировать импорты: библиотеки → локальные модули → типы

## 🐳 Docker конфигурация

### Файлы
- `Dockerfile.dev` - разработка
- `Dockerfile` - продакшн
- `docker-compose.yml` - разработка
- `docker-compose.prod.yml` - продакшн

### Переменные окружения
```bash
NODE_ENV=development|production
SESSION_SECRET=dev-session-secret-for-keystone-cms
```

## 📦 Сборка

### Настройки Vite
- Минификация: **Terser**
- Sourcemaps: включены
- Чанки: vendor (React, React-DOM) отдельно
- Выходная папка: `dist/`

### Команды
```bash
npm run build    # Сборка для продакшна
npm run preview  # Предпросмотр сборки
npm run lint     # Проверка кода
```

---

⚠️ **ВАЖНО**: Всегда придерживайтесь этих стандартов при разработке. Изменения в стандарты вносятся только после обсуждения и обновления данного документа. 