# Gerenciador de Mensalidades

## 📌 Sobre o Projeto
O **Gerenciador de Mensalidades** é uma API backend desenvolvida em **Node.js** e **Express**, utilizando **MongoDB** como banco de dados. O sistema permite o gerenciamento de mensalidades de clientes, incluindo autenticação de usuários, controle de pagamentos e geração de relatórios.

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** (Autenticação)
- **Bcrypt.js** (Hash de senhas)
- **Jest & Supertest** (Testes automatizados)

## 📂 Estrutura do Projeto
```
backend/
│-- src/
│   ├── controllers/      # Lógica dos endpoints
│   ├── models/           # Modelos do MongoDB
│   ├── routes/           # Rotas da API
│   ├── middlewares/      # Middlewares de autenticação
│   ├── tests/            # Testes automatizados
│   ├── server.js         # Inicialização do servidor
│-- .env                  # Variáveis de ambiente
│-- package.json          # Dependências do projeto
│-- README.md             # Documentação
```

## ⚙️ Configuração e Instalação

### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/seu-usuario/gerenciador-mensalidades.git
cd gerenciador-mensalidades
```

### 2️⃣ Instalar dependências
```sh
npm install
```

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione:
```
MONGO_URI=
JWT_SECRET=
PORT=
```

### 4️⃣ Rodar o servidor
```sh
npm start
```
O servidor será iniciado em **http://localhost:5000**

## 🔑 Autenticação
A API usa **JWT** para autenticação. Ao fazer login, o usuário recebe um token que deve ser enviado no **header Authorization** nas requisições protegidas.

## 📌 Endpoints da API

### 🟢 **Autenticação**
- **POST** `/register` → Registrar novo usuário
- **POST** `/login` → Fazer login
- **GET** `/me` → Obter informações do usuário autenticado

### 🟢 **Clientes**
- **GET** `/pagamentos` → Listar clientes
- **POST** `/pagamentos` → Criar clientes
- **PUT** `/pagamentos/:id` → Atualizar clientes
- **DELETE** `/pagamentos/:id` → Remover clientes

### 💰 **Mensalidades**
- **GET** `/mensalidades` → Listar mensalidades
- **POST** `/mensalidades` → Criar mensalidade
- **PUT** `/mensalidades/:id` → Atualizar mensalidade
- **DELETE** `/mensalidades/:id` → Remover mensalidade

### 💰 **Pagamentos**
- **GET** `/pagamentos` → Listar pagamentos
- **POST** `/pagamentos` → Criar pagamentos
- **PUT** `/pagamentos/:id` → Atualizar pagamentos
- **DELETE** `/pagamentos/:id` → Remover pagamentos

### 📊 **Relatórios**
- **GET** `/api/relatorio/mensalidades/vencendo` → Listar mensalidades próximas do vencimento
- **GET** `/api/relatorio/clientes/inadimplentes` → Clientes inadimplentes
- **GET** `/api/relatorio/receitas/mensais` → Receita mensal
- **GET** `/api/relatorio/faturamento/anual` → Faturamento anual

## 📜 Licença
Este projeto está sob a licença **MIT**.

---
💡 _Dúvidas ou sugestões? Sinta-se à vontade para contribuir!_ 🚀

