# Проект: Marketplace API на NestJS
**Цель:** backend API для маркетплейса услуг

**Функциональность:**
- Регистрация, логин (JWT), авторизация через Google/GitHub
- Создание и просмотр услуг
- Система заказов
- WebSocket чат
- Email-рассылки
- RabbitMQ очереди
- Redis кэш
- Swagger, Guards, Docker

**Роли:**
- Гость
- Пользователь
- Исполнитель
- Админ

**Архитектура:**
- NestJS + PostgreSQL + TypeORM
- Modularity (UserModule, AuthModule, ServiceModule и т.д.)
- Microservice-ready (но пока Monolith)

