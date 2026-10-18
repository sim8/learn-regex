# Learn Regex

An interactive regex course built with Next.js, React, Redux Toolkit, and styled-components.

## Development

Use Node.js 24 LTS (also specified in `.nvmrc`):

```sh
nvm use
npm ci
npm run dev
```

The development server listens on port 3000. No application secrets or backend services are required.

Next.js downloads Ubuntu Mono through `next/font/google` at compile time and serves the resulting files locally. Allow HTTPS access to `fonts.googleapis.com` and `fonts.gstatic.com` in restricted environments. Keep TLS verification enabled.

## Checks

```sh
npm run lint
npm run type-check
npm test -- --runInBand
npm run build
```

To run the production build:

```sh
npm run start
```

Tests use Next.js's Jest integration and Testing Library. ESLint runs separately because Next.js 16 no longer runs linting during builds. ESLint stays on version 9 for compatibility with the React lint plugin, and TypeScript stays on 6.0 for compatibility with typescript-eslint.
