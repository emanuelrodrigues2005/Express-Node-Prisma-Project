# API REST com Node.js, Express, Prisma e TypeScript

Este projeto consiste no desenvolvimento de uma API RESTful completa, construída com um conjunto de tecnologias modernas do ecossistema Node.js, incluindo Express.js, Prisma (com PostgreSQL) e TypeScript.

A aplicação implementa uma arquitetura robusta e em camadas para gerenciar entidades como Alunos (Students) e Turmas (Classes), com autenticação JWT para proteger os endpoints.

## Arquitetura

O projeto adota uma arquitetura em camadas para promover a separação de responsabilidades (Separation of Concerns), facilitando a manutenção e a escalabilidade:

  * **Controladores (Controllers):** Responsáveis por receber as requisições HTTP, validar dados de entrada superficiais e enviar as respostas. Eles orquestram a lógica de negócio, mas não a implementam.
  * **Serviços (Services):** Contêm a lógica de negócio principal da aplicação. Eles são chamados pelos controladores e utilizam os repositórios para interagir com o banco de dados.
  * **Repositórios (Repositories):** Camada de abstração de dados. Encapsula toda a lógica de acesso ao banco de dados, utilizando o Prisma Client para executar as queries. Isso permite que o resto da aplicação interaja com os dados sem conhecer os detalhes da implementação do banco de dados.

## Tecnologias Utilizadas

  * **Node.js:** Ambiente de execução (runtime) JavaScript.
  * **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
  * **Express.js:** Framework para construção de APIs e aplicações web em Node.js.
  * **Prisma:** ORM (Object-Relational Mapper) de próxima geração para Node.js e TypeScript.
  * **PostgreSQL:** Banco de dados relacional utilizado.
  * **JSON Web Token (JWT):** Utilizado para implementar a autenticação e autorização dos endpoints.
  * **ts-node-dev:** Utilizado para o ambiente de desenvolvimento, reiniciando o servidor automaticamente a cada alteração.
  * **Dotenv:** Para gerenciamento de variáveis de ambiente.

## Funcionalidades

  * Implementação de API RESTful.
  * Operações CRUD (Criar, Ler, Atualizar, Deletar) completas para Alunos e Turmas.
  * Autenticação de administrador via JWT para proteger rotas.
  * Validação de dados e tratamento de erros.
  * Esquema de banco de dados gerenciado com Prisma Migrate.

## Esquema do Banco de Dados

Os modelos principais definidos no `prisma/schema.prisma` são:

  * `Student`: Armazena informações dos alunos.
  * `Class`: Armazena informações das turmas.
  * `Teacher`: Armazena informações dos professores.

## Endpoints da API

A API expõe os seguintes endpoints, todos protegidos (exceto `/admin`)

### Autenticação

  * `POST /admin`: Realiza o login do administrador. Requer `userName` e `userPassword` no corpo da requisição e retorna um token JWT.

*Todas as rotas abaixo requerem um Bearer Token no cabeçalho `Authorization`.*

### Alunos (Student)

  * `GET /student`: Retorna uma lista de todos os alunos.
  * `GET /student/:id`: Retorna um aluno específico pelo ID.
  * `POST /student`: Cria um novo aluno.
  * `PUT /student/:id`: Atualiza um aluno existente pelo ID.
  * `DELETE /student/:id`: Deleta um aluno pelo ID.

### Turmas (Class)

  * `GET /class`: Retorna uma lista de todas as turmas.
  * `GET /class/:id`: Retorna uma turma específica pelo ID.
  * `POST /class`: Cria uma nova turma.
  * `PUT /class/:id`: Atualiza uma turma existente pelo ID.
  * `DELETE /class/:id`: Deleta uma turma pelo ID.

## Como Executar

### Pré-requisitos

  * Node.js (v18 ou superior)
  * NPM ou Yarn
  * Uma instância do PostgreSQL em execução

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/emanuelrodrigues2005/express-node-prisma-project.git
    cd express-node-prisma-project
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no `.gitignore` e nos arquivos de configuração (como `authController.ts` e `schema.prisma`).

    ```.env
    # URL de conexão do Banco de Dados PostgreSQL
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOMEDOBANCO?schema=public"

    # Credenciais de Admin
    ADMIN_USER=seu_usuario_admin
    ADMIN_PASSWORD=sua_senha_admin

    # Segredo do JWT
    JWT_SECRET=seu_segredo_jwt_super_secreto
    ```

4.  **Execute as migrações do Prisma:**
    Isso irá criar as tabelas no seu banco de dados com base no `schema.prisma`.

    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    O servidor será iniciado em `http://localhost:8080`.

    ```bash
    npm run dev
    ```

### Build para Produção

Para compilar o código TypeScript para JavaScript e executar em um ambiente de produção:

1.  **Compile o projeto:**

    ```bash
    npm run build
    ```

2.  **Inicie o servidor em produção:**

    ```bash
    npm start
    ```

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.
