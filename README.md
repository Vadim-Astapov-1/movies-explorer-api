# movies-explorer-api

Backend проекта movies-explorer на облачном сервере Yandex.Cloud.

## Описание

Сервер для обработки запросов клиента [movies-explorer](https://va-movies-explorer.ru), использующий базу данных NoSQL - MongoDB.
<br />
Настройка сервера в Yandex.Cloud проводилась на операционной системе **Ubuntu 20.04**.

## Технологии

- Node.js
- Express.js
- MongoDB

### Роуты

- /signup - post (Регистрация)
- /signin - post (Авторизация)
- /signout - get (Удалить куки)
***
- /users/me - get (Получить профиль)
- /users/me - patch (Обновить профиль)
***
- /movies - get (Получить сохраненные фильмы)
- /movies - post (Сохранить фильм)
- /movies/:movieId - delete (Удалить фильм из сохранённых)

### Зависимости

1. bcryptjs: ^2.4.3
2. body-parser: ^1.19.1
3. celebrate": "^15.0.0
4. cookie-parser": "^1.4.6
5. dotenv": "^16.0.0
6. express": "^4.17.2
7. express-rate-limit": "^6.3.0
8. express-winston": ^4.2.0
9. helmet": ^5.0.2
10. joi: ^17.6.0
11. jsonwebtoken": ^8.5.1
12. mongoose": ^6.2.3
13. validator": ^13.7.0
14. winston": ^3.5.1
15. eslint": ^8.5.0
16. eslint-config-airbnb-base": ^15.0.0
17. eslint-plugin-import": ^2.25.3
18. nodemon": ^2.0.15

## Примечания

- CORS

- Валидция всех routers описанна в отдельном middleware - validation.js.

- Использование переменных окружения .env.

- Хранение токена в Cookie.

- Код каждой ошибки описан в отдельном классе.

- Использование связей + статические функции **MongoDB**.

- Централизованный обработчик ошибок.

- Анализатор кода eslint.

**Адрес сервера:** https://api.va-movies-explorer.ru
