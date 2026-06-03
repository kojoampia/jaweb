# AGENTS.md

## Purpose

This repository is a **JHipster-based full-stack monolith** for the Jojo Addison site and admin CMS.
It serves a public content-heavy website and an authenticated admin area for managing content such as:

- home pages and slides
- about/blog/career/contact/imprint/information pages
- partners, portfolios, products, services, and staff

The codebase was originally generated with **JHipster 5**, but the active stack has been modernized. Do not assume old JHipster defaults are still accurate without checking the current code.

## Current stack

- **Backend:** Spring Boot 3.3, Java 25, Maven Wrapper
- **Frontend:** Angular 19, TypeScript 5.5, Angular CLI/custom webpack
- **Database:** MongoDB
- **Auth/Security:** Spring Security, JWT resource-server style setup
- **Other notable pieces:** JHipster framework, Mongock, Spring Actuator, WebSocket/STOMP, OTEL

## How to navigate the project

### Backend

- Main app entry: `src/main/java/io/jojoaddison/JojoaddisonApp.java`
- Base package: `src/main/java/io/jojoaddison`
- Common backend areas:
  - `config/` - Spring and infrastructure configuration
  - `domain/` - Mongo domain models
  - `repository/` - persistence layer
  - `service/` - service classes and business logic
  - `web/rest/` - REST controllers
  - `security/` - authentication and authorization

### Frontend

- Angular source root: `src/main/webapp`
- App code: `src/main/webapp/app`
- Primary routing entry: `src/main/webapp/app/app.routes.ts`
- Entity routes: `src/main/webapp/app/entities/entity.routes.ts`
- Shared UI utilities live under:
  - `app/shared/`
  - `app/widgets/`
  - `app/layouts/`
  - `app/core/`

### Generated entity metadata

- JHipster entity definitions live in `.jhipster/`
- If a task changes the data model, inspect the matching `.jhipster/*.json` file in addition to the runtime Java/Angular code
- Entity names in this repo include `About`, `Blog`, `Career`, `Contact`, `ContactMessage`, `Home`, `Information`, `Partner`, `Portfolio`, `Product`, `Service`, `Slide`, and `Staff`

## High-value entry points

- Home page behavior: `src/main/webapp/app/home/`
- REST API layer: `src/main/java/io/jojoaddison/web/rest/`
- Error handling: `src/main/java/io/jojoaddison/web/rest/errors/`
- Security wiring: `src/main/java/io/jojoaddison/security/` and `config/SecurityConfiguration.java`
- Environment config: `src/main/resources/config/`
- Docker/dev services: `src/main/docker/`

## Local development workflow

### Install

```bash
npm install
```

### Run locally

Use two terminals:

```bash
./mvnw
npm start
```

Notes:

- Angular dev server runs on **4200**
- Spring dev profile runs on **1980** (`application-dev.yml`)
- Angular uses the proxy config in `webpack/proxy.conf.js`

### Common validation commands

Backend:

```bash
./mvnw -Pdev clean verify --no-transfer-progress
```

Frontend:

```bash
npm run lint
npm test
npm run webapp:build:prod
```

Use the narrowest command that proves your change, but prefer the Maven dev verify command for backend-impacting work.

## Project-specific implementation guidance

### 1. Respect the split between content entities and page composition

`Home` aggregates slides, portfolios, services, partners, and information. Before changing homepage behavior, inspect both:

- backend model/controller/service code
- frontend `app/home/` rendering and any widget components it composes

### 2. Prefer existing entity patterns over inventing new ones

For CRUD-like work, follow the patterns already used under:

- `src/main/java/io/jojoaddison/web/rest/`
- `src/main/webapp/app/entities/`

This repo already has strong precedent for routing, forms, detail pages, and REST resource structure.

### 3. Be careful with Angular modernization boundaries

The frontend has undergone Angular 19 migration. Some widgets were converted to **standalone components** and strict typing was tightened.

When editing widget code under `app/widgets/`:

- preserve standalone component imports where present
- do not reintroduce lax typings or removed legacy decorators
- prefer explicit imports and initialized inputs

### 4. Treat README-era assumptions as potentially stale

The README still reflects older JHipster wording. Use `package.json`, `angular.json`, `pom.xml`, and `src/main/resources/config/` as the source of truth for current behavior.

### 5. Keep generated-style conventions consistent

This repo still follows JHipster-style naming and layout in many places. Match the existing conventions for:

- REST resource naming
- Angular entity folder structure
- translation/page-title usage
- Spring config placement

## Safe ways to improve the project

Good improvements usually:

- reduce duplication between entity/resource/service layers
- tighten type safety in Angular without changing UX
- modernize Angular code toward existing standalone/strict patterns
- remove outdated dependencies or warnings without changing behavior
- improve validation, error responses, or observability in established patterns

Be cautious with:

- broad JHipster regenerations
- schema changes that skip `.jhipster` metadata
- ad hoc frontend architecture changes that bypass entity/module conventions
- dependency upgrades that break Angular 19 compatibility

## When changing data or APIs

Check all relevant surfaces:

1. domain model
2. repository/service/resource
3. frontend model/service/routes/components
4. translations or UI labels if user-facing text changes
5. tests around the affected layer

## When adding UI

- First look for an existing widget or entity page you can reuse
- Prefer existing styling and layout primitives over introducing new UI patterns
- Keep routing changes aligned with `app.routes.ts` and `entities/entity.routes.ts`

## When finishing work

At minimum, run the validation that matches the changed area. Typical choices:

- backend-only: `./mvnw -Pdev clean verify --no-transfer-progress`
- frontend-only: `npm run lint && npm test`
- cross-stack or risky changes: both backend and frontend validation

If a dependency or config change affects packaging, also run the relevant build command rather than stopping at compilation.
