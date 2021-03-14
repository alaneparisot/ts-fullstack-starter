# mern-auth

Authentication with Node.js and React.

# How to Fork

- Delete .git folder
- $ git init
- Change git remote
- Update package.json
- Update README.md
- On MongoDB Atlas, create a new project
- In this new project, create a new user
- In this new project, create a database (main), and a collection (users)
- Create a .env file
- In .env file, fill AUTH_ACCESS_TOKEN_SECRET property
- In .env file, fill DATABASE_URI property, with user password, and database
- $ git checkout -b main
- $ git add .
- $ git commit -m "Initial commit"
- $ git push -u origin main

## Todo

- [ ] ESLint
- [ ] Authorization roles (admin, user)
- [ ] Unit tests
- [ ] End-to-end tests
- [ ] Commit hooks (linter, tests)
