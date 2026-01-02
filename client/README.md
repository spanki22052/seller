# Seller Client Application

A Next.js application built with Feature-Sliced Design (FSD) architecture, styled-components, Ant Design, and TypeScript.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Architecture**: Feature-Sliced Design (FSD)
- **Styling**: styled-components (Object Syntax)
- **UI Library**: Ant Design (with dark theme support)
- **State Management**: React Context API + TanStack Query
- **Internationalization**: i18next (English/Russian)
- **HTTP Client**: Axios
- **Language**: TypeScript (strict mode)

## Project Structure

```
src/
├── app/            # Global providers, styles, Next.js root layout logic
├── compositions/  # Page compositions (e.g., HomePage, ProductPage)
├── widgets/        # Big self-contained blocks (e.g., Header, Sidebar)
├── features/       # User interactions (e.g., AddToCart, LoginByPhone)
├── entities/       # Business entities (e.g., User, Product, Order)
│   └── [entity]/
│       ├── api/    # Tanstack Query hooks & Axios calls
│       ├── model/  # Types and business logic
│       └── ui/     # Base components for this entity
└── shared/         # Reusable helpers, UI kit (icons, atoms), API client
    ├── api/        # Base API client configuration
    ├── contexts/   # Global context providers (Theme, Auth, etc.)
    ├── assets/     # Icons and static assets
    └── lib/        # Utilities and configurations (i18n, etc.)
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Architecture Guidelines

### Component Structure

Every UI component follows this pattern:

```
ComponentName/
├── ui/
│   ├── ComponentName.tsx
│   ├── ComponentName.styles.ts  # Object syntax only
│   └── index.ts
├── hooks/
│   └── useComponentName.ts      # Business logic & state
├── model/
│   ├── types.ts
│   └── constants.ts
└── index.ts                     # Public API
```

### Styling Rules

- **NEVER use classNames** - use styled-components only
- Use **Object Syntax** for all styled components
- Import styled components like: `import * as Styled from './styled.ts'`
- Dark theme support via Ant Design ConfigProvider

### Translations

All text should use i18next translations. Add English and Russian translations in:
- `src/shared/lib/locales/en.json`
- `src/shared/lib/locales/ru.json`

### State Management

- **Global State**: React Context API (in `src/shared/contexts/`)
- **Server State**: TanStack Query (in `src/entities/[entity]/api/`)
- Split contexts into `StateContext` and `ActionsContext` to prevent unnecessary re-renders

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [styled-components](https://styled-components.com/)
- [Ant Design](https://ant.design/)
- [TanStack Query](https://tanstack.com/query)
