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

</div>

## Showcase

![Demo](./.github/showcase.gif)

## Features ✨

```
├── apps/
│   ├── web/          # Next.js v15 (App Router)
│   └── native/       # Expo v53 React Native
├── packages/
│   └── backend/      # Convex: Database, Auth, Functions
├── tooling/          # Shared ESLint, Prettier, TypeScript Configuration
└── scripts/          # Utility Scripts
```

- **🚀 Modern Stack**: Latest versions of **React 19**, **Next.js 15**, **Expo v53**
- **⚡ Fast Development**: **Bun** for package management and **Turborepo** for caching
- **📱 Cross-Platform**: Build for mobile & native with the same backend!
- **🔄 Real-time Backend**: **Convex** for database, auth, and server functions
- **🎨 Beautiful UI**: **Tailwind CSS v4** with modern styling
- **🛠️ Developer Experience**: Shared tooling, TypeScript, ESLint, Prettier
- **🤖 AI-Ready**: AGENTS.md files for AI workflows (Cursor, Opencode, etc.)
- **🔧 CI/CD Ready**: GitHub Actions with Turborepo integration

## Why This Template? 🤔

Built because the standard Convex template was outdated. This includes:

- **Latest packages** and modern configurations
- **Organized exports** (no whole module exports)
- **Shared tooling** across all apps
- **AI workflow ready** with AGENTS.md files
- **Production-ready** CI/CD setup

## Quick Start 🚀

#### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (latest LTS)

#### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/turbo-expo-next-convex-bun.git
cd turbo-expo-next-convex-bun

# Install dependencies
bun install
```

#### 2. Setup Your Namespace

Replace the default `@acme` namespace with your own:

```bash
bun scripts/replace.ts
```

#### 3. Initialize Convex Backend

```bash
# Setup Convex (creates .env files and initializes database)
bun run --filter @acme/backend init
```

#### 4. Setup Environment Variables

Create `.env.local` files in each app:

```bash
# This is an example, each app will have different environments
# This must be done for each app!
cd apps/web
cp .env.example .env.local

# apps/native/.env.local
EXPO_PUBLIC_CONVEX_URL=your_convex_deployment_url # This will be auto-generated!
```

#### 5. Start Development

```bash
# Start all apps in development mode
bun dev

# Or start individual apps
bun dev:web      # Next.js web app
bun dev:native   # Expo mobile app
```

Visit:

- **Web App**: http://localhost:3000
- **Mobile App**: Use Expo Go app to scan QR code

## Deployment 🚀

- Connect Vercel to your GitHub repo for automatic web deployments
- Configure EAS with GitHub Actions for mobile app releases
- Set up Convex production deployment keys in GitHub Secrets

> A full writeup on this will be coming soon :)
