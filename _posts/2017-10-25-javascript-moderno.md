---
title: "JavaScript Morderno: O que você está esperando?"
date:  2017-10-01
tags:  javascript
description: >
  Aprenda como usar TypeScript para escrever aplicações melhores, mais seguras e mais escalaveis. Veremos os benefícios de tipagem e interfaces nesta pequena introdoção ao TypeScript.
related:
  - title : "Using ES6 Modules with Webpack"
    url: http://www.zsoltnagy.eu/using-es6-modules-with-webpack/
    from: "Zsolt Nagy Blog"
  - title : "How to Learn ES6"
    url: https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620
    from: "Medium"
  - title : "Configuring Webpack to write JS with ES6/ES2015 on browser"
    url: https://medium.com/daily-js-tips/configuring-webpack-to-write-js-with-es6-es2015-on-browser-cd089a79ecea
    from: "Medium"
  - title : "Advanced front-end automation with npm scripts"
    url: https://www.youtube.com/watch?v=0RYETb9YVrk
    from: "Youtube"
---

Eu recebi um email a 2 semanas atrás que me fez refletir um pouco sobre o cenário atual do JavaScript e como pequenas estão se adequando ~~ou não~~ ao atual cenário.

Eu não posso/não estou autorizado a divulgar o nome do leitor, mas quero que ele saiba que eu estou feliz de termos trocado emails nesta ultima semana.

Em resumo é o cenário de empresas pequenas e agências de publicidade, onde não precisam utilizar tecnologias novas, pois na maioria das vezes o velho [jQuery](https://jquery.com/) em conjunto com o [Wordpress](https://wordpress.org/) resolve todos os problemas.

Eu não acho isso ruim, mas acho que as pessoas têm uma ideia mal formada sobre o cenário atual e de como podem começar a utilizar novas tecnologias hoje mesmo sem depender de frameworks como Angular 2, React, etc.

## Prologo

Aprender JavaScript hoje em dia não é uma tarefa fácil, especialmente as coisas mais novas como novas funcionalidades graças ao ES6/7 e um vasto mundo de bibliotecas e frameworks. Tudo muda tão rápido que é muito difícil se manter atualizado ou entender quais os problemas que uma nova feature pode resolver.

Eu comecei a programar de fato em 2009/2010, mas só me importei de aprender JavaScript de verdade em 2014 enquanto estudava [BackboneJS](http://backbonejs.org/) para um projeto.

Não faz muito tempo, mas até então, eu só conhecia algumas magias de jQuery e o básico da linguagem JavaScript, com o tempo aprendi a escrever um código mais modular especialmente com [RequireJS](http://requirejs.org/), e depois disso conheci o [Browserify](http://browserify.org/).

> Browserify lets you require(‘modules’) in the browser by bundling up all of your dependencies.

Eu precisei adotar coisas novas ao meu fluxo de desenvolvimento, não porque estava utilizando o framework XPTO, mas porque comecei a ver as vantagens de se trabalhar com tais ferramentas.

## De volta aos anos 2000

Eu imagino que todo mundo começou da mesma forma, utilizando apenas HTML, CSS e JavaScript onde normalmente incluiamos as bibliotecas e plugins em pastas da aplicação, normalmente nomeadas como `vendor`, `plugins` ou algo do tipo. Depois tinhamos um arquivo único onde centralizavamos toda a aplicação normalmente no evento `onload` da página.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="vendor/jquery.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

A linha onde incluimos o arquivo `app.js` é o ponto onde  de fato escreviamos todo o comportamento da nossa aplicação.

*jQuery feelings.*

```javascript
$(document).ready(function() {
    console.log( "Hello World!" );
});
```

Sempre tínhamos que seguir as ordem dos arquivos e depois de um certo tempo tinhamos vários importes na página. Para deixarmos as coisas mais claras, vamos adicionar algumas bibliotecas a mais como [moment.js]() para formatarmos e manipularmos datas de uma forma simples e o [lodash]() que possui uma gama de helpers.

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="vendor/jquery.min.js"></script>
  <script src="vendor/lodash.min.js"></script>
  <script src="vendor/moment.min.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <h1>Hello World!</h1>
  <nav class="links">
    <ul></ul>
  <nav>
  <div class="clock"></div>
</body>
</html>
```

Perceba que agora estamos incluindo os arquivos com uma versão minificada, e sempre antes da nossa `app.js` onde agora podemos adicionar o seguinte código:

```javascript
function displayTime() {
  var time = moment().format('HH:mm:ss');
  $('.clock').html(time);
  setTimeout(displayTime, 1000);
}

function displayLinks(links) {
  var list = $(".links ul");
  $.each(links, function(name, link){
    var content = '<li><a href="//' + link + '">' + _.capitalize(name) + '</a></li>'
    list.append(content);
  });
}

$(document).ready(function() {
    console.log( "Hello World!" );

    var links = {
      google: 'google.com',
      facebook: 'facebook.com',
      twitter: 'twitter.com'
    };

    displayTime();
    displayLinks(links);
});
```

Até então esse é um código simples, mas o objetivo aqui é mostrar como fazíamos sites antigamente com bibliotecas JavaScript.

A parte boa é que esta simples suficiente para entender, já a parte ruim seria toda hora termos que adicionar uma nova biblioteca em uma versão especifica, tirando o fato de deixarmos o projeto atualizado.

## Gerenciadores de pacotes

Com o tempo começou a aparecer os gerenciadores de pacotes, acredito que quando comecei, os mais famosos eram o [NPM](https://www.npmjs.com/) e o [Bower](https://bower.io/), especialmente para se trabalhar com [Yeoman](http://yeoman.io/). Claro, isso foi algo entre 2012 e 2013, após o meu primeiro evento de tecnologia, o [Tableless Conference](https://tableless.com.br/tablelessconf/).

Hoje em dia temos o [Yarn](https://yarnpkg.com/) que utiliza os pacotes do NPM o qual até [escrevi um artigo recentemente](/2017/porque-voce-deveria-dar-uma-chance-yarn/).

Para utilizarmos um gerenciador de pacotes como o npm por exemplo, precisamos criar um arquivo `package.json` onde serão armazenados nossas dependencias. Podemos criar o arquivo dinâmicamente através do comando `npm init` em seu terminal, o qual vai nos gerar um arquivo mais ou menos assim:

```json
// package.json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Com isso podemos adicionar nossas dependencias que serão salvas na pasta `node_modules`.

```bash
npm install moment lodash jquery --save
```

Nosso arquivo `package.json` sera alterado adicionando nota das dependências do projeto:

```json
// package.json
{
  ...
  "dependencies": {
    "jquery": "^3.2.1",
    "lodash": "^4.17.4",
    "moment": "^2.19.1"
  }
  ...
}
```

Isso é realmente útil, já que podemos utilizar uma versão especifica da jQuery se for necessário por conta de algum plugin, além de não precisarmos baixar as dependências manualmente e colocarmos em nosso projeto, porem ainda será necessário adicionarmos as bibliotecas manualmente em nosso arquivo `.html`.

```html
...
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/lodash/lodash.min.js"></script>
  <script src="node_modules/moment/min/moment.min.js"></script>
  <script src="app.js"></script>
</head>
...
```

A parte boa é que estamos utilizando as dependências do **npm** o que facilita baixando e atualizar via linha de comando, porem, a parte ruim é que agora temos que procurar dentro da pasta `node_modules` por uma dependência e depois adiciona-la manualmente em nosso **html**, e isso não é nada conveniente, felizmente existem ferramentas como **grunt**, **gulp** e **webpack** para automatizar esse processo, o que vamos conferir a seguir.

## Trabalhando com Webpack

Automatizar processos é uma parte que nos custa um certo tempo no início, sempre é necessário preparar o setup inicial, mas depois de todo esse esforço vem a recompensa de não realizar tarefas repetitivas.

Como muitas linguagens de programação suportam importar um trecho de código dentro de um arquivo, no início o JavaScript não suportava tal funcionalidade por ter sido desenvolvido para funcionar unicamente nos navegadores, logo organizar códigos JavaScript e separa-los em módulos não era a coisa mais fácil ou mais bonita de ser fazer no mundo, mas era possível, mas isso foi há muito tempo atrás, graças ao projeto **CommonJS** que trouxe a especificação dos módulos para se trabalhar com **Node.js**, onde era possóvel importar módulos de terceiros para nossos projetos e criar os nossos próprios.

Depois com ferramentas como as que citei a cima e **module loaders** como o **Browserify** tudo se tornou mais fácil, onde ao invés de termos que declarar em um arquivo todo o caminho, podíamos utilizar apenas o nome do módulo que tudo se resolvia, onde ao invés disso: `require('./node_modules/moment/min/moment.min.js)`, podemos simplesmente escrever `require('moment')`.

Inicialmente eu utilizei RequireJS, depois conheci o Browserify em 2014 o qual foi fantástico e hoje temos alguns como o **webpack** muito popular principalmente pela comunidade **React**.

Mas chega de história, vamos utilizar o webpack para importarmos nossas dependências e também para criar um único arquivo JavaScript a ser importado em nosso HTML.

Primeiro vamos instala-lo com o comando:

```bash
npm install webpack --save-dev
```

Perceba que estamos utilizando a flag `--save-dev` já que isso não é uma dependência do projeto mas sim do ambiente de desenvolvimento em sí. Isso também afetará nosso `package.json` porem agora será adicionado como `devDependencies`:

```json
// package.json
{
  ...
  "devDependencies": {
    "webpack": "^3.8.1"
  }
  ...
}
```

Agora poderiamos refatorar nosso código para algo mais simplificado:

```javascript
// app.js

var $ = require('jquery');
var _ = require('lodash');
var moment = require('moment');

function displayTime() {}

function displayLinks(links) {}

$(document).ready(function() {});
```

Depois disso podemos finalmente juntar tudo com o webpack através do comando:

```bash
./node_modules/.bin/webpack app.js bundle.js
```

E finalmente incluirmos em nosso arquivo `index.html` o arquivo `bundle.js` que contem tudo o que precisamos para o projeto:

```html
...
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="bundle.js"></script>
</head>
...
```

Se você atualizar o navegador, tudo deverá continuar funcionando!

Para não ficarmos parados no tempo e termos mais controle sobre o que fazemos com o **webpack**, vamos adicionar configurações mais avançadas criando assim o arquivo `webpack.config.js` que será algo mais ou menos assim:

```javascript
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
};
```

E em nosso arquivo `package.json` vamos adicionar um novo comando no bloco `scripts` chamado `build`:

```json
// package.json
{
  ...
  "scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  ...
}
```

Uma vez feito isso, agora podemos utilizar apenas o comando `npm run build` fazermos o mesmo processo anterior, o que faz termos mais controle através deste arquivo de configuração. Em geral, não se vê muita diferença, uma vez que estamos fazendo a mesma coisa, mas podemos agora melhorar nosso fluxo de desenvolvimento adicionando outras features como suporte ao ES6.

## Transpilando para ES6 (Babel)

Transpilar significa transformar/converter um código/linguagem para algo similar, e isso não é uma coisa que ocorre apenas no mundo JavaScript, o [Groovy](http://groovy-lang.org/) faz um processo parecido para gerar um código que funcione na JVM.

Isso nos faz lembrar que utilizamos [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/) para CSS, também é possível utilizar no mundo JavaScript o [CoffeeScript](http://coffeescript.org/), mas atualmente as soluções mais adotadas são o [Babel](https://babeljs.io/) e o [TypeScript](http://www.typescriptlang.org/).

Vamos adicionar agora suporte a ES6 utilizando o **babel** em nosso arquivo de configuração. Primeiro, temos que adicionar as dependencias em nosso `package.json`:

```bash
npm install babel-core babel-preset-env babel-loader --save-dev
```

Com isso podemos agora adicionar em nosso arquivo `webpack.config.js` as seguintes configurações:

```javascript
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
```

Num resumo, os 3 pacotes contém o **babel-core**, onde estão as features do ES6 que iremos converter para JavaScript, o **babel-preset-env** que define quais as features que iremos transpilar e finalmente o **babel-loader** que nos permite adicionar o suporte do babel ao webpack.

Depois em nosso arquivo de configuração, adicionamos o suporte a qualquer arquivo `.js` da aplicação exceto os arquivos contidos na pasta `node_modules`. Você pode entender melhor sobre a sintaxê de configuração [aqui](http://webpack.github.io/docs/configuration.html).

Com isso já podemos refatorar nosso código utilizando algumas funcionalidades do ES6, como o uso **let** e **const**, **arrow functions**, **template string** e muito mais. Veja alguns exemplos no artigo sobre [como usar ES6](/2015/comecando-com-es6/) ou muitos outros diretamente no [site do babel](https://babeljs.io/learn-es2015/).

```javascript
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';

const displayTime = () => {
  let time = moment().format('HH:mm:ss');
  $('.clock').html(time);
  setTimeout(displayTime, 1000);
}

const displayLinks = (links) => {
  let list = $(".links ul");
  $.each(links, (name, link) => {
    list.append(`<li><a href="//${link}">${_.capitalize(name)}</a></li>`);
  });
}

$(document).ready(() => {
    console.log( "Hello World!" );

    let links = {
      google: 'google.com',
      facebook: 'facebook.com',
      twitter: 'twitter.com'
    };

    displayTime();
    displayLinks(links);
});
```

## Utilize NPM Scripts a seu favor

Agora que tudo esta funcionando e já podemos parar de escrever JavaScript/jQuery como se estivéssemos na idade da pedra, que tal utilizarmos os **npm scripts** ao nosso favor?

Seria muito bom não precisar executar o comando `build` sempre, ou não precisar atualizar o nosso navegador?

Vamos primeiro resolver a parte de atualizar o navegador com o `webpack-dev-server` e em seguida vamos criar alguns comandos úteis em nossos scripts:

```bash
npm install webpack-dev-server --save-dev 
```

E vamos agora adicionar os seguintes comandos em nosso `package.json`:

```json
// package.json
{
  ...
  "scripts": {
    "build": "webpack --progress -p",
    "watch": "webpack --progress --watch",
    "server": "webpack-dev-server --open",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
```

Simplificando:

- **build**: Compila todo o projeto nos dá a opção de adicionarmos configurações personalizadas para produção como adicionar um *hash* de versão em nossos arquivos estáticos e até mesmo minificar nossos arquivos JavaScript.
- **watch**: Como o próprio nome já diz, fica verificando por modificações em nossos arquivos JavaScript e compila tudo novamente a cada modificação.
- **server**: Com um nome auto explicativo, cria um pequeno webserver que irá abrir a pasta raiz onde temos o arquivo `index.html` em `localhost:8080` e que atualizará o navegador toda vez que atualizarmos nossos arquivos JavaScript.

A *flag* `--progress` serve para adicionar informação durante o processo do build, pode não parecer grande coisa, porem quando temos projetos com muitos arquivos JavaScript, é sempre bom ter um feedback sobre o tempo/progresso do build.

Você pode aprender mais sobre tudo o que disse simplesmente lendo a [documentação de desenvolvimento](https://webpack.js.org/guides/development/) do **webpack** que é simplesmente fantástica e tem vários outros exemplos.

## Conclusão

Utilizar novas features do JavaScript não é algo do futuro, isso é o agora, ainda mais dada a evolução das novas features que estão saindo todos os anos, e trabalhar com um fluxo de desenvolvimento antigo e engessado não é nada legal. Ao menos com isso você agora pode trabalhar com bibliotecas ou frameworks simplesmente importando os módulos diretamente do **npm**, criar seus próprios módulos para ajudar na organização/modularização da sua aplicação e realizar suas tarefas com **npm scripts**.

Penso que isso é tudo o que gostaria de compartilhar com vocês, este artigo é algo simples e creio que vai ajudar alguns desenvolvedores que por hora não veem como utilizar novas tecnologias em seus projetos ou simplesmente pensam que não é possível.

Você ainda pode fazer muito mais como adicionar automaticamente os arquivos estáticos do seu projeto diretamente no seu HTML, compilar arquivos Sass para CSS, etc.

Veja [esta talk](https://www.youtube.com/watch?v=0RYETb9YVrk) da [@k88hudson](https://twitter.com/k88hudson) na [Nordic.js](http://nordicjs.com/) de 2015 onde ela explica isso e muito mais sobre como automatizar nosso processo de front-end.

Até mais.

<div class="iframe-wrap">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0RYETb9YVrk" frameborder="0" allowfullscreen></iframe>
</div>