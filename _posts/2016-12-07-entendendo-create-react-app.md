---
layout: post
title:  'Entendendo create-react-app'
date:   2016-12-07
categories: javascript
tags: react javascript
keywords:
description: >
  Começar uma aplicação react sempre foi um pouco complicado. Eu poderia estar brincando dizendo isso no meu blog ou no meu twitter, mas é uma realidade. O time de desenvolvimento do React sabe que esta é uma dor para toda a comunidade e resolveram criar o create-react-app.
---

Começar uma aplicação react sempre foi um pouco complicado. Eu poderia estar brincando dizendo isso no meu blog ou no meu twitter, mas é uma realidade. O time de desenvolvimento do React sabe que esta é uma dor para toda a comunidade e resolveram criar o [create-react-app](https://github.com/facebookincubator/create-react-app).

Mas eu venho acompanhando alguns projetos de "starter-kit" nos ultimos meses, e você provavelmente deve estar se perguntando **se este é um verdadeiro starter-kit**.

> Sera que o Facebook's starter-kit fará todos os outros obsoletos?

Em uma comparação com o top 5 que temos disponiveis hoje para começar um novo projeto, o cenário atual é este:

<div class="center">
  <img src="/assets/img/posts/starter-star-trend.png" alt="Github Stars Graph">
</div>

1. [facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app) com **16241**
1. [kriasoft/react-starter-kit](https://github.com/kriasoft/react-starter-kit) com **11860**
1. [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate) com **10772**
1. [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) com **8225**
1. [davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) com **6978**

Wow. São muitas estrelas, e isso fez com que o create-react-app tenha crescido rapidamente para #1 posição.

Provavelmente muitas dessas estrelas tenham vindas por ser um projeto do Facebook, etc. Mas enfim, vamos dar uma olhada no projeto e ver como as coisas funcionam.

## O que faz create-react-app melhor?

A maioria dos projetos lhe aconselha a **clonar o repositório** para começar.

Isso gera algumas desvantagens:

- Quando o projeto é atualizado, você provavelmente não tera essas atualizações;
- Seu projeto começa com pelomenos 50-100 dependencias para gerenciar e manter atualizadas;
- Seu projeto é um boilerplate com uma configuração um tanto complexa.

**create-react-app** funciona um pouco diferente.

Quando você cria um novo projeto, você adiciona apenas uma única dependencia, o pacote **react-scripts**.

O pacote `react-scripts` contem tudo o que você precisa como uma sub-dependencia do seu projeto. Isso significa que ele é muito menor, limpo, fácil de ler e com um boilerplate muito menor.

## Ferramentas

**create-react-app** é baseado em várias outras ferramentas, sendo as principais:

- Webpack
- Babel
- PostCSS w/ Autoprefixer
- Jest
- Flow (opcional)

Se você não curte nenhuma das tecnologias acima, isso é um incentivo para não utilizar `create-react-app`.

Vamos para o passo-a-passo e começar uma nova aplicação utilizando essa nova ferramenta.

First install create-react-app as a global library.

Primeiramente precisamos instalar `create-react-app` globalmente:

{% highlight bash %}
npm install -g create-react-app  
{% endhighlight %}

Agora para criar uma aplicação, utilizamos o comando `create-react-app <app-name>`. Eu vou chamar a aplicação deste post de 'react-app'. Então o meu comando sera o seguinte:

{% highlight bash %}
create-react-app react-app  
{% endhighlight %}

Agora nós vamos ter que aguardar alguns segundos enquanto o npm baixa todas as dependencias. Uma vez que o processo tenha acabado é como mágica, tudo o que você precisa fazer é rodar sua aplicação:

{% highlight bash %}
cd react-app  
npm start 
{% endhighlight %}

Se você seguiu todas essas etapas você deve ver seu aplicativo rodando.

<div class="center">
  <img src="/assets/img/posts/create-react-app-hello-world.png" alt="React App running">
</div>


A aplicação criada é bem simples. Ela esconde os detalhes do aplicação muito bem.

Dentro do projeto nós temoas uma estrutura como esta:

{% highlight bash %}
react-app/
  README.md
  index.html
  favicon.ico
  node_modules/
  package.json
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg
{% endhighlight %}

e um package.json muito pequeno:

{% highlight json %}
{
  "name": "react-app",
  "version": "0.1.0",
  "private": true,
  "devDependencies": {
    "react-scripts": "0.8.2"
  },
  "dependencies": {
    "react": "^15.4.1",
    "react-dom": "^15.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
{% endhighlight %}

Você provavelmente notou que temos **quatro comandos** em scripts: `start`, `build`, `test` e `eject`.

**start** é o que você provavelmente esta familiar. Ele irá rodar a sua aplicação localmente no endereço `localhost:3000`.

**build** como o nome já diz, vai preparar sua aplicação corretamente para produção (modificando NODE_ENV para "production"), minificando seu código e adicionando e adicionando **hash** da revisão onde tudo será disponibilizado na pasta **build**. Você pode disponibilizar os arquivos estáticos onde bem quiser (como o S3). Você pode levar mais sobre isso no repositório do projeto para saber mais.

**test** assim como o nome diz, vai rodar a suite de testes criadas em sua aplicação utilizando Jest. 

**eject** é o mais interessante. O time do react provavelmente são bem espertos, pois eles não querem que você fique preso em uma configuração especifica durante o desenvolvimento do seu projeto e por conta disso você pode "ejetar" a qualquer momento. Isso trás toda a parte que esta contida em `react-scripts` para a raiz do seu projeto, permitindo assim que você possa configurar toda a sua aplicação como bem entender.

**Contudo**, `eject` é uma viagem única, sendo que uma vez executado você não poderá voltar atrás.

Para ver como isso funcina, se você executar `npm run eject`, seu package.json vai mudar para do código anterior para este:

{% highlight json %}
{
  "name": "react-app",
  "version": "0.1.0",
  "private": true,
  "devDependencies": {
    "autoprefixer": "6.5.1",
    "babel-core": "6.17.0",
    "babel-eslint": "7.0.0",
    "babel-jest": "17.0.2",
    "babel-loader": "6.2.7",
    "babel-preset-react-app": "^2.0.1",
    "case-sensitive-paths-webpack-plugin": "1.1.4",
    "chalk": "1.1.3",
    "connect-history-api-fallback": "1.3.0",
    "cross-spawn": "4.0.2",
    "css-loader": "0.26.0",
    "detect-port": "1.0.1",
    "dotenv": "2.0.0",
    "eslint": "3.8.1",
    "eslint-config-react-app": "^0.5.0",
    "eslint-loader": "1.6.0",
    "eslint-plugin-flowtype": "2.21.0",
    "eslint-plugin-import": "2.0.1",
    "eslint-plugin-jsx-a11y": "2.2.3",
    "eslint-plugin-react": "6.4.1",
    "extract-text-webpack-plugin": "1.0.1",
    "file-loader": "0.9.0",
    "filesize": "3.3.0",
    "fs-extra": "0.30.0",
    "gzip-size": "3.0.0",
    "html-webpack-plugin": "2.24.0",
    "http-proxy-middleware": "0.17.2",
    "jest": "17.0.2",
    "json-loader": "0.5.4",
    "object-assign": "4.1.0",
    "path-exists": "2.1.0",
    "postcss-loader": "1.0.0",
    "promise": "7.1.1",
    "react-dev-utils": "^0.4.1",
    "recursive-readdir": "2.1.0",
    "strip-ansi": "3.0.1",
    "style-loader": "0.13.1",
    "url-loader": "0.5.7",
    "webpack": "1.14.0",
    "webpack-dev-server": "1.16.2",
    "webpack-manifest-plugin": "1.1.0",
    "webpack-subresource-integrity": "0.7.0",
    "whatwg-fetch": "1.0.0"
  },
  "dependencies": {
    "react": "^15.4.1",
    "react-dom": "^15.4.1"
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}"
    ],
    "setupFiles": [
      "<rootDir>/config/polyfills.js"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>[/\\\\](build|docs|node_modules)[/\\\\]"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    "transform": {
      "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ]
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "eslintConfig": {
    "extends": "react-app"
  }
}
{% endhighlight %}

e nossa estrutura de pastas agora vai ficar como estas:

{% highlight bash %}
react-app/
  README.md
  index.html
  favicon.ico
  node_modules/
  package.json
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg
 scripts/
    build.js
    start.js
    test.js
 config/
    env.js
    jest/
        cssTransform.js
        fileTransform.js
    path.js
    polyfills.js
    webpack.config.dev.js
    webpack.config.prod.js
{% endhighlight %}

## O lado bom

react-create-app é ótimo para iniciantes por:

- começar um projeto React imediatamente;
- Sem configuração do webpack: uma coisa a menos para aprender no começo;
- Sem configuração do Babel: idem;
- Poucas dependencias para gerenciar.

Já suporta ES6 e algumas especificações do ES7, lint, tests, build, e até deploy para o GitHub pages todo configurado.

Todos os comandos possuem uma saida amigável que até parece uma brisa suavel para os novatos.

## O lado ruim

Um projeto tão simples não vem com algumas coisas ruins também.

A peça mais intrigante para mim foram a falta dos pré-processadores CSS. Isso significa:

- Sem LESS;
- Sem Sass;
- Sem CSS Modules;
- Sem PostCSS plugins (exceto autoprefixer, que já esta incluso)

Se você quiser utilizar um algo a mais na sua aplicação, você tem que "ejetar" e então configurar você mesmo.

Então é ótimo ter esta opção, mas se você fizer isso ficará com todas as desvantagens de qualquer outros starter-kit (muitas dependências, boilerplate de configuração, sem receber atualizações do projeto).

Se você é um novato e você ejetar você pode ter um choque. Seu projeto irá de 3 dependências para 49 dependências.

Ainda assim, se você comparar o projeto ejetado com algum outro starter-kit, ainda assim é um bom começo. Ele ejeta dois arquivos de configuração para o webpack com cerca de 200 linhas cada. Isso pode soar longo, mas eles cheios de comentários explicativos, que são de acordo com um novato (eu) **melhor que a documentação do Webpack** <del>pronto falei</del>.

## Conclusão

Minha recomentação é a seguinte:

**Se você é um iniciante**, utilize esta ferramenta. Ela vai livrar de muitas dores de cabeça. Você vai ter que escrever CSS sem um pré-processador mas vale a pena.

Lide com o fato que não á pré-processadores CSS. Construa algo legal. Faça deploy. Compartilhe com seus amigos.

Se e quando você **ejetar**, pense nisso como uma nova aprendizagem. Comece até algo novo para aprender o Webpack, ou pelo menos entenda os conceitos básicos de cada parte.

**Se você já é avançado**, **create-react-app** pode ser mais legal para você começar pequenos projetos. Talvez você sinta falta do seu pré-processador CSS favorito.

Mas para usuários avançados, utilizar um projeto **ejetado** como ponto de partida também é uma ótima opção.

