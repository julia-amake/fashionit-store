# Интернет-магазин

Pet проект 👩‍💻

---

## Демо

[https://fashionit.amake.ru](https://fashionit.amake.ru)

**Авторизация**

Можно зарегистрироваться или использовать тестовый аккаунт:

`login:` test123<br />
`password:` test123test123T

---

## Основной стек

- [TypeScript](https://www.typescriptlang.org) – строго типизированный язык программирования, расширяющий возможности JavaScript.
- [React](https://react.dev) – библиотека для создания внешних пользовательских интерфейсов.
- [Redux Toolkit, RTK Query](https://redux-toolkit.js.org) – библиотека для управления состоянием приложения, набор инструментов, облегчающих работу с ней и мощный инструмент для получения и кэширования данных.
- [Formik](https://formik.org) – библиотека, помогающая работать с формами. Упрощает получение данных из формы, валидацию данных, вывод сообщений об ошибках и многое другое.

---

## Установка

Убедитесь, что у вас установленны node.js и npm _(у меня node.js 21.6.0, npm 10.2.4)_

Скопируйте проект на компьютер:

```
git clone https://github.com/julia-amake/fashionit-store.git
```

Установите зависимости

```
npm install
```

## Начало работы

Для запуска проекта используйте команду:

```
npm run start
```

---

## Скрипты

- `npm run start` – запуск frontend-проекта на webpack dev server
- `npm run build` – сборка в prod режиме
- `npm run lint` – проверка ts файлов линтером
- `npm run prettier` – поиск и исправление ошибок форматирования
- `npm run test` – запуск unit тестов с jest
- `npm run storybook` – запуск Storybook
- `npm run build-storybook` – сборка storybook-билда
- `npm run prepare` – прекоммит хуки
- `npm run lint-staged` – запускает линтеры только для подготовленных к коммиту файлов
- `npm run type-check` – проверяет типы в рантайме без генерации выходных файлов

---

## Архитектура проекта

Проект написан в соответствии с методологией **Feature-Sliced Design (FSD)**

Документация – [https://feature-sliced.design](https://feature-sliced.design)

---

## Работа с переводами

Для работы с переводами используется библиотека **i18next**.
Файлы с переводами хранятся в `public/locales`.

Документация – [https://react.i18next.com/](https://react.i18next.com/)

---

## Линтинг

В проекте используется ESLint для проверки Typescript-кода

##### Запуск линтера

`npm run lint`

---

## CI pipeline и pre-commit хуки

Конфигурация Github Actions находится в `/.github/workflows`

В прекоммит хуках проверяем проект линтерами, конфиг в `/.husky`

---

### Работа с данными

Для хранения и работы с данными используется Redux Toolkit.

Для отправки запросов — [RTK Query](/src/shared/api/rtkApi.ts)

---

## Production-сборка проекта

```
npm run build
```
