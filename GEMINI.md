# JojoAddison Development Workspace

## Project Overview
This project is a JHipster-generated Angular application with a Spring Boot backend, currently undergoing modernization to use **Java 25**, **Spring Boot 4.1.0**, **Angular Material 3**, and **Tailwind CSS**.

## Architectural Standards
- **Frontend**: Modernized to use Tailwind CSS utility classes and Angular Material 3 components, replacing legacy Bootstrap classes.
- **Backend**: Currently transitioning to Spring Boot 4.x and Java 25.
- **Dependency Management**: Centralized Angular Material imports in `MaterialModule` (exported via `SharedModule`) to ensure application-wide availability.

## Development Workflows
- **Component Migration**: Migrate components incrementally, replacing Bootstrap grid/UI components with Tailwind/Material equivalents.
- **Verification**: Always run `npm run lint` and `npm run webapp:build:dev` after UI migrations to ensure structural and functional integrity.
- **Java Upgrades**: Adhere strictly to the Spring Boot 4.x/Jakarta EE 11 migration path.

## Operational Rules
- **Security**: Never commit secrets or environment-specific configuration files.
- **Source Control**: Only stage and commit files as explicitly directed by the user. Always use a clear, concise commit message.
- **Validation**: Every code change MUST be validated by running relevant build and test commands (Maven/npm) before declaring the task complete.
