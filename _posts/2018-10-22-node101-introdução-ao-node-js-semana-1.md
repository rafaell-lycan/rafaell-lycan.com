---
title: 'Node101: Introdução ao Node.js - Semana 1'
description: >-
  Não é segredo que hoje em dia, podemos utilizar JavaScript em qualquer lugar:
  browser, servidor, apps para móveis ou desktops e até mesmo para Smart TV's.
  Todo este avanço aconteceu graças ao Node.js, a tecnologia que mudou o mundo
  do JavaScript para o que temos hoje.
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

## O Node.js REPL

[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) significa _"READ-EVAL-PRINT-LOOP"_, ou seja, ele cria um ambiente de programação simples que lê o `input` do usuário, a avalia a expressão, imprime o `output`, repetindo o mesmo ciclo, assim como temos no **console** dos browsers modernos.

Como utilizar:

```bash
$ node
>
```

Você pode digitar qualquer expressão Javascript válida no REPL e ver o resultado instantaneamente:

```bash
> 121 + 392
513
```

Quando terminar de experimentar, pressione `Ctrl + C` ou digite `.exit` e pressione enter para sair do REPL.

## Hello World!

Como sempre o exemplo mais estúpido na computação é o "Hello World!", e veremos a seguir dois exemplos de como faze-lo:

```javascript
const word = process.argv[2];

console.log('Hello %s!', word || 'World');
```

Neste primeiro exemplo, criamos um arquivo `hello.js` que nos permite passar um argumento "word" da seguinte forma:

```bash
node hello.js # Hello World!
node hello.js Rafaell # Hello Rafaell!
```

Levando em conta que estamos utilizando o objeto `process` o qual tem inúmeros métodos e propriedades sobre o atual processo em si. Neste caso utilizamos `argv` que nada mais é que um array informando os argumentos executados neste processo. Agora, se criamos um arquivo o qual simplesmente nos mostra o que contem `console.log(process.argv)` teremos o seguinte cenário:

```bash
node hello.js hello world

#[
#  '/usr/bin/node',
#  '/home/rafaell/examples/hello.js',
#  'hello',
#  'world'
#]
```

Ok, este exemplo foi muito simples, agora vamos ver um exemplo com um servidor web:

```javascript
const {createServer} = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.write('Hello World!');
  res.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port} 🚀`)
})
```

Para executar este código, devemos criar um arquivo chamado `server.js` e executar em nosso terminal `node server.js`. Com isso se abrimos `http://localhost:3000` em nosso navegador, podemos ver a mensagem "Hello World!" na página.

Descrevendo o código, na primeira linha importamos o módulo `http` que já vem incluso na instalação do Node.js, depois definimos `hostname` e `port` que será servirá para informar onde a aplicação deve ser executada, em seguida criamos nosso `server` utilizando o método `createServer()` do módulo `http` que criar um novo servidor HTTP.

Quando o servidor recebe uma requisição, é executada a nossa função que possui dois parâmetros, os objetos `req` _(Request: um objeto `http.IncomingMessage`)_ e `res` _(Response: um objeto `http.ServerResponse`)_. Esses dois objetos são essenciais para lidar com chamadas HTTP, onde o primeiro contém as informações sobre a requisição _(neste exemplo, não utilizamos nenhuma informação)_, e o segundo é responsável por retornar dados para a requisição em si _(neste exemplo, configuramos a header da resposta com um `Content-Type` e status `200` além de devolver a mensagem `Hello world`)_.

## Módulos e NPM

O Node.js é uma plataforma de baixo nível, e para tornar as coisas mais fáceis e interessantes para os desenvolvedores, contamos com milhares **módulos/bibliotecas** que se tornaram muito populares com o tempo.

O Node já vem com alguns módulos pré-definidos, como o `http` por exemplo, mas na maioria das vezes vamos precisar utilizar alguns módulos adicionais, os quais podemos instalar via **NPM** que nada mais é que o gerenciador de pacotes do Node, o qual também nos disponibilizar um programa `npm` que podemos utilizar via terminal


```bash
$ npm install <nome_do_modulo>
$ npm install -g jshint
```

Neste caso, estamos instalando o módulo [jshint](https://www.npmjs.com/package/jshint) globalmente em nosso sistema utilizando a flag `-g`, o que agora nos da a capacidade de testar a qualidade de nosso código .js da seguinte maneira:

```bash
jshint nome_do_arquivo.js
```

Também podemos instalar pacotes localmente em um projeto ao invés de globalmente em nosso sistema. Para isso podemos utilizar o comando `npm init` que nos vai guiar na criação do nosso arquivo `package.json` que basicamente contem todos os módulos instalados no seu projeto e também algumas outras configurações, assim, toda vez que precisarmos adicionar uma dependência ao nosso projeto, podemos fazer isso com um simples comando `npm install <nome_do_modulo> --save`. Isso vai automáticamente anexar a dependência ao nosso arquivo `package.json` e também baixar o módulo em uma pasta chamada `node_modules`.

O Node utiliza um [sistema de módulos](https://nodejs.org/docs/latest/api/modules.html) chamado **Common JS**. Com ele podemos importar e exportar módulos dentro de nossas aplicações de uma maneira muito simples. Até o atual momento, temos suporte parcial das features do ES6, porem ainda não contamos com módulos ES6 sem utilizar ferramentas como o **Babel** ou utilizando a flag `--experimental-modules` ou adicionando em nosso `package.json` a propriedade `type: "module"`. Mas ainda sim, o Common JS funciona de forma simples e não requer nenhuma mágia negra para utiliza-lo.

Vamos ao um exemplo simples:

```bash
$ npm install pluralize --save
```

Agora que temos o módulo `pluralize` disponível, podemos simplesmente importa-lo utilizando a função global `require`:

```javascript
const pluralize = require("pluralize")
const words = ['apple', 'banana', 'orange']

words.forEach((word) => console.log( pluralize(word) ));
// "apples"
// "bananas"
// "oranges"
```

E no momento em que criamos um arquivo que queremos deixar acessível para ser utilizado, podemos fazer isso através do objeto global `module`:

```javascript
const someModule = require('./path/someModule');

const myFunction = (...args) => someModule.method(args);

module.exports = myFunction;
```

Bem simples não concorda? E o melhor é que podemos importar  e exportar qualquer coisa, seja um objeto, função ou até mesmo algum valor `string`, `number`, `boolean`, etc bem como o sistema de módulos do ES6.

Eu não vou entrar mais afundo sobre como utilizar o NPM neste artigo, mas você pode aprender mais com a [documentação oficial](https://docs.npmjs.com/) e também buscando os módulos para te auxiliar em um novo projeto [na página oficial do NPM](https://www.npmjs.com/).

## Vantagens

Além de velocidade e escalabilidade, um dos pontos fortes do Node é a simplicidade para desenvolver aplicações web, onde você utiliza a mesma linguagem de programação, o que torna tudo mais produtivo. Uma outra vantagem é a possibilidade de compartilhar código entre cliente e servidor, além de muitas outras como o modo que o Node opera através do "Event-Loop", o qual eu não vou entrar muito a fundo aqui, mais você pode aprender mais sobre isso [aqui](https://www.youtube.com/watch?v=8aGhZQkoFbQ) e [aqui](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/).

Até o próximo artigo.
