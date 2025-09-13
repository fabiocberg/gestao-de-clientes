# Gestão de Clientes API

API **RESTful** para gestão de clientes, construída em **Node.js + TypeScript**.  
Utiliza **MongoDB** para armazenamento, **Redis** para cache e **RabbitMQ** para mensageria de eventos assíncronos.  

O projeto segue arquitetura modular e é totalmente **containerizado com Docker Compose**.

---

## 🚀 Funcionalidades

- CRUD completo de clientes (criar, listar, atualizar, remover).  
- Cache de consultas com Redis.  
- Processamento assíncrono de eventos com RabbitMQ.  
- Arquitetura escalável e desacoplada.  
- Testes unitários e de integração com Jest + Supertest.  

---

## 🛠️ Arquitetura

```
gestao-de-clientes/
│── src/
│   ├── config/           # Configurações (Redis, Mongo, etc.)
│   ├── controllers/      # Controladores da API
│   ├── models/           # Modelos Mongoose (Customer)
│   ├── repositories/     # Repositórios (base + customer)
│   ├── routes/v1/        # Definição das rotas da API
│   ├── queues/           # Produtor/Consumidor RabbitMQ
│   └── server.ts         # Inicialização do servidor Express
│
│── docker-compose.yml    # Orquestração com MongoDB, Redis, RabbitMQ e API
│── Dockerfile            # Build da aplicação
│── .env                  # Variáveis de ambiente
└── README.md
```

---

## 📦 Tecnologias Utilizadas

- **Node.js 18+**  
- **TypeScript**  
- **Express.js** (API REST)  
- **Mongoose** (ODM para MongoDB)  
- **Redis** (cache de consultas)  
- **RabbitMQ** (mensageria assíncrona)  
- **Docker + Docker Compose** (ambiente isolado)  
- **Jest + Supertest** (testes unitários e de integração)  

---

## ▶️ Como Rodar a Aplicação

### 1. Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.  
- (Opcional) Node.js 18+ e npm instalados (caso não use Docker).  

### 2. Configurar variáveis de ambiente
Edite o arquivo `.env` (ou crie um novo se não existir) com os valores:

```env
MONGO_URI=mongodb://admin:admin123@mongo:27017/
PORT=3000
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_EXPIRES_IN=300
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
```

### 3. Rodar com Docker (recomendado)
Na raiz do projeto:
```bash
docker-compose up --build -d
```

Isso iniciará:
- API na porta **3000** → [http://localhost:3000](http://localhost:3000)  
- MongoDB na porta **27017**  
- Redis na porta **6379**  
- RabbitMQ na porta **5672**  
- Painel RabbitMQ em [http://localhost:15672](http://localhost:15672) (user: guest / pass: guest)  

### 4. Rodar sem Docker (alternativa)
```bash
npm install
npm run dev
```

---

## 🧪 Testes

Rodar todos os testes unitários e de integração:
```bash
npm test
```

---

## 📌 Próximos Passos

- Adicionar autenticação/autorização (JWT).  
- Melhorar cobertura de testes.  
- Deploy em nuvem (Heroku, Render, AWS, etc.).  
- Monitoramento e observabilidade (ex: Prometheus + Grafana).  
