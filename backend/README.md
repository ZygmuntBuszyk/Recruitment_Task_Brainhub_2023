# Backend part of Recruitment Task
#### Node server (with configured Typescript) 
#### Mysql for database

## Startup
*Without docker
### `npm run start`

dev (watch)
### `npm run dev`

## Tests
### `npm run "dev:test`
    "dev:test": "jest --watch --coverage --verbose",

### Integration
Supertest
### `npm run dev:test:integration`
    "dev:test:integration": "yarn test -- --config=test/jest.config.ts --runInBand"

### Unit
Jest
### `npm run dev:test`
    "dev:test": "jest --watch --coverage --verbose",

### Database
Project is using custom configuration for local mysql that connects to port '127.0.0.1'.