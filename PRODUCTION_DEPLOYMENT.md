# 🚀 Руководство по развертыванию в production

Это руководство поможет вам развернуть приложение Seller (client, client_admin, server) на любом production сервере.

## 🏗️ Обзор архитектуры

Приложение состоит из трех основных компонентов:

- **Client (Next.js)**: Основной пользовательский сайт (порт 3000)
- **Client Admin (React)**: Админ-панель для управления контентом (порт 3001)
- **Server (NestJS)**: Backend API, база данных PostgreSQL и объектное хранилище MinIO (порт 3002)

Все компоненты контейнеризованы с использованием Docker и оркестрируются с помощью Docker Compose.

## 📋 Предварительные требования

- Сервер Ubuntu/Debian с SSH доступом
- Права root или sudo на сервере
- Доменное имя (рекомендуется) или статический IP адрес
- Настроенный файл `.env.production`
- SSL сертификат (рекомендуется Let's Encrypt)

## 🔧 Настройка окружения

### 1. Конфигурация сервера

Выберите сервер для развертывания и обновите следующие переменные:

```bash
# Замените YOUR_SERVER_IP на ваш реальный IP сервера или домен
SERVER_IP="YOUR_SERVER_IP"
DOMAIN_NAME="your-domain.com"  # Опционально, для SSL
```

### 2. Настройка файла окружения

1. **Скопируйте шаблон production окружения:**

   ```bash
   cp .env.production.example .env.production
   ```

2. **Отредактируйте `.env.production` с вашими production значениями:**

   **Важно: Обновите все ссылки на IP/домен чтобы они соответствовали вашему серверу:**

   ```env
   # База данных
   DB_NAME=seller_db
   DB_USER=seller_user
   DB_PASSWORD=CHANGE_THIS_STRONG_PASSWORD
   DB_PORT=5432

   # MinIO Object Storage
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

   # JWT & Security
   JWT_SECRET=CHANGE_THIS_JWT_SECRET_AT_LEAST_32_CHARS
   JWT_EXPIRES_IN=24h

   # CORS Origins (обновите с вашим доменом/IP)
   CORS_ORIGIN=http://YOUR_SERVER_IP:3000,http://YOUR_SERVER_IP:3001,http://YOUR_SERVER_IP:3002

   # Сервер
   NODE_ENV=production
   PORT=3002
   ```

   **Замените `YOUR_SERVER_IP` на ваш реальный IP сервера или доменное имя.**

## 🚀 Развертывание

### Фаза 1: Развертывание приложения

#### Вариант 1: Автоматизированное развертывание (Рекомендуется)

1. **Настройте скрипт развертывания:**

   Отредактируйте `deploy-production.sh` и обновите IP сервера:

   ```bash
   SERVER_IP="YOUR_SERVER_IP"  # Замените на ваш IP сервера
   ```

2. **Запустите развертывание:**

   ```bash
   # Убедитесь, что .env.production настроен
   ./deploy-production.sh
   ```

#### Вариант 2: Ручное развертывание

1. **Подключитесь к серверу:**

   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Настройте сервер:**

   ```bash
   # Обновите систему
   apt update && apt upgrade -y

   # Установите Docker и Docker Compose
   apt install -y docker.io docker-compose curl wget
   systemctl enable docker && systemctl start docker

   # Создайте директорию проекта
   mkdir -p /opt/seller && cd /opt/seller
   ```

3. **Скопируйте файлы на сервер:**

   ```bash
   # С вашей локальной машины
   rsync -avz --exclude='.git' --exclude='node_modules' --exclude='.env*' ./ root@YOUR_SERVER_IP:/opt/seller/
   scp .env.production root@YOUR_SERVER_IP:/opt/seller/.env.production
   ```

4. **Разверните приложение:**

   ```bash
   cd /opt/seller

   # Загрузите окружение
   export $(cat .env.production | xargs)
   cp .env.production .env

   # Разверните все сервисы
   docker-compose -f docker-compose.production.yml up -d --build
   ```

### Фаза 2: Настройка Nginx (Reverse Proxy + SSL)

После развертывания приложения настройте Nginx для production:

1. **Запустите скрипт настройки Nginx:**

   ```bash
   # На вашем сервере
   cd /opt/seller
   chmod +x setup-nginx.sh
   ./setup-nginx.sh
   ```

   Этот скрипт выполнит:

   - Установку и настройку Nginx
   - Настройку SSL сертификатов (Let's Encrypt)
   - Конфигурацию reverse proxy для всех сервисов
   - Настройку правильных security headers

2. **Обновите DNS (опционально, но рекомендуется):**

   Направьте ваш домен на `YOUR_SERVER_IP` и обновите конфигурацию Nginx соответствующим образом.

## 🌐 URL сервисов

### Прямой доступ (Разработка/Тестирование)

После успешного развертывания ваши сервисы доступны по адресам:

- **Backend API:** http://YOUR_SERVER_IP:3002
- **Проверка здоровья Backend:** http://YOUR_SERVER_IP:3002/health
- **Основной клиент (Next.js):** http://YOUR_SERVER_IP:3000
- **Админ клиент (React):** http://YOUR_SERVER_IP:3001
- **Консоль MinIO:** http://YOUR_SERVER_IP:9001

### Production доступ (через Nginx)

После настройки Nginx используйте эти production URL:

- **Основной сайт:** https://your-domain.com (или http://YOUR_SERVER_IP)
- **Админ-панель:** https://your-domain.com/admin
- **API:** https://your-domain.com/api
- **Консоль MinIO:** https://your-domain.com/minio

### Детали конфигурации Nginx

Настройка Nginx создает:

- **Порт 80/443**: Основная точка входа с SSL терминацией
- **Reverse proxy**: Маршрутизация запросов к соответствующим контейнерам
- **SSL сертификаты**: Автоматические сертификаты Let's Encrypt (если домен указан)
- **Security headers**: HSTS, CSP и другие меры безопасности

## 🔍 Мониторинг и логи

### Сервисы приложения

```bash
# Подключитесь к серверу
ssh root@YOUR_SERVER_IP
cd /opt/seller

# Проверьте статус сервисов
docker-compose -f docker-compose.production.yml ps

# Просмотр логов
docker-compose -f docker-compose.production.yml logs -f
docker-compose -f docker-compose.production.yml logs -f backend
docker-compose -f docker-compose.production.yml logs -f client
docker-compose -f docker-compose.production.yml logs -f client_admin
```

### Логи Nginx

```bash
# Логи доступа и ошибок Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Проверьте статус Nginx
systemctl status nginx
```

### Статус SSL сертификатов

```bash
# Проверьте истечение сертификатов
certbot certificates

# Обновите сертификаты (если используете Let's Encrypt)
certbot renew --dry-run
```

### Системный мониторинг

```bash
# Проверьте системные ресурсы
htop
df -h
docker system df

# Проверьте открытые порты
netstat -tulpn | grep -E ':(80|443|3000|3001|3002|9000|9001)'
```

### Перезапуск сервисов

```bash
# Перезапустите все сервисы
cd /opt/seller
docker-compose -f docker-compose.production.yml restart

# Перезапустите Nginx
systemctl restart nginx
```

### Обновление развертывания

```bash
# Остановите сервисы
docker-compose -f docker-compose.production.yml down

# Получите последние изменения (если используете git)
git pull

# Пересоберите и запустите
docker-compose -f docker-compose.production.yml up -d --build

# Перезагрузите конфигурацию Nginx
nginx -t && nginx -s reload
```

## 🛠️ Устранение неполадок

### Распространенные проблемы:

1. **Конфликты портов:**

   - Проверьте доступность портов 80, 443 (Nginx), 3000-3002, 5432, 9000-9001
   - Используйте `netstat -tulpn | grep -E ':(80|443|3000|3001|3002|9000|9001)'` для проверки
   - Остановите конфликтующие сервисы: `systemctl stop apache2` (если Apache запущен)

2. **Проблемы с Nginx:**

   - Протестируйте конфигурацию: `nginx -t`
   - Проверьте логи: `tail -f /var/log/nginx/error.log`
   - Перезагрузите конфиг: `nginx -s reload`
   - Перезапустите Nginx: `systemctl restart nginx`

3. **Проблемы с миграциями базы данных (P3005: Schema not empty):**

   - Это происходит при развертывании в существующей базе данных со схемой
   - **Решение:** Отметьте все миграции как примененные:

     ```bash
     # Подключитесь к запущенному контейнеру backend
     docker exec -it seller_backend bash

     # Отметьте все миграции как примененные
     for migration in $(ls prisma/migrations | grep -E '^[0-9]' | sort); do
       npx prisma migrate resolve --applied $migration
     done

     # Выйдите из контейнера и перезапустите
     exit
     docker-compose restart backend
     ```

4. **Проблемы с подключением к базе данных:**

   - Убедитесь, что PostgreSQL запущен: `docker-compose -f docker-compose.production.yml logs postgres`
   - Проверьте учетные данные базы данных в `.env.production`

5. **Проблемы с MinIO:**

   - Проверьте логи MinIO: `docker-compose -f docker-compose.production.yml logs minio`
   - Проверьте учетные данные MinIO

6. **Сбои сборки:**
   - Проверьте логи сборки Docker
   - Убедитесь, что все зависимости доступны

### Проверки здоровья:

- Здоровье Backend: `curl http://YOUR_SERVER_IP:3002/health`
- База данных: `docker-compose -f docker-compose.production.yml exec postgres pg_isready`

## 🔒 Замечания по безопасности

### Безопасность приложения

- Измените все пароли по умолчанию в `.env.production`
- Используйте сильные JWT секреты (минимум 32 символа)
- Регулярно обновляйте пакеты сервера и Docker образы
- Мониторьте логи на предмет проблем безопасности

### Конфигурация SSL/HTTPS

- Скрипт настройки Nginx автоматически настраивает SSL сертификаты
- Используйте Let's Encrypt для бесплатных SSL сертификатов
- Весь HTTP трафик перенаправляется на HTTPS
- HSTS заголовки настроены для безопасности

### Конфигурация Firewall

```bash
# Разрешите только необходимые порты
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable  # Включите firewall
```

### Безопасность Docker

- Контейнеры работают с ограниченными привилегиями
- Секреты управляются через переменные окружения
- Регулярные обновления безопасности для базовых образов
- Сетевая изоляция между сервисами

## 📞 Поддержка и обслуживание

### Чеклист перед развертыванием

- [ ] `.env.production` настроен с правильным IP/доменом
- [ ] Сервер имеет минимум 4GB RAM и 20GB дискового пространства
- [ ] Порты 80, 443, 3000-3002, 5432, 9000-9001 доступны
- [ ] DNS домена указывает на IP сервера (опционально, но рекомендуется)
- [ ] SSH доступ настроен с аутентификацией по ключам

### Чеклист после развертывания

- [ ] Все сервисы запущены: `docker-compose ps`
- [ ] Конфигурация Nginx валидна: `nginx -t`
- [ ] SSL сертификаты работают (если настроены)
- [ ] Все URL доступны и работают
- [ ] Миграции базы данных выполнены успешно

### Проверки здоровья

```bash
# Здоровье приложения
curl -f https://your-domain.com/api/health
curl -f https://your-domain.com/admin
curl -f https://your-domain.com

# Статус Nginx
systemctl is-active nginx

# Docker сервисы
cd /opt/seller && docker-compose ps | grep -c "Up"
```

### Стратегия резервного копирования

```bash
# Резервная копия базы данных
cd /opt/seller
docker exec seller_postgres pg_dump -U seller_user seller_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Резервная копия файлового хранилища
docker run --rm -v seller_minio_data:/data -v $(pwd):/backup alpine tar czf /backup/minio_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
```

### Команды устранения неполадок

```bash
# Проверьте подключение к серверу
ping YOUR_SERVER_IP

# SSH доступ
ssh root@YOUR_SERVER_IP

# Статус Docker
docker --version
docker-compose --version

# Валидация окружения
cd /opt/seller && cat .env.production | grep -v '^#' | grep -v '^$'

# Полная перезагрузка системы
cd /opt/seller
docker-compose down
systemctl restart nginx
docker-compose up -d
```

Для дополнительной поддержки проверьте специфичные для компонентов README файлы в каждой директории (`client/`, `client_admin/`, `server/`).
