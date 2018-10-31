---
title: 'Node101: Introdução ao Node.js - Semana 1'
description: lorem ipsum...
tags: nodejs javascript development
---
Não é segredo que hoje em dia, podemos utilizar JavaScript em qualquer lugar: browser, servidor, apps para móveis ou desktops e até mesmo para Smart TV's. Todo este avanço aconteceu graças ao [Node.js](https://nodejs.org/), a tecnologia que mudou o mundo do JavaScript para o que temos hoje.

Se você escreve código Front-End, já deve estar mais que familiarizado com ferramentas em Node como Grunt, Gulp, Webpack e outras.

## Introdução

Node.js é uma tecnologia que nos permite executar JavaScript no servidor. Isso mesmo, **no servidor**.

Ele é open-source, cross-platform e foi introduzido em 2009 e tornou-se muito popular já que desempenha um papel significativo para o desenvolvimento web. Se estrelas no Github são um fator de popularidade, então ter mais de [54.000 estrelas](https://github.com/nodejs/node) deve significar ser muito popular.

Além disso, foi construído em C++ utilizando a **JavaScript V8** que é o motor do Google Chrome, o que nos permite criar servidores web e muito mais.

Nos últimos anos, tenho me divertido muito com o Node e acho que aprendi o suficiente para compartilhar, receber feedback e aprender mais. Mas é muito importante entender que o Node não é uma bala de prata, nem sempre é a melhor solução para cada projeto. Qualquer um pode inicializar um servidor no Node, mas é preciso um entendimento mais profundo da linguagem e arquitetura de software para escrever aplicações escaláveis.

Você pode fazer download do Node em sua [página oficial](https://nodejs.org/), mas eu sugiro que você utilize um gerenciador de versões como o [NVM](https://github.com/creationix/nvm), o que vai permitir você instalar diferentes versões e alternar de acordo com a necessidade/versão do projeto que você estiver trabalhando.

## Hello World!

Como sempre o exemplo mais simples na internet é o "Hello World!":

```javascript
//server.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  response.write('Hello world');
  response.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```

Para executar este código, você deve criar um arquivo chamado `server.js` e executar `node server.js` no seu terminal.

Descrevendo o código, na primeira linha importamos o módulo `http` que já vem incluso na instalação do Node.js, depois definimos `hostname` e `port` que será servirá para informar onde a aplicação deve ser executada, em seguida criamos nosso `server` utilizando o método `createServer()` para criar um novo servidor HTTP.

Quando o servidor recebe uma requisição, é executada uma função que nos fornece dois objetos `req` *(Request: um objeto `http.IncomingMessage`)* e `res` *(Response: um objeto `http.ServerResponse`)*. Esses dois objetos são essenciais para lidar com chamadas HTTP, onde o primeiro contém as informações sobre a requisição *(neste exemplo, não utilizamos nenhuma informação)*, e o segundo é responsável por retornar dados para a requisição em si *(neste exemplo, configuramos a header da resposta com um `Content-Type` e status `200` além de devolver a mensagem `Hello world`)*.

* Módulos e NPM

O Node.js é uma plataforma de baixo nível, e para tornar as coisas mais fáceis e interessantes para os desenvolvedores, contamos com milhares módulos/bibliotecas que se tornaram muito populares com o tempo.

* Utilizando o NPM
* Seu primeiro servidor web

https://udgwebdev.com/nodejs/
https://www.sitepoint.com/an-introduction-to-node-js/
