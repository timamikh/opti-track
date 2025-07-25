# План интеграции блога на Strapi с React-приложением

## 1. Установка Strapi (выполняется вручную)
- Создать аккаунт или войти в существующий
- Выбрать Quick Start для быстрой установки с SQLite
- Дождаться завершения установки

## 2. Настройка моделей данных в Strapi
- Создать модель Article (статья):
  - title: строка, обязательное
  - content: длинный текст, обязательное
  - summary: текст
  - slug: строка, уникальное, обязательное
  - publishedAt: дата и время
  - image: медиа
  - category: связь с моделью Category
  - author: связь с моделью User
  - tags: связь с моделью Tag

- Создать модель Category (категория):
  - name: строка, обязательное
  - description: текст
  - slug: строка, уникальное, обязательное

- Создать модель Tag (тег):
  - name: строка, обязательное
  - slug: строка, уникальное, обязательное

## 3. Настройка ролей и разрешений
- Создать роль "SMM Specialist"
- Настроить разрешения:
  - Чтение всех типов контента
  - Создание и редактирование статей
  - Загрузка медиа-файлов
  - Без доступа к настройкам системы

## 4. Интеграция с React-приложением
- Установить axios для работы с API
- Создать API-клиент для взаимодействия со Strapi
- Разработать компоненты для блога:
  - BlogList: список статей
  - BlogPost: отдельная статья
  - BlogCategory: статьи по категории
  - BlogSearch: поиск по блогу

## 5. Обновление маршрутизации
- Добавить новые маршруты в React Router:
  - /blog - список всех статей
  - /blog/:slug - отдельная статья
  - /blog/category/:slug - статьи по категории
  - /blog/tag/:slug - статьи по тегу
  - /blog/search - поиск по блогу

## 6. Создание компонентов для фронтенда
- BlogLayout: общий шаблон для страниц блога
- BlogList: компонент для отображения списка статей
- BlogPost: компонент для отображения полной статьи
- BlogSidebar: боковая панель с категориями и тегами
- BlogSearch: компонент для поиска по блогу

## 7. Стилизация компонентов
- Использовать существующие стили Tailwind CSS
- Создать дополнительные стили для блога
- Обеспечить адаптивный дизайн

## 8. Настройка авторизации
- Интегрировать авторизацию Strapi с фронтендом
- Создать компонент Login для SMM-специалистов
- Настроить защищенные маршруты для админки

## 9. Тестирование
- Проверить работу API
- Протестировать создание и редактирование статей
- Проверить авторизацию и разрешения 