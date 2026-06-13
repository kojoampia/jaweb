# jojoaddison

Jojo Addison is a full-stack monolith for the public website and admin CMS.

This codebase was originally generated with JHipster 5, but it is actively modernized and now runs on current Spring Boot and Angular versions.

## Current Stack

- Backend: Spring Boot 3.3, Java 21, Maven Wrapper
- Frontend: Angular 19, TypeScript 5.5, custom webpack integration
- Database: MongoDB
- Security: Spring Security + JWT resource-server style authentication
- Supporting infrastructure: WebSocket/STOMP, Spring Actuator, Mongock, OpenTelemetry

## Prerequisites

- Java 21 (the backend build uses `java.version=21` from [pom.xml](pom.xml))
- Node.js 20.12.1 or newer (see `engines.node` in [package.json](package.json))
- npm (project uses npm scripts)
- Docker (optional, for local infrastructure and containerized workflows)

Install frontend dependencies:

```bash
npm install
```

## Local Development

Run backend and frontend in separate terminals:

```bash
./mvnw
```

```bash
npm start
```

Default local ports:

- Angular dev server: http://localhost:4200
- Spring Boot (`dev` profile): http://localhost:1980

The Angular dev server proxies API traffic using [webpack/proxy.conf.js](webpack/proxy.conf.js) to the backend on port 1980.

## Useful npm Scripts

- `npm start`: Start Angular dev server with HMR
- `npm run backend:start`: Start backend via Maven (skips npm install during backend boot)
- `npm run watch`: Start frontend and backend together
- `npm run lint`: Run ESLint on frontend TypeScript
- `npm test`: Run Angular/Jest tests
- `npm run webapp:build:prod`: Build production frontend assets
- `npm run java:jar:prod`: Build production JAR
- `npm run java:docker:prod`: Build production Docker image with Jib

List all scripts:

```bash
npm run
```

## Validation and Testing

Use the narrowest validation that matches your change.

Backend-focused validation:

```bash
./mvnw -Pdev clean verify --no-transfer-progress
```

Frontend-focused validation:

```bash
npm run lint
npm test
npm run webapp:build:prod
```

## Production Build

Build a production package:

```bash
./mvnw -Pprod clean package
```

Or use npm wrappers:

```bash
npm run java:jar:prod
```

Run the packaged application:

```bash
java -jar target/*.jar --spring.profiles.active=prod
```

## Docker

Start MongoDB for local development:

```bash
docker compose -f src/main/docker/mongodb.yml up --wait
```

Stop MongoDB:

```bash
docker compose -f src/main/docker/mongodb.yml down -v
```

Build a container image for the app:

```bash
npm run java:docker:prod
```

Bring up app-related services:

```bash
docker compose -f src/main/docker/app.yml up -d
```

## Key Project Paths

- Backend entry point: [src/main/java/io/jojoaddison/JojoaddisonApp.java](src/main/java/io/jojoaddison/JojoaddisonApp.java)
- Backend REST APIs: [src/main/java/io/jojoaddison/web/rest](src/main/java/io/jojoaddison/web/rest)
- Security configuration: [src/main/java/io/jojoaddison/security](src/main/java/io/jojoaddison/security)
- Frontend app: [src/main/webapp/app](src/main/webapp/app)
- Frontend routing: [src/main/webapp/app/app.routes.ts](src/main/webapp/app/app.routes.ts)
- Entity routing: [src/main/webapp/app/entities/entity.routes.ts](src/main/webapp/app/entities/entity.routes.ts)
- Environment config: [src/main/resources/config](src/main/resources/config)
- Docker configs: [src/main/docker](src/main/docker)

## Notes

- Service worker support is enabled in production Angular builds (`ngsw-config.json` and production build configuration in [angular.json](angular.json)).
- For API/management requests in local development, use Angular on port 4200 and let proxy forwarding handle backend routing.
