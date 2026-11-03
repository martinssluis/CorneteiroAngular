# Corneteiro

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.7.

## Como rodar o frontend (individualmente)

**Pré-requisitos:** Node.js 22+ e npm.

```bash
cd CorneteiroAngular/corneteiro
npm install   # apenas na primeira vez (ou quando o package.json mudar)
npm start     # equivale a `ng serve`
```

O frontend abre em `http://localhost:4200` com hot reload.

O frontend consome o backend em `http://localhost:1895` (definido em `src/app/services/api.service.ts`).
Se o backend estiver desligado, as chamadas HTTP falham, mas a aplicação continua abrindo.
Para subir o backend, veja o README em `CorneteiroJava`.

> Rode os comandos dentro de `CorneteiroAngular/corneteiro` (onde está o `package.json`),
> e não na pasta `CorneteiroAngular`.

### Páginas

| Rota | Conteúdo |
|------|----------|
| `/atletas` | Atletas do mercado (`GET /atletas`) |
| `/clubes` | Clubes com escudo (`GET /clubes`) |

Se o backend estiver indisponível ou a API do Cartola estiver bloqueada na sua rede,
as páginas exibem uma mensagem de erro em vez da lista.

### Testes

```bash
npm test
```

Se a porta 4200 estiver ocupada: `npm start -- --port 4300`
(nesse caso, o CORS do backend precisa liberar a nova origem).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
