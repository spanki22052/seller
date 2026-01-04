# Admin Panel

React admin dashboard built with Vite, TypeScript, Ant Design, and Feature-Sliced Design architecture.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Ant Design** - UI components
- **Styled Components** - Styling
- **TanStack Query** - Data fetching
- **React Hook Form + Zod** - Form validation
- **i18next** - Internationalization
- **Axios** - HTTP client

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure (FSD)

```
src/
├── app/              # App setup, routing, global providers
├── pages/            # Page components
├── widgets/          # Complex UI blocks
├── features/         # User interactions (LoginForm)
├── entities/         # Business entities (Auth)
└── shared/           # Shared utilities, API, contexts
```

## Environment

Make sure the backend server is running on `http://localhost:3000`. The Vite proxy is configured to forward `/api` requests to the backend.

## Authentication

The login form connects to `/api/auth/login` endpoint. On successful login, the JWT token is stored in `localStorage` as `admin_token`.

