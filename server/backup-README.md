# Backup Script Documentation

Этот скрипт предназначен для создания резервных копий базы данных PostgreSQL и хранилища MinIO в проекте Seller.

## Возможности

- **PostgreSQL Backup**: Создание полной резервной копии базы данных с использованием `pg_dump`
- **MinIO Backup**: Резервное копирование всех бакетов MinIO с помощью MinIO Client (mc)
- **Автоматическая очистка**: Удаление старых бэкапов (старше 7 дней)
- **Гибкие опции**: Возможность бэкапа только базы данных или только MinIO
- **Dry Run режим**: Проверка того, что будет сделано без фактического создания бэкапов
- **Логирование**: Подробное логирование всех операций

## Использование

### Через Makefile (рекомендуется)

```bash
# Полный бэкап (PostgreSQL + MinIO)
make backup

# Только PostgreSQL
make backup-postgres

# Только MinIO
make backup-minio

# Dry run (показать что будет сделано)
make backup-dry-run
```

### Прямой запуск скрипта

```bash
# Полный бэкап
./backup.sh

# Только PostgreSQL
./backup.sh --postgres-only

# Только MinIO
./backup.sh --minio-only

# Dry run
./backup.sh --dry-run

# Справка
./backup.sh --help
```

## Структура бэкапов

Бэкапы сохраняются в директорию `./backups/`:

```
backups/
├── postgres_backup_20240110_143022.sql    # PostgreSQL бэкап
├── minio_public_20240110_143022/          # MinIO бакет public
├── minio_private_20240110_143022/         # MinIO бакет private
└── minio_media_20240110_143022/           # MinIO бакет media
```

## Переменные окружения

Скрипт использует переменные окружения из файла `.env` или `.env.production`:

### PostgreSQL
- `DATABASE_URL`: Полный URL подключения к PostgreSQL
- Или отдельные переменные:
  - `DB_USER`: Пользователь базы данных
  - `DB_PASSWORD`: Пароль базы данных
  - `DB_NAME`: Имя базы данных
  - `DB_HOST`: Хост базы данных (по умолчанию: localhost)
  - `DB_PORT`: Порт базы данных (по умолчанию: 5432)

### MinIO
- `MINIO_ENDPOINT`: Хост MinIO (по умолчанию: localhost)
- `MINIO_PORT`: Порт MinIO (по умолчанию: 9000)
- `MINIO_ACCESS_KEY`: Ключ доступа MinIO
- `MINIO_SECRET_KEY`: Секретный ключ MinIO
- `MINIO_USE_SSL`: Использовать SSL (true/false, по умолчанию: false)
- `MINIO_BUCKET_PUBLIC`: Имя публичного бакета (по умолчанию: public)
- `MINIO_BUCKET_PRIVATE`: Имя приватного бакета (по умолчанию: private)
- `MINIO_BUCKET_MEDIA`: Имя медиа бакета (по умолчанию: media)

## Требования

### Для PostgreSQL бэкапа
- Установленный `pg_dump` (из пакета postgresql-client)

### Для MinIO бэкапа
- MinIO Client (mc) - будет автоматически скачан если отсутствует
- Или установите вручную:
  ```bash
  wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/local/bin/mc
  chmod +x /usr/local/bin/mc
  ```

## Автоматизация

### Cron для ежедневных бэкапов

Добавьте в crontab для автоматического запуска:

```bash
# Ежедневный бэкап в 2:00 ночи
0 2 * * * cd /path/to/seller/server && ./backup.sh

# Или через make
0 2 * * * cd /path/to/seller/server && make backup
```

### В Docker контейнере

Для запуска в Docker контейнере убедитесь, что:
1. Скрипт смонтирован в контейнер
2. Переменные окружения доступны
3. PostgreSQL и MinIO доступны по сети

## Мониторинг и оповещения

Скрипт возвращает:
- **Exit code 0**: Успешное выполнение
- **Exit code 1**: Ошибка выполнения

Рекомендуется настроить мониторинг exit code и отправку оповещений при неудачных бэкапах.

## Безопасность

- Бэкапы содержат чувствительные данные - храните их в защищенном месте
- Регулярно тестируйте восстановление из бэкапов
- Шифруйте бэкапы при необходимости
- Ограничивайте доступ к директории с бэкапами

## Устранение неполадок

### PostgreSQL бэкап не работает
1. Проверьте подключение: `pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER`
2. Убедитесь что переменные окружения корректны
3. Проверьте права пользователя базы данных

### MinIO бэкап не работает
1. Проверьте доступность MinIO: `curl http://$MINIO_ENDPOINT:$MINIO_PORT/minio/health/live`
2. Проверьте credentials в переменных окружения
3. Убедитесь что бакеты существуют

### Скрипт не может скачать mc
1. Установите mc вручную или убедитесь что есть `wget`/`curl`
2. Проверьте интернет подключение
