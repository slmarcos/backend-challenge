# **Backend-Challenge**
[![Build Status](https://travis-ci.com/slmarcos/backend-challenge.svg?branch=main)](https://travis-ci.com/slmarcos/backend-challenge)

Para rodar o projeto pela primeira vez é necessário executar o comando `npm install` e na sequência o `npm run up`. A API estará disponível para acesso na porta **3010**.

Na primeira execução o banco de dados será populado com os dados do arquivo ***products.csv*** que está no diretório ***csv***.

Os arquivos do diretório ***data/db*** do Mongo são mapeados para a pasta na raiz com nome de ***db-data***.


# **Scripts disponíveis**

### `npm run start:dev`
Executa o projeto com a NODE_ENV definida como ***development***

### `npm run start:prod`
Executa o projeto no modo de produção.

### `npm run build`
Gera o build do projeto.

### `npm run up`
Gera o build do projeto e executa o comando docker-compose up -d

### `npm run down`
Executa o comando docker-compose down

### `npm run test`
Executa todos os testes

### `npm run test:unit`
Executa os testes unitários no modo watch

### `npm run test:integration`
Executa os testes de integração

### `npm run test:ci`
Executa todos os testes e gera o coverage
