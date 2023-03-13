# Backend part of Recruitment Task
#### Node server (with configured Typescript) 
#### Mysql for database 
#### In the future logs should be changed to some Logger eg. datadog.

## Startup
*Without docker
### `npm run start`

dev (watch)
### `npm run dev`

## Tests (Not done yet, A LOT to cover there will do them in free time. For now please check frontend's tests instead) 
### `npm run "dev:test`
    "dev:test": "jest --watch --coverage --verbose",

### Integration (Not done yet, A LOT to cover there will do them in free time) 
Supertest
### `npm run dev:test:integration`
    "dev:test:integration": "yarn test -- --config=test/jest.config.ts --runInBand"

### Unit
Jest
### `npm run dev:test`
    "dev:test": "jest --watch --coverage --verbose",
