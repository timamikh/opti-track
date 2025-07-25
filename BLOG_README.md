# Блог Opti-Track на базе KeystoneJS

В этом проекте реализован блог для Opti-Track с использованием KeystoneJS в качестве CMS и React для фронтенда.

## Структура проекта

- `keystone-cms/` - директория с KeystoneJS CMS для управления блогом
- `src/pages/Blog/` - компонент для отображения списка статей блога
- `src/pages/BlogPost/` - компонент для отображения отдельной статьи
- `src/pages/Login/` - компонент для авторизации SMM-специалистов
- `src/utils/keystoneApi.ts` - API-клиент для взаимодействия с KeystoneJS
- `src/types/blog.ts` - типы данных для блога

## Запуск блога

### 1. Запуск KeystoneJS CMS

Сначала необходимо запустить KeystoneJS CMS:

```bash
cd keystone-cms
npm install
npm run dev
```

или используйте скрипт из корневой директории:

```bash
npm run keystone
```

KeystoneJS будет доступен по адресу:
- Админ-панель: http://localhost:3000/admin
- GraphQL API: http://localhost:3000/api/graphql

При первом запуске вам будет предложено создать аккаунт администратора.

### 2. Запуск фронтенда

В отдельном терминале запустите фронтенд:

```bash
npm run dev
```

Фронтенд будет доступен по адресу http://localhost:5173

## Использование блога

### Для пользователей

- Просмотр списка статей: `/blog`
- Просмотр отдельной статьи: `/blog/:slug`

### Для SMM-специалистов

1. Войдите в систему через страницу `/login`
2. Используйте учетные данные, созданные в админ-панели KeystoneJS

### Для администраторов

1. Зайдите в админ-панель KeystoneJS по адресу http://localhost:3000/admin
2. Используйте учетные данные администратора
3. Управляйте контентом блога:
   - Создавайте и редактируйте статьи
   - Управляйте категориями и тегами
   - Создавайте аккаунты для SMM-специалистов

## Структура данных

- **User** - пользователи системы (авторы блога)
  - name: имя пользователя
  - email: email для входа
  - password: пароль
  - role: роль (admin, editor, smm)
  - posts: связь с постами

- **Post** - статьи блога
  - title: заголовок
  - slug: URL-дружественный идентификатор
  - status: статус (published, draft)
  - content: содержимое в формате документа
  - publishDate: дата публикации
  - author: автор
  - category: категория
  - tags: теги
  - image: изображение

- **Category** - категории статей
  - name: название
  - slug: URL-дружественный идентификатор
  - description: описание
  - posts: связь со статьями

- **Tag** - теги для статей
  - name: название
  - slug: URL-дружественный идентификатор
  - posts: связь со статьями

## Устранение неполадок

### Ошибка "Не удалось загрузить статьи блога"

Если вы видите эту ошибку, убедитесь, что:
1. KeystoneJS CMS запущен и доступен по адресу http://localhost:3000
2. В KeystoneJS созданы статьи
3. Нет ошибок в консоли браузера

### Ошибка "Failed to resolve import 'axios'"

Если вы видите эту ошибку, выполните:
```bash
npm install axios
``` 