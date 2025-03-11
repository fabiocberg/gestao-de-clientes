# API REST - Gestão de Clientes

Este projeto é uma **API RESTful** desenvolvida em **Node.js com TypeScript**, utilizando **MongoDB, Redis e RabbitMQ** para armazenar, cachear e processar eventos de clientes de forma assíncrona.

---

## Tecnologias Utilizadas

-   **Node.js** + **TypeScript**
-   **Express.js** (Framework para API REST)
-   **Mongoose** (ODM para MongoDB)
-   **Redis** (Cache de consultas)
-   **RabbitMQ** (Mensageria para eventos assíncronos)
-   **Docker + Docker Compose** (Ambiente isolado)
-   **Jest + Supertest** (Testes unitários e de integração)

---

## Como Rodar a Aplicação

### Criar um arquivo .env e configurar as variáveis (se não estiver criado):

```
MONGO_URI=mongodb://admin:admin123@mongo:27017/
PORT=3000
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_EXPIRES_IN=300
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
```

### 1. Pré-requisitos

-   Ter **Docker** e **Docker Compose** instalados.
-   Ter **Node.js (versão 18+)** e **npm** instalados (caso não use Docker).

### 2. Rodar com Docker (Recomendado)

```sh
docker-compose up --build -d
```

### Isso iniciará:

-   Aplicação na porta 3000 - http://localhost:3000
-   MongoDB na porta 27017
-   Redis na porta 6379
-   RabbitMQ na porta 5672
-   Painel do RabbitMQ: http://localhost:15672 (guest/guest)

---

## Como Rodar os Testes

```sh
npm test
```

---

## Arquitetura do Projeto

O projeto segue uma arquitetura modular, dividida em camadas para facilitar a manutenção e escalabilidade:

```
/src
│── /config # Configurações do banco, cache, mensageria
│── /controllers # Controladores da API
│── /models # Modelos do banco de dados (Mongoose)
│── /repositories # Camada de acesso ao banco de dados (CRUD)
│── /routes # Definição das rotas da API
│── /queues # Produtor e consumidor de mensagens (RabbitMQ)
│── /tests # Testes unitários e de integração
│── server.ts # Inicialização do servidor Express
```
