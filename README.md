# Seller - Платформа для продажи игровых товаров

Seller - это полнофункциональная платформа для продажи игровых товаров, включающая пользовательский сайт, админ-панель и мощный backend API.

## 🏗️ Архитектура проекта

Проект состоит из трех основных компонентов:

### 📁 `client/` - Пользовательский сайт (Next.js)

Основной сайт для покупателей с каталогом игр, товарами и оформлением заказов.

- **Next.js 14** с App Router
- **TypeScript** для типобезопасности
- **Styled Components** с объектным синтаксисом
- **Feature-Sliced Design (FSD)** архитектура
- **TanStack Query** для управления состоянием
- **i18next** для интернационализации

### 📁 `client_admin/` - Админ-панель (React + Ant Design)

Интерфейс администратора для управления контентом, заказами и настройками.

- **React 18** с Vite
- **Ant Design** компонентная библиотека
- **TypeScript** для типобезопасности
- **Feature-Sliced Design (FSD)** архитектура
- **TanStack Query** для API запросов
- **React Router** для навигации

### 📁 `server/` - Backend API (NestJS)

Мощный backend с REST API, базой данных и файловым хранилищем.

- **NestJS** фреймворк
- **Prisma ORM** для работы с базой данных
- **PostgreSQL** база данных
- **MinIO** объектное хранилище для файлов
- **JWT** аутентификация
- **Docker** контейнеризация

### 📁 `prisma/` - Схема базы данных

Централизованная схема базы данных и скрипты миграций.

- **Prisma Schema** определение моделей
- **Миграции** для версионирования БД
- **Seed скрипты** для тестовых данных

## 🚀 Быстрый запуск

### Требования

- Docker и Docker Compose
- Node.js 18+ (для локальной разработки)

### Запуск в разработке

1. **Клонируйте репозиторий:**

   ```bash
   git clone <repository-url>
   cd seller
   ```

2. **Запустите все сервисы:**

   ```bash
   # Из корневой директории
   docker-compose -f server/docker-compose.yml up -d
   ```

3. **Установите зависимости и запустите сервисы:**

   **Client:**

   ```bash
   cd client
   npm install
   npm run dev
   # Доступен на http://localhost:3000
   ```

   **Client Admin:**

   ```bash
   cd client_admin
   npm install
   npm run dev
   # Доступен на http://localhost:3001
   ```

   **Server:**

   ```bash
   cd server
   npm install
   npm run start:dev
   # API доступен на http://localhost:3002
   ```

## 🔧 Production развертывание

Для production развертывания следуйте инструкциям в [`PRODUCTION_DEPLOYMENT.md`](./PRODUCTION_DEPLOYMENT.md)

Ключевые особенности:

- Полная контейнеризация с Docker
- Nginx reverse proxy с SSL
- Автоматическая настройка Let's Encrypt
- Мониторинг и логирование

## 📝 Структура проекта

```
seller/
├── client/          # Next.js пользовательский сайт
├── client_admin/    # React админ-панель
├── server/          # NestJS backend API
├── prisma/          # Схема и миграции БД
├── docker-compose.production.yml  # Production setup
├── setup-nginx.sh   # Nginx конфигурация
├── deploy-production.sh          # Скрипт развертывания
└── PRODUCTION_DEPLOYMENT.md      # Подробное руководство
```
