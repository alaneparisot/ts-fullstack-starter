# MERN Starter

# How to Fork

- Import code directly on GitHub
- Delete .git folder
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

## Todo

- [ ] ESLint
- [ ] Authorization roles (admin, user)
- [ ] Unit tests
- [ ] End-to-end tests (Cypress)
- [ ] Commit hooks (linter, tests)
- [ ] Handle error exception on client side
- [ ] Handle logs on client side
- [ ] Add analytics
- [ ] Add Storybook
- [ ] Move to PostgreSQL (+Type ORM)
- [ ] Use Redis
- [ ] Move to GraphQL
- [ ] Run things on CI (test before deploy)
