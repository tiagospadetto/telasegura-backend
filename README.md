# Tela Segura Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)


Este é o backend da aplicação tela segura com Express.js. Ele gerencia a lógica de negócios, comunicação com o banco de dados e comunicação em tempo real com o frontend.
 
## Tecnologias Utilizadas

- [MongoDb](https://www.mongodb.com/pt-br/) - Banco de dados NoSQL para armazenar a fila de solicitações e bloqueio da tela
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript do lado do servidor
  - [Expre.IO](https://expressjs.com/) - Framework web minimalista para Node.js, permitindo construir rapidamente servidores web e APIs com uma sintaxe simples e uma vasta gama de middleware.
  - [Socket.IO](https://socket.io/) - WebSocket para comunicação bidirecional em tempo real entre o servidor e o cliente.

## Como Executar

1. Clone o repositório e acesse a pasta do projeto
   ```shell
   git clone https://github.com/tiagospadetto/telasegura-backend.git
   cd telasegura-backend
    ```
2. Instale os pacotes utilizando o comando `npm install`
3. Crie um arquivo `.env` na raiz do projeto e insira suas credenciais. Utilize o arquivo `.env.example` como base.
4. Execute o projeto com o comando `npm run dev`

### Frontend

Você pode executar o frontend para se comunicar com esta aplicação. Para isso, siga as instruções abaixo:

1. Clone esse [repositório](https://github.com/tiagospadetto/telasegura-frontend)
```
git clone https://github.com/tiagospadetto/telasegura-frontend
```

2. Siga as instruções fornecidas no repositório do frontend para configurar e executar o projeto.
