<div align="center">

# Turbo / Expo / Next / Convex / Bun

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Convex](https://img.shields.io/badge/Convex-FF6B6B?style=for-the-badge&logo=convex&logoColor=white)](https://convex.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

#### A modern template featuring organic GMO-free tech that you can depend on.

</div>

## Showcase

![Demo](https://i.imgur.com/WZDJSpF.gif)

- **Bun:** Package manager & runtime
- **Turborepo:** Monorepo management & task caching
- **React 19:** Latest React with concurrent features
- **Next.js 15:** Sample web app w/ reusable backend
- **Tailwind CSS v4:** Modern CSS-first configuration
- **React Native w/ Expo v53:** Mobile/native app with new architecture
- **Convex:** Backend, database, server functions

## But why..? 👀

This was created as the standard [template](https://github.com/get-convex/turbo-expo-nextjs-clerk-convex-monorepo) that Convex provides is a bit outdated.
This monorepo also includes the following:

- Shared tooling (ESLint, Prettier, Typescript)
- Package.json based workspaces
- Organized exports (don't export the whole module!)
- Shared scripts folder
- Updated packages (Latest ESLint, Prettier, Next, etc.)
- AGENTS.md files for agentic AI workflows (Cursor, Opencode, etc.)
- Github CI workflows that use Turborepo

## Getting Started

To setup convex backend please run::

```sh
bun run --filter @acme/backend init
```

Finally, make sure to run the following script for your own namespace:

```sh
bun scripts/replace.ts
```
