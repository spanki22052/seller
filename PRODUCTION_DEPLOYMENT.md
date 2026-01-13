# 🚀 Развертывание в продакшн

Руководство по развертыванию Seller (Client, Client Admin, Server) на Ubuntu/Debian сервере.

## 🏗️ Архитектура

- **Client (Next.js)**: Сайт (порт 3000)
- **Client Admin (React)**: Админ-панель (порт 3001)
- **Server (NestJS)**: API + PostgreSQL + MinIO (порт 3002)

Все компоненты в Docker контейнерах.

## 📋 Требования

- Ubuntu/Debian сервер с SSH
- Root/sudo права
- Домен или статический IP
- Настроенный `.env.production`

## 🔧 Настройка

### 1. Файл окружения

```bash
cp .env.production.example .env.production
```

Отредактируйте `.env.production`, заменив `YOUR_SERVER_IP` на реальный IP/домен:

```env
DB_NAME=seller_db
DB_USER=seller_user
DB_PASSWORD=CHANGE_THIS_STRONG_PASSWORD
DB_PORT=5432

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_CONSOLE_PORT=9001
MINIO_USE_SSL=false
MINIO_PUBLIC_URL=http://YOUR_SERVER_IP:9000
MINIO_ACCESS_KEY=CHANGE_THIS_MINIO_ACCESS_KEY
MINIO_SECRET_KEY=CHANGE_THIS_MINIO_SECRET_KEY_MIN_8_CHARS
MINIO_BUCKET_PUBLIC=public
MINIO_BUCKET_PRIVATE=private
MINIO_BUCKET_MEDIA=media

JWT_SECRET=CHANGE_THIS_JWT_SECRET_AT_LEAST_32_CHARS
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://YOUR_SERVER_IP:3000,http://YOUR_SERVER_IP:3001,http://YOUR_SERVER_IP:3002

NODE_ENV=production
PORT=3002
```

## 🚀 Развертывание

### Вариант 1: Автоматизированное

```bash
# Настройте IP в deploy-production.sh
SERVER_IP="YOUR_SERVER_IP"

# Запустите
./deploy-production.sh
```

### Вариант 2: Ручное

```bash
# Подключитесь к серверу
ssh root@YOUR_SERVER_IP

# Установите Docker
apt update && apt upgrade -y
apt install -y docker.io docker-compose curl wget
systemctl enable docker && systemctl start docker

# Создайте директорию
mkdir -p /opt/seller && cd /opt/seller

# Скопируйте файлы с локальной машины
rsync -avz --exclude='.git' --exclude='node_modules' --exclude='.env*' ./ root@YOUR_SERVER_IP:/opt/seller/
scp .env.production root@YOUR_SERVER_IP:/opt/seller/.env.production

# Разверните
export $(cat .env.production | xargs)
cp .env.production .env
docker-compose -f docker-compose.production.yml up -d --build
```

## 🌐 Nginx + SSL

```bash
cd /opt/seller
chmod +x setup-nginx.sh
./setup-nginx.sh
```

Скрипт настроит Nginx с SSL сертификатами Let's Encrypt.

## 📊 URL после развертывания

- **Сайт**: https://your-domain.com
- **Админ**: https://your-domain.com/admin
- **API**: https://your-domain.com/api
- **MinIO**: https://your-domain.com/minio

## 🔍 Мониторинг

```bash
# Статус сервисов
docker-compose -f docker-compose.production.yml ps

# Логи
docker-compose -f docker-compose.production.yml logs -f

# Nginx логи
tail -f /var/log/nginx/error.log
systemctl status nginx

# Проверка здоровья
curl http://YOUR_SERVER_IP:3002/health
```

## 🛠️ Устранение неполадок

### Миграции БД (P3005)

```bash
docker exec -it seller_backend bash
for migration in $(ls prisma/migrations | grep -E '^[0-9]' | sort); do
  npx prisma migrate resolve --applied $migration
done
exit
docker-compose restart backend
```

### Перезапуск сервисов

```bash
cd /opt/seller
docker-compose -f docker-compose.production.yml restart
systemctl restart nginx
```

### Обновление

```bash
docker-compose -f docker-compose.production.yml down
git pull
docker-compose -f docker-compose.production.yml up -d --build
nginx -s reload
```

## 🔒 Безопасность

- Сильные пароли в `.env.production`
- JWT секреты минимум 32 символа
- Firewall: только порты 22, 80, 443
- Регулярные обновления Docker образов

## 📋 Чеклисты

### Перед развертыванием
- [ ] Настроен `.env.production` с реальным IP/доменом
- [ ] Минимум 4GB RAM, 20GB диск
- [ ] Доступны порты 80, 443, 3000-3002, 5432, 9000-9001
- [ ] SSH с ключами

### После развертывания
- [ ] Все сервисы запущены
- [ ] Nginx конфигурация валидна
- [ ] SSL работает
- [ ] URL доступны

### Резервное копирование

```bash
# БД
docker exec seller_postgres pg_dump -U seller_user seller_db > backup_$(date +%Y%m%d_%H%M%S).sql

# MinIO файлы
docker run --rm -v seller_minio_data:/data -v $(pwd):/backup alpine tar czf /backup/minio_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
```