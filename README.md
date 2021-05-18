# MERN TS Starter

## Demo

[mern-ts-starter](https://mern-ts-starter.herokuapp.com/)

## How to Fork

- Import code directly on GitHub
- Delete .git folder
- Delete .git folder in client folder
- `$ git init`
- Change git remote
- Update `package.json`
- Update `README.md`
- On MongoDB Atlas, create a new project
- In this new project, create a new user
- In this new project, create a database (`main`), and a collection (`users`)
- Create a `.env` file
- In `.env` file, fill `AUTH_ACCESS_TOKEN_SECRET` property
- In `.env` file, fill `DATABASE_URI` property, with user password, and database
- `$ git checkout -b main`
- `$ git add .`
- `$ git commit -m "Initial commit"`
- `$ git push -u origin main`

## Warnings

### client > package.json

- Add `INLINE_RUNTIME_CHUNK=false` before script `react-scripts build`
- Write `set INLINE_RUNTIME_CHUNK=false&&react-scripts build` for Windows
- Set `proxy` value (port should match default value in src > config > index.ts)

### src > config > index.ts

- Server port should be read from the variable name `PORT` in `process.env.PORT`
- Server port default value should match port value in client > package.json > proxy

### src > loaders > errorHandlers.ts

- Avoid `JSON.stringify()` error
- Keep `_next` in the method catching Express middleware errors

### package.json

- Avoid naming a script `install`

## Todo

- [ ] ESLint
- [ ] Authorization roles (admin, user)
- [x] Unit tests (in progress)
- [ ] End-to-end tests (Cypress)
- [ ] Commit hooks (linter)
- [x] Commit hooks (tests)
- [x] Handle error exception on client side
- [ ] Handle logs on client side (+ in <ErrorBoundary />)
- [ ] Add analytics
- [ ] Add Storybook
- [ ] Move to PostgreSQL (+Type ORM)
- [ ] Use Redis
- [ ] Move to GraphQL
- [ ] Run things on CI (test before deploy)
- [ ] Record a video tutorial
