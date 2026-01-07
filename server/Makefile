.PHONY: help install dev build up down logs clean migrate generate seed dev-up prod-up prod-down deploy-prod env-dev env-prod

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@echo 'Environment setup:'
	@echo '  env-dev          Setup development environment (.env.development)'
	@echo '  env-prod         Setup production environment (.env.production)'
	@echo ''
	@echo 'Development:'
	@echo '  dev-up           Start development environment (local DB + MinIO)'
	@echo '  dev              Start backend in development mode'
	@echo '  dev-down         Stop development environment'
	@echo ''
	@echo 'Production:'
	@echo '  prod-up          Start production environment (configure .env.production first)'
	@echo '  prod-down        Stop production environment'
	@echo '  deploy-prod      Deploy to production server (62.181.53.211)'
	@echo ''
	@echo 'Database:'
	@echo '  migrate          Run database migrations'
	@echo '  generate         Generate Prisma Client'
	@echo '  seed             Seed database'
	@echo '  studio           Open Prisma Studio'
	@echo ''
	@echo 'Docker:'
	@echo '  up               Start all services'
	@echo '  down             Stop all services'
	@echo '  logs             View logs'
	@echo '  clean            Clean Docker volumes and containers'
	@echo ''
	@echo 'Aliases:'
	@echo '  dc-up            Alias for up'
	@echo '  dc-down          Alias for down'
	@echo '  dc-logs          Alias for logs'

# Environment setup
env-dev: ## Setup development environment
	@if [ ! -f .env.development ]; then \
		cp .env.development.example .env.development 2>/dev/null || echo "Create .env.development manually"; \
	fi
	@echo "Development environment ready. Edit .env.development if needed."

env-prod: ## Setup production environment
	@if [ ! -f .env.production ]; then \
		cp .env.production.example .env.production 2>/dev/null || echo "Create .env.production manually"; \
	fi
	@echo "Production environment ready. Edit .env.production with your server credentials."

# Development commands
dev-up: env-dev ## Start development environment (local DB + MinIO)
	@echo "Starting development environment..."
	@export $$(grep -v '^#' .env.development | xargs) && docker-compose up -d
	@echo "Development environment started!"
	@echo "Backend: http://localhost:3002"
	@echo "MinIO Console: http://localhost:9001"

dev: ## Start backend in development mode (requires running DB/MinIO)
	@echo "Starting backend in development mode..."
	npm run start:dev

dev-down: ## Stop development environment
	docker-compose down

# Production commands
prod-up: env-prod ## Start production environment
	@echo "Starting production environment..."
	@export $$(cat ../.env.production | xargs) && docker-compose -f ../docker-compose.production.yml up -d
	@echo "Production environment started!"
	@echo "Services will be available at:"
	@echo "  Backend: http://localhost:3002"
	@echo "  Client: http://localhost:3000"
	@echo "  Admin: http://localhost:3001"
	@echo "  MinIO: http://localhost:9001"

prod-down: ## Stop production environment
	docker-compose -f ../docker-compose.production.yml down

deploy-prod: ## Deploy to production server (62.181.53.211)
	@echo "Deploying to production server 62.181.53.211..."
	@if [ ! -f ../.env.production ]; then \
		echo "Error: ../.env.production not found. Please create it from .env.production.example"; \
		exit 1; \
	fi
	../deploy-production.sh

# Legacy commands (for backward compatibility)
install: ## Install dependencies
	npm install

build: ## Build for production
	npm run build

up: ## Start all services with Docker Compose
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## View logs from all services
	docker-compose logs -f

clean: ## Clean Docker containers and networks (preserves data volumes)
	docker-compose down
	docker system prune -f

migrate: ## Run database migrations
	npm run prisma:migrate

generate: ## Generate Prisma Client
	npm run prisma:generate

seed: ## Seed database (if seed script exists)
	npm run prisma:seed

studio: ## Open Prisma Studio
	npm run prisma:studio

# Aliases
dc-up: up
dc-down: down
dc-logs: logs

