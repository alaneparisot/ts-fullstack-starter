![TS Fullstack Starter](https://github.com/alaneparisot/ts-fullstack-starter/blob/main/cover.png?raw=true)

## ⭐ Motivation

Well, I don't you about you, but for me, when I have an idea, I don't want my time, energy, and motivation to be eaten by some boilerplate hassle or tedious configuration, which can very quickly become very tiresome 🥱

What I want, at least at first, is to move fast and take the shortest path to make my idea real and alive 🚀

Here comes **TS Fullstack Starter** 🎉

Now you have the base structure to start the development of your next fullstack web application at light speed ⚡

[**_Check out the demo!_**](https://ts-fullstack-starter.herokuapp.com) Note: You can log in by submitting `test` as username and password.

## 📅 Update (December 2021)

Software crafting is a never-ending challenge, with always more modern ways to do things, especially in the fast-paced JavaScript environment. In December 2021, considering what I’ve learned since the beginning of this project, there are things I would do differently:

- I would use [**Apollo GraphQL**](https://apollographql.com) combined with [TypeGraphQL](https://typegraphql.com/), or at least [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), for productivity reasons.
- I would use [**PostgreSQL**](https://www.postgresql.org) combined with [TypeORM](https://typeorm.io), for performance reasons.
- I would use [**Redis**](https://redis.io) to handle _session_-based authentication, for security reasons.
- And many other things, but I try not to be too hard with myself 😄

Anyway, for a starter project, good enough is good enough, and done is better than perfect ✅

## ✨ Features

- **Types _everywhere_** with [TypeScript](https://www.typescriptlang.org), on both backend ([Express](https://expressjs.com)) and frontend ([React 17](https://reactjs.org) and [Redux Toolkit](https://redux-toolkit.js.org))
- **Tests _everywhere_** with [Jest](https://jestjs.io), on both backend and frontend ([React Testing Library](https://testing-library.com/docs/react-testing-library/intro))
- **NoSQL database** with [MondoDB](https://www.mongodb.com)
- **Authentication** with [JSON Web Token](https://jwt.io)
- **Routing** with [React Router](https://reactrouter.com)
- **Form** with [React Hook Form](https://react-hook-form.com)
- **Internationalization** with [react-i18next](https://react.i18next.com)
- **Logging** with [Winston](https://github.com/winstonjs/winston)
- **Light/dark theme** with [Material-UI](https://mui.com)
- **Pre-commit hook** with [Husky](https://github.com/typicode/husky)

## 🏭 Architecture

### 🧱 Backend

```
src
├── __tests__
├── components
│   ├── auth
│   ├── logs
│   └── users
├── config
├── loaders
│   ├── api
│   ├── database
│   ├── errorHandler
│   ├── middlewares
│   ├── server
│   └── app.ts
├── types
├── utils
└── index.ts
```

### 🧱 Frontend

```
client
├── src
│   ├── __tests__
│   ├── app
│   │   ├── App.tsx
│   │   ├── store.ts
│   │   └── theme.ts
│   ├── components
│   │   ├── styled
│   │   │   └── StyledLink.tsx
│   │   ├── ErrorFallback.tsx
│   │   ├── Page.tsx
│   │   ├── PageFallback.tsx
│   │   ├── ProcessButton.tsx
│   │   ├── Spinner.tsx
│   │   └── TopBar.tsx
│   ├── features
│   │   ├── auth
│   │   ├── home
│   │   └── user
│   ├── types
│   └── utils
│       └── test-utils.tsx
├── i18n.ts
└── index.tsx
```

## 🏃 Getting Started

### 🔧 How to Fork

- Import code directly on GitHub.
- Delete .git folder.
- Delete .git folder in client folder.
- `$ git init`
- Change git remote.
- Update `package.json`.
- Update `README.md`.
- On MongoDB Atlas, create a new project.
- In this new project, create a new user.
- In this new project, create a database (`main`), and a collection (`users`).
- Create a `.env` file.
- In `.env` file, fill `AUTH_ACCESS_TOKEN_SECRET` property.
- In `.env` file, fill `DATABASE_URI` property, with user password, and database.
- `$ git checkout -b main`
- `$ git add .`
- `$ git commit -m "Initial commit"`
- `$ git push -u origin main`

### ⚠️ Warnings

#### client > package.json

- Add `INLINE_RUNTIME_CHUNK=false` before script `react-scripts build`.
- Write `set INLINE_RUNTIME_CHUNK=false&&react-scripts build` for Windows.
- Set `proxy` value (port should match default value in `src > config > index.ts`).

#### src > tests

- Global environment variables are defined in `src > utils > test-utils.ts`.
- You may need to add `jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000` to be able to download MongoDB binaries.

#### src > config > index.ts

- Server port should be read from the variable name `PORT` in `process.env.PORT`.
- Server port default value should match port value in `client > package.json > proxy`.

#### src > loaders > errorHandlers.ts

- Avoid `JSON.stringify()` error.
- Keep `_next` in the method catching Express middleware errors.

#### package.json

- Avoid naming a script `install`.

## 📄 License

This project is [MIT licensed](https://github.com/alaneparisot/mern-ts-starter/blob/main/LICENSE).
