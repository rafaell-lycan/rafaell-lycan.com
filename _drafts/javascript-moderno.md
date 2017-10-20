---
title: "JavaScript Morderno: O que você está esperando?"
---

Eu recebi um email a 2 semanas atrás que me fez refletir um pouco sobre o cenário atual do JavaScript e como pequenas estão se adequando ~~ou não~~ ao atual cenário.

Eu não posso/não estou autorizado a divulgar o nome do leitor, mas quero que ele saiba que eu estou feliz de termos trocado emails nesta ultima semana.

Em resumo é o cenário de empresas pequenas e agencias de publicidade, onde não precisam utilizar tecnologias novas pois na maioria das vezes o velho [jQuery]() em conjunto com o [Wordpress]() resolve todos os problemas.

Eu não acho isso ruim, mas acho que as pessoas tem uma ideia mal formada sobre o cenário atual e de como podem começar a utilizar novas tecnologias hoje mesmo sem depender de frameworks como Angular 2, React, etc.

## Prologo

Aprender JavaScript hoje em dia não é uma tarefa fácil, especialmente as coisas mais novas como novas funcionalidades graças ao ES6/7 e um vasto mundo de bibliotecas e frameworks. Tudo muda tão rápido que é muito dificil se manter atualizado ou entender quais os problemas que uma nova feature pode resolver.

Eu comecei a programar de fato em 2009/2010 mas só me importei de aprender JavaScript de verdade em 2014 enquanto estudava [BackboneJS]() para um projeto.

Não é muito tempo, mas até então eu só conhecia algumas magias de jQuery e o básico da linguagem JavaScript, mas então escrever código modular inicialmente com [RequireJS]() e depois disso conhecer o [Browserify](http://browserify.org/).

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

Sempre tinhamos que seguir as ordem dos arquivos e depois de um certo tempo tinhamos vários importes na página. Para deixarmos as coisas mais claras, vamos adicionar algumas bibliotecas a mais como [moment.js]() para formatarmos e manipularmos datas de uma forma simples e o [lodash]() que possui uma gama de helpers.

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

Até então esse é um código simples, mas o objetivo aqui é mostrar como faziamos sites antigamente com bibliotecas JavaScript.

A parte boa é que esta simples suficient para entender, já a parte ruim seria toda hora termos que adicionar uma nova biblioteca em uma versão especifica, tirando o fato de deixarmos o projeto atualizado.

## Gerenciadores de pacotes

Com o tempo começaram a aparecer os gerenciadores de pacotes, acredito que quando comecei, os mais famosos eram o [NPM](https://www.npmjs.com/) e o [Bower](https://bower.io/), especialmente para se trabalhar com [Yeoman](http://yeoman.io/). Claro, isso foi algo entre 2012 e 2013, após o meu primeiro evento de tecnologia, o [Tableless Conference](https://tableless.com.br/tablelessconf/).

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

Isso é realmente útil, já que podemos uitilizar uma versão especifica da jQuery se for necessário por conta de algum plugin, além de não precisarmos baixar as dependências manualmente e colocarmos em nosso projeto, porem ainda será necessário adicionarmos as bibliotecas manualmente em nosso arquivo `.html`.

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

Automatizar processos é uma parte que nos custa um certo tempo no inicio, sempre é necessário preparar o setup inicial, mas depois de todo esse esforço vem a recompensa de não realizar tarefas repetitivas.

Como muitas linguagens de programação suportam importar um trecho de código dentro de um arquivo, no inicio o JavaScript não suportava tal funcionalidade por ter sido desenvolvido para funcionar unicamente nos browsers, logo organizar códigos JavaScript e separalos em módulos não era a coisa mais fácil ou mais bonita de ser fazer no mundo, mas era possivel, mas isso foi a muito tempo atrás, graças ao projeto **CommonJS** que trouxe a especificação dos módulos para se trabalhar com **Node.js**, onde era possóvel importar módulos de terceiros para nossos projetos e criar os nossos proprios.

Depois com ferramentas como as que citei a cima e **module loaders** como o **Browserify** tudo se tornou mais fácil, onde ao invés de termos que declarar em um arquivo todo o caminho, podiamos utilizar apenas o nome do módulo que tudo se resolvia, onde ao invés disso: `require('./node_modules/moment/min/moment.min.js)`, podemos simplesmente escrever `require('moment')`.

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

Article
https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70

Talks
https://speakerdeck.com/danielknell/modern-javascript
https://speakerdeck.com/lawren/javascript-design-patterns
