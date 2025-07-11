# KeystoneJS CMS для блога Opti-Track

Этот проект содержит CMS на базе KeystoneJS для управления блогом Opti-Track.

## Требования

- Node.js 16+ 
- npm или yarn

## Установка

1. Установите зависимости:

```bash
npm install
```

2. Запустите KeystoneJS в режиме разработки:

```bash
npm run dev
```

CMS будет доступна по адресу http://localhost:3000

Админ-панель: http://localhost:3000/admin

GraphQL API: http://localhost:3000/api/graphql

## Структура данных

CMS содержит следующие модели данных:

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

## Интеграция с React-приложением

Для взаимодействия с CMS из React-приложения используется GraphQL API. Клиент для API находится в файле `src/utils/keystoneApi.ts` основного приложения.

## Запуск в продакшн

1. Соберите проект:

```bash
npm run build
```

2. Запустите сервер:

```bash
npm run start
``` 