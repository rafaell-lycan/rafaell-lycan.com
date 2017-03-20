---
layout: post
title:  "AngularJS: Definindo rotas com com ngRoute e UI-Router"
date:   2015-04-28
tags: angular
<!-- image: assets/img/posts/angularjs-restful.jpg -->
keywords:
resumo: >
  Quando falamos em SPA's (Single page applications) quer dizer que temos uma aplicação única de diversas páginas que serão carregadas devido a ações do usuário. Mas afinal como fazer isso com AngularJS?

related:
  - title : Routing & Multiple Views
    url: https://docs.angularjs.org/tutorial/step_09
  - title : Nested Views, Routing, And Deep Linking With AngularJS
    url: http://www.bennadel.com/blog/2441-nested-views-routing-and-deep-linking-with-angularjs.htm
  - title : Single Page Apps with AngularJS Routing and Templating
    url: https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
  - title : AngularJS Routing Using UI-Router
    url: https://scotch.io/tutorials/angular-routing-using-ui-router
---
SPA's (Single page applications) estão cada dia mais popular. Aplicações inteiras baseadas em single pages utilizando comportamentos e navegando entre views de uma forma dinâmica e rapida. Angular nos ajuda a criar aplicações desse porte facilmente.

Trabalhando com SPA's a algum tempo, normalmente nos deparamos com rotas e views em nossa aplicação como home, sobre e contato. Isso é muito normal entre SPA's e com nossa aplicação ira crescer e nós precisamos gerenciar de alguma forma, como apresentar diferentes views para o usuário através de nossa aplicação.

Com Angular podemos avançar muito mais que isso, mas esse não é o contexto desse post, vamos estudar alguns dos conceitos que são necessários para desenvolver grandes aplicações utilizando o melhor do framework.

Vamos aos objetivos desse tutorial (ou ao menos o que vou tentar exemplificar):

- Criar uma estrutura básica para nossa SPA;
- Navegar entre views utilizando a diretiva `ng-view` e o módulo `ngRoute`;
- Diferentes tipos de informações para cada página;
- Diferenças entre [ngRoute](https://docs.angularjs.org/api/ngRoute/) e [UI-Router](https://github.com/angular-ui/ui-router).

A primeira coisa que devemos fazer é definir nossa estrutura de arquivos e carregar a view padrão da nossa aplicação.

## Estrutura de arquivos
{% highlight javascript %}
- script.js          // Onde sera armazenado nossa aplicação
- index.html         // Layout principal
- pages              // Onde ficará localizado nossas páginas
----- home.html
----- about.html
----- contact.html
{% endhighlight %}

## Criando nosso HTML
Em nosso arquivo `index.html`, vou utilizar o [Bootstrap](http://getbootstrap.com/) apenas para termos uma cara mais amigável:
{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app="myapp">
<head>
  <meta charset="UTF-8">
  <title>ngRoute</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">ngRoute</a>
      </div>
      <div>
        <ul class="nav navbar-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <ng-view></ng-view>

</body>
</html>
{% endhighlight %}

Até aqui temos apenas uma coisa nova, o `ng-view` que é o container onde o nosso conteúdo será renderizado, ele funciona como um include gerenciando nossas páginas de acordo com a URL atual. Em outras palavras ele carrega a view baseada na configuração do nosso router e injeta no lugar da diretiva. Você também deve ter percebido que adicionamos mais uma script a nossa aplicação, o `angular-route.js`. Nas primeiras versões do Angular, todos os componentes era acoplados no mesmo arquivo, o que fazia ele ficar muito grande para aplicações simples. A partir da versão 1.2 cada módulo é um script separado, o que nos permite injetar apenas o que realmente iremos utilizar em nossa aplicação.

## Nossa aplicação Angular
{% highlight javascript %}
var app = angular
  .module('myapp', [
    'ngRoute'
  ]);

// Definindo Rotas
app.config(function($routeProvider){
  $routeProvider
    .when("/", {
      template:"<h1>Home Page</h1>"
    })
    .otherwise({redirectTo: '/'});
});
{% endhighlight %}

Pronto, já conseguimos visualizar o titulo "Home Page" que acabamos de definir utilizando `$routeProvider` que nos permite configurar nosso serviço `$route` na etapa de configuração da aplicação. Com o `$routeProvider` podemos ir ainda mais longe, habilitando o [History API](http://diveintohtml5.info/history.html) do HTML5, injetar controllers especificos para cada página e muito mais.

Existem dois métodos que o `$routeProvider` nos fornece para configuração de rotas: `when` que recebe dois parametros sendo uma string com a URL especiica e um objeto de configuração para aquela rota; e `otherwise` que funciona similar a um `else` caso a condição não seja satisfeita informamos uma rota já definida para redirecionar o usuário (home/404/etc).

As opções de configuração mais comuns do método `when` são:

- **controller**: Que pode receber uma string de um controller definido na aplicação ou pode ser uma função de definição de um controller;
- **template**: Uma string definindo um template simples em nossa página como vimos no exemplo anterior;
- **templateUrl**: Que é o path de uma view especifica em nossa aplicação que sera carregada através de uma solicitação [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)).

Vamos continuar brincando, agora definindo também um controller para podermos colocar mais informações em nossas páginas e criar uma nova rota, apenas para testes:

{% highlight javascript %}
/*...*/
.when("/users/:id", {
  controller: "UserController",
  template:"<h1>Hello {{name}}</h1>"
})
/*...*/

app.controller('UserController', function($scope, $routeParams) {
  // Vamos imaginar que a URL acessada foi /users/rafaell
  $scope.name = $routeParams.id;
});
{% endhighlight %}

Neste exemplo pegamos via `$routeParams` o parâmetro `:id` via URL e mostramos ao usuário a mensagem "Hello rafaell" através do objeto `$scope` no `UserController`.

O legal do `$routeParams` é que podemos ter N parametros informados via URL como por exemplo `/books/:author/:title`, pegar ambas as informações e fazer algo com elas.

Para finalizar nosso exemplo, vamos nossas views:

{% highlight html %}
<!-- home.html -->
<div class="jumbotron text-center">
  <h1>Home Page</h1>
  <p>{{ message }}</p>
</div>

<!-- about.html -->
<div class="jumbotron text-center">
  <h1>About Page</h1>
  <p>{{ message }}</p>
</div>

<!-- contact.html -->
<div class="jumbotron text-center">
  <h1>Contact Page</h1>
  <p>{{ message }}</p>
</div>
{% endhighlight %}

{% highlight javascript %}
/*...*/
.when('/', {
  templateUrl : 'pages/home.html',
  controller  : 'HomeController'
})
.when('/about', {
  templateUrl : 'pages/about.html',
  controller  : 'AboutController'
})
.when('/contact', {
  templateUrl : 'pages/contact.html',
  controller  : 'ContactController'
})
/*...*/

app.controller('HomeController', function($scope) {
  $scope.message = 'Routing pages with ngRoute is damn awesome!';
});

app.controller('AboutController', function($scope) {
  $scope.message = 'You can see more about ngRoute in the oficial website.';
});

app.controller('ContactController', function($scope) {
  $scope.message = 'No. :P';
});

{% endhighlight %}

Para finalizarmos, vamos setar as rotas em nossa navbar:

{% highlight html %}
<ul class="nav navbar-nav navbar-right">
    <li><a href="#/">Home</a></li>
    <li><a href="#/about">Sobre</a></li>
    <li><a href="#/contact">Contato</a></li>
  </ul>
</div>
{% endhighlight %}

Sim, é estranho utilizar esse `#` também conhecido como **hash** ou **hashbang**, é quem determina qual página esta sendo chamada, isso quer dizer que `/#about` e `/index.html#about` são a mesma coisa, já que o index é o arquivo principal da nossa aplicação e gerencia as views através do nosso router.

Eu sei que pode parecer um tanto estranho utilizar desta forma, mas existe um modo para desabilitarmos o **hashbang** de nossa aplicação:

##  Habilitando o Modo HTML5
Sem dúvidas a primeira coisa e a mais simples para se fazer em nossa aplicação é configurar o `$locationProvider`. Isso vai permitir ativar `html5Mode`, o que também nos força a trocar nossos links da navbar para urls relativas e adicionar `<base>` tag a nossa `<head>`.

{% highlight javascript %}
app.config(function($routeProvider, $locationProvider) {
  // Utilizando o HTML5 History API
  $locationProvider.html5Mode(true);

  /* ... */
});
{% endhighlight %}

{% highlight html %}
<!-- Head -->
  <base href="/">
</head>

<!-- Navbar -->
<ul class="nav navbar-nav navbar-right">
    <li><a href="/">Home</a></li>
    <li><a href="/about">Sobre</a></li>
    <li><a href="/contact">Contato</a></li>
  </ul>
</div>
{% endhighlight %}

Isso força o browser a entender qual é a URL base da aplicação que o documento atual pertence, ou seja, o endereço relativo ao documento atual. Caso seu path não seja o root da aplicação, você deve informar o caminho até seu arquivo index, por exemplo `/myapp` para utiliza-lo como seu base path.

Não se preocupe, pois o **$location service** gera fallback para browsers que não suportam o History API utilizando **hashbang** novamente. Você pode verificar isso na [documentação oficial](http://docs.angularjs.org/guide/dev_guide.services.$location).

## Configurando Rewrite no Apache
Agora basta direcionarmos o acesso da nossa aplicação para o index de nossa página, para isso podemos apenas criar um arquivo `.htaccess` na raiz da nossa aplicação e pronto!

{% highlight bash %}
RewriteEngine On
  # If an existing asset or directory is requested go to it as it is
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^ - [L]

  # If the requested resource doesn't exist, use index.html
  RewriteRule ^ /index.html
{% endhighlight %}

O mesmo pode ser feito na configuração de um Virtual Host no [Apache](http://httpd.apache.org/) ou no [Nginx](http://nginx.org/).

## Mudando as coisas com UI-Router
Agora chegou a hora de falar de coisa legal, mesmo que o **ngRoute** faça muito bem o papel dele, as vezes vamos precisar de um plus de configuração, ou de algumas outras coisas imbutidas que esse módulo não pode nos fornecer. **#chatiado**

Quando falamos de SPA's, roteamento sem dúvidas é uma das partes mais importantes da nossa aplicação. Mas esta na hora de colocarmos alguns esteroides usando o [UI-Router](https://github.com/angular-ui/ui-router).

Este foi um dos módulos desenvolvidos pelo time do [AngularUI](http://angular-ui.github.io/) que nos permite fazer as mesmas coisas que o módulo anterior, porem de uma maneira diferente baseado no estado do aplicação e não apenas a rota atual.

**WAT?!**

Quando pensamos em **Estados da aplicação" vs. "Rotas de URL" temos uma visão e modos diferentes para utilizar nossas views, mudando não apenas o que esta dentro do container do router, mas também partes especificas da nossa aplicação sem adicionar nenhuma mudança a rota atual.

De maneira groceira podemos pensar que funciona semelhante ao [ng-inlude](https://docs.angularjs.org/api/ng/directive/ngInclude), porem de forma muito mais simples e dinâmica.

**Chega de papo, vamos mudar um pouco nossa aplicação utilizando agora o UI-Router.**

{% highlight html %}
<!-- index.html -->

<!DOCTYPE html>
<html lang="en" ng-app="myapp">
<head>
  <meta charset="UTF-8">
  <title>ngRoute</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">ngRoute</a>
      </div>
      <div>
        <ul class="nav navbar-nav">
          <li><a ui-sref="home">Home</a></li>
          <li><a ui-sref="about">Sobre</a></li>
          <li><a ui-sref="contact">Contato</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div ui-view></div>

</body>
</html>
{% endhighlight %}

Sim, este é todo o código que precisamos escrever para adaptarmos nosso código ao UI-Router.

- Adicionamos o script do módulo `ui-router` no lugar do `angular-router`;
- Quando queremos criar um link com o UI-Router, utilizamos `ui-sref`. Isso irá gerar o **href** para o estado que foi definido para aquela rota;
- Também utilizamos `<ui-view>` ao invés de `<ng-view>`

Agora vamos modificar nossa aplicação:

{% highlight javascript %}
//script.js

var app = angular
  .module('myapp', [
    'ui.router'
  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'AboutController'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html',
      controller: 'ContactController'
    });

    // Utilizando o HTML5 History API
    $locationProvider.html5Mode(true);
});

/* ... */
{% endhighlight %}

**Pronto!** Vejamos as mudanças para adequar nosso código utilizando UI-Router:

- Primeiramente injetamos o módulo `ui.router` como dependencia da nossa aplicação;
- Depois utilizando `$urlRouterProvider`, definimos uma rota padrão para nossa aplicação caso nenhuma outra rota seja satisfeita;
- Por fim, utilizando `$stateProvider`, declaramos alguns "estados" através do método `.state` que recebe dois parametros: O primeiro sendo o nome da nossa rota, e o segundo é um objeto de configuração onde podemos definir algumas coisas como **url**, **template**, **templateUrl**, **controller** e acreditem, muito mais.

Uma coisa legal de se fazer é trabalhar com o que chamamos de **nested views**, que básicamente é uma das features mais interessantes do **UI-Router** depois de **named routes**, o que nos permite gerenciar views em uma parte especifica de nossa página sem ser necessário qualquer mudança em nossa URL. Infelizmente não vou entrar muito afundo neste post, pois no caso jã esta muito tarde e eu preciso dormir logo.

Ah! Uma outra coisa legal, é que também podemos utilizar a diretiva `ui-view` que funciona semelhante ao `ng-include`, com a diferença que os partials a serem carregados precisam ser definidos na configuração do estado daquela rota.

Exemplo:

{% highlight html %}
<!-- contact.html -->

<div class="jumbotron text-center">
  <h1>Contact Page</h1>
  <p>{{ message }}</p>
</div>

<div class="row">

  <div class="col-sm-8">
      <div ui-view="form"></div>
  </div>

  <div class="col-sm-4">
      <div ui-view="maps"></div>
  </div>

</div>
{% endhighlight %}

{% highlight javascript %}
/* ... */

.state('contact', {
  url: '/contact',
  controller: 'ContactController',
  views: {
    '': { templateUrl: 'contact.html' },
    'maps@contact': { template: '<form></form>' },
    'form@contact': {
      templateUrl: 'contact-form.html',
      controller: 'ContactFormController'
    }
});

/* ... */
{% endhighlight %}

Nem preciso citar vantagens certo? Ok, vamos listar alguns pontos:

- A **view default** onde as outras serão carregadas, recebe uma **chave vazia** no objeto views;
- Todas as nest views precisam ter o prefixo **name@routeName** (chave@name da rota) para funcionar corretamente;
- Cada partial, pode receber um controller independente, o que facilita ainda mais a modularização da aplicação e testes;
- Se for utilizar nested views, esqueça sobre **templateUrl** fora do contexto do objeto **views**;
- Caso na hora de rodar no browser você receber um erro no console, não se preocupe, isso aconteceu comigo também, provavelmente foi algo fora do que esta definido acima, mas você pode dar uma olhada na [documentação oficial](https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views).

## Conclusão
Estes foram exemplos bem simples, mas acredito que possa ajudar você. Conceitos básicos de views e router utilizando o **ngRoute** e **UI-Router** por mais que sejam superficiais, servem como norte para aprender cada vez mais, basta correr atrás. Existem muitas outras coisas bem mais avançadas no mundo Angular.

Se alguem quiser sugerir algum tópico sobre Angular ou até mesmo tenha alguma dúvida em que eu possa ajudar, basta informar nos comentários que irei formular algo para poder te ajudar.

## --UPDATE--
Os exemplos de código utilizados neste post estão disponíveis neste [Plunker](http://plnkr.co/edit/6UnFgWMUU21ANuvCib3T) utilizando **ngRoute** e [aqui](http://plnkr.co/edit/3QTdYSLCiPTIKiTmhbd3) utilizando **UI-Router**, porem eles não funcionam no modo HTML5 por conta do base path, porem você pode baixa-los sem problemas.
