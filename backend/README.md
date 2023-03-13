# Backend part of Recruitment Task
#### Node server (with configured Typescript) 
#### Mysql for database 
#### In the future logs should be changed to some Logger eg. datadog/sentry

## Startup
*Without docker
### `npm run start`

dev (watch)
### `npm run dev`

## Tests - TBD 
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
