# Turbo / Expo / Next / Convex / Bun

#### A modern template featuring organic GMO-free tech that you can depend on.

- **Bun:** Package manager & runtime
- **Turborepo:** Monorepo management & task caching
- **React 19:** Latest React with concurrent features
- **Next.js 15:** Sample web app w/ reusable backend
- **Tailwind CSS v4:** Modern CSS-first configuration
- **React Native w/ Expo:** Mobile/native app with New Architecture
- **Convex:** Backend, database, server functions

## But why..? 👀

This was created as the standard template that Convex provides is a bit outdated.
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
