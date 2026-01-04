.PHONY: help install dev build up down logs clean migrate generate seed

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Start development server (local, requires postgres/minio running)
	npm run start:dev

build: ## Build for production
	npm run build

up: ## Start all services with Docker Compose
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## View logs from all services
	docker-compose logs -f

clean: ## Clean Docker volumes and containers
	docker-compose down -v
	docker system prune -f

migrate: ## Run database migrations
	npm run prisma:migrate

generate: ## Generate Prisma Client
	npm run prisma:generate

seed: ## Seed database (if seed script exists)
	npm run prisma:seed

studio: ## Open Prisma Studio
	npm run prisma:studio

dc-up: up ## Alias for up

dc-down: down ## Alias for down

dc-logs: logs ## Alias for logs

