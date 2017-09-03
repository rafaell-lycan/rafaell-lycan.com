---
layout: post
title:  "Começando com Angular.JS"
date:   2014-08-16
tags: angular
image: assets/img/posts/comecando-com-angular.jpg
keywords:
resumo: >
  Alguns meses estudando Angular.js e finalmente depois de começar um projeto utilizando-o, apresento a vocês os conceitos básicos do framework e como é fácil criar aplicações utilizando toda a simplicidade e melhorando nosso workflow.
related:
  - title: PhoneCat Tutorial App
    url: https://docs.angularjs.org/tutorial
  - title: Shaping up with Angular.js - CodeSchool
    url: https://www.codeschool.com/courses/shaping-up-with-angular-js
  - title: 5 Awesome AngularJS Features - Tuts+
    url: http://code.tutsplus.com/tutorials/5-awesome-angularjs-features--net-25651
  - title: AngularJS Fundamentals In 60-ish Minutes - Youtube
    url: https://www.youtube.com/watch?v=i9MHigUZKEM
  - title: Introdução ao AngularJS - Youtube
    url: https://www.youtube.com/watch?v=iCQ3qic_nGg
---
**[Angular.js](http://backbonejs.org/)** é o mais novo framework do time de desenvolvimento do Google para a criação de SPA's (Single Page Applications) de maneira simplificada.

Confesso que sair de **[Backbone.js](https://angularjs.org/)** e ir para um framework com um paradigma totalmente diferente foi uma completa bagunça no inicio, mas depois de um tempo e tendo prazos para entregar um projeto, achei o resultado muito bom.

## O Hello World Obrigatório
Vamos criar um arquivo `index.html` onde vamos rodar a nossa aplicação.
{% highlight html %}
<html ng-app>
    <head>
        <title>Hello Angular</title>
        <script src="https://code.angularjs.org/1.2.6/angular.js"></script>
    </head>
    <body>
    </body>
</html>
{% endhighlight %}

Isso é tudo o que precisamos para começar uma aplicação utilizando **AngularJS** de fato adicionando o script e claro a **diretiva** ***ng-app***. No Angular quase tudo é encapsulado nessas chamadas diretivas, que nada mais são do que **syntax sugar** para dar poder ao vocabulário HTML. Ao declarar a propriedade **ng-app** estamos informando ao Angular que nossa aplicação será iniciada a partir daquele ponto da página, como se fosse a raiz da aplicação.

Uma Dica é que tudo o que formos utilizar a partir de agora, usaremos as tais **diretivas** para informar ou declarar algo para o framework.

Eu comecei vendo exemplos como este, e quero mostrar que sem escrever nenhum código JavaScript em nossa página, é possível ter um exemplo simples de como o Angular trabalha.
{% highlight html %}
<html ng-app>
    <head>
        <title>Hello Angular</title>
        <script src="https://code.angularjs.org/1.2.6/angular.js"></script>
    </head>
    <body>
        <input type="text" ng-model="nome">
        <p>Olá {% raw %}{{ nome }}{% endraw %}</p>
    </body>
</html>
{% endhighlight %}

Perceba que não foi escrito nenhuma linha de JavaScript até agora, e já conseguimos ter um texto que responde ao conteúdo digitado no nosso input.

Em partes o **ng-model** é uma outra diretiva utilizada como atributos em elementos e esta esta diretamente plugada a uma propriedade (nesse caso *nome*) através do que é chamado **two-way binding**. A parte onde vemos as chaves **{% raw %}{{ }}{% endraw %}** é chamado de expressões angular ou **angular expressions**.

Você pode ver este exemplo rodando **[aqui](http://jsfiddle.net/5mfL4zfz/)**, apenas ignore a falta do cabeçalho que foi retirada para não dar conflito no JsFiddle.

Agora chega de coisinhas simples, vamos ao que realmente interessa. Que tal criarmos uma estrutura inicial de um projeto de Todo List e vamos vendo como fazer as coisas passo a passo.

## Estrutura Inicial
Bem, como o projeto é de uma TodoList, vamos começar com um markup inicial bem simples, neste caso vou utilizar o **[Bootstrap](http://getbootstrap.com/)** apenas para o visual não ficar simples de mais, mas sinta-se a vontade para escrever sua própria interface, o importante aqui é mostrar como as coisas podem ser realmente simples desenvolvendo com Angular.js.

{% highlight html %}
<html ng-app>
    <head>
        <title>Todo List</title>
        <script src="https://code.angularjs.org/1.2.6/angular.js"></script>
    </head>
    <body>
      <div class="container">
        <div class="col-md-8 offset-2">
          <h1 class="center">TodoList</h1>
          <form class="add-form">
            <div class="form-group">
              <label>What you want todo?</label>
              <input type="text" name="task" class="form-control" placeholder="Put something..." required="required" /> <br/>
              <button class="btn btn-block btn-success">Add Task</button>
            </div>
          </form>
          <ul class="list-container">
            <li>
              <input type="checkbox"/> Task Name
            </li>
          </ul>
          <button class="btn btn-block btn-danger">Delete Completed Tasks</button>
        </div>
      </div>
    </body>
</html>
{% endhighlight %}

Bem, para sair da mesmisse e não ficar preso apenas ao guide-line do Bootstrap, também escrevi algum CSS para esse exemplo, mas nada que vá resolver os problemas do mundo.

{% highlight css %}
body {
  background: #eee;
  color: #333;
}
h1{
  text-transform: uppercase;
  color: #ddd;
  text-shadow: 2px 2px 0 #ccc;
}
.container{
  margin-bottom:20px;
}
.center{
  text-align: center;
}
.add-form, .list-container{
  background: #fff;
  padding:20px;
}
.list-container{
  margin: 20px 0;
  padding: 0;
}
.list-container li{
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px dashed #ddd;
  list-style: none;
}
.list-container li:last-child{
  border: none;
}
.list-container input{
  margin: 5px 10px;
}
.completed{
  text-decoration: line-through;
  font-size:.8em;
  color: #999;
}
.progress{
  max-height: 10px;
  margin:20px 0 0;
}
{% endhighlight %}

Beleza! Agora que temos um visual mais OK para nosso formulário, chegou a hora da verdade <del>ou não</del>. Vamos escrever nossas primeiras linhas de código JavaScript.

## Módulos
O Angular trabalha com a ideia módulos para definir uma parte da aplicação, mas esses módulos não tem nada haver com Models do **modelo MVC**, para definir um módulo precisamos informar dois parâmetros: O primeiro parametro é o **nome do módulo**; O segundo é um **Array** especificando as dependências do projeto. No nosso caso não temos nenhuma, então basta passar um array vazio.

{% highlight javascript %}
var app = angular.module('todoApp', []);
{% endhighlight %}

Pronto, criamos nosso primeiro módulo, mas mesmo assim ainda falta informarmos em nossa aplicação que ele existe, se não, nada acontece, então a diretiva **ng-app** recebe ele como argumento.

{% highlight html %}
<html ng-app="todoApp">
<!-- Código omitido -->
{% endhighlight %}

## Controllers
Como toda aplicação baseada no conceito **MVC** temos nossos **Controllers**, com angular não é diferente pois ele tem o conceito de **MVVM** (Model-View-ViewModel) ou **MVW** (Model-View-Whatever) o que torna possível modularizar a aplicação da forma que quisermos. Mas enfim, vamos criar nosso primeiro controller com alguma lógica simples assumindo o comportamento e ações baseados em algumas coisas que temos em nosso HTML.

{% highlight javascript %}
{%raw%}app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.todoList = [
        {name: 'Learn Angular', completed: false},
        {name: 'Build a TodoList', completed: true}
    ];

    $scope.addItem = function () {}

    $scope.deleteTasks = function() {}
}]);
{%endraw%}
{% endhighlight %}

Criamos nosso primeiro controller utilizando nossa variável `app`, depois utilizamos assim como na criação de módulos `.controller()` passando também dois parametros certo? O nome do nosso controller e depois um array com as dependencias? Séria isso?

Na verdade não necessariamente, eu poderia simplesmente ter passado a função com **$scope** como dependencia e tudo funcionaria normalmente, mas como somos desenvolvedores, gostamos de automatizar coisas e também gostamos de milisegundos de performance, provavelmente vamos minificar esse código certo? Pois bem, essa é uma técnica para evitar que plugins como o **[Uglify](https://github.com/mishoo/UglifyJS)** troque o nome de nossas dependencias e faça tudo parar de funcionar (Sim, tudo passado por meio da função é uma dependencia do nosso controller), utilizamos essa técnica para informar o nome da **dependencia** e depois dar um **apelido** para ela quando passamos ela para a função.

Poderiamos ter um código assim:
{% highlight javascript %}
{%raw%}app.controller('SomeCtrl', function($scope, DependencyOne, DependencyTwo) {
    // Seu código aqui
});
{%endraw%}
{% endhighlight %}

Isso daria problema com a minificação o **Uglify** por exemplo, porque ele iria substituir o nome das dependências por outros menores. Então para evitar esse problema nós isolamos nossas dependencias dentro de um array, e como último parâmetro passamos uma função que irá utilizar essa **injeção de dependencias**.

Caso você use o **Uglify** o output sera algo assim:
{% highlight javascript %}
{%raw%}app.controller('SomeCtrl', ['$scope', 'DependencyOne', 'DependencyTwo', function(s, a, b) {
    // Seu código aqui
}]);
{%endraw%}
{% endhighlight %}

Entenderam o que quis dizer? Faça isso, tente sempre isolar suas dependencias dessa forma, isso vai lhe poupar trabalho.

*Continuando...*

Vamos analisar o código do nosso controller: Temos na injeção uma dependência chamada **$scope**. que no mundo Angular, é dependencia faz a **ligação** entre o **Controller** e a **View**. Lembra do exemplo de **Hello World**? Imagine que com um controller, poderiamos definir um valor padrão para nome, como por exemplo *"John"*, dessa forma teriamos um valor default em nossa view.

O conceito de $scope pode ser assustador no começo, mas ele é a sua conexão direta com o **DOM** para você poder inserir dados seja através de **expressions**, ou outras diretivas como a **ng-model** por exemplo.

Nesse caso eu apenas atribui uma propriedade chamada **todoList** que nada mais é do que um array com 2 objetos, e dois métodos para remover e adicionar items.

Tudo bem até aqui? Agora chegou a hora de utilizarmos nosso controller dentro em nossa página:
{% highlight html %}
<!-- Código omitido -->
<div class="container">
  <div class="col-md-8 offset-2" ng-controller="MainCtrl">
    <h1 class="center">TodoList</h1>
    <!-- Código omitido -->
  </div>
</div>
<!-- Código omitido -->
{% endhighlight %}

Pronto, agora aprendemos mais uma diretiva para definirmos onde começa o escopo do nosso controller que é a **ng-controller**. Eu digo escopo porque podemos ter mais de um controller em uma página, e isso é perfeitamente normal.

Agora que tal começarmos a descobrir mais diretivas e fazer as coisas a começarem a funcionar? Vamos começar pelo HTML:

{% highlight html %}
<!-- Código omitido -->
<form class="add-form" ng-submit="addItem()">
  <div class="form-group">
    <label>What you want todo?</label>
    <input type="text" name="task" class="form-control" ng-model="task.name" placeholder="Put something..." required="required" /> <br/>
    <button class="btn btn-block btn-success">Add Task</button>
  </div>
</form>
<!-- Código omitido -->
{% endhighlight %}

Agora com poucas mudanças já temos duas diretivas, a **ng-model** que esta definindo um modelo de objeto que iremos mapear e também a diretiva **ng-submit** que recebe nosso método `addItem`. Essa diretiva faz apenas uma coisa: Habilita o bind do Angular no evento submit e evita o evento padrão de enviar o conteúdo do form e atualizar/recarregar a página atual desde que você não tenha atributos como `action`, `data-action` e outros atributos de ação. Em nosso caso dispara o método `addItem`.

Poderiamos passar algo como parametro ao enviar o form e capturar dentro do método, mas não achei necessario por hora. Vamos escrever mais código em nosso controller.

{% highlight javascript %}
{%raw%}
// Código omitido
function Task(){
    this.name = '';
    this.completed = false;
}
$scope.task = new Task();

$scope.addItem = function () {
  $scope.todoList.push($scope.task);
  $scope.task = new Task();
}
// Código omitido
{%endraw%}
{% endhighlight %}

Bem, apenas criei uma função construtora que me devolve um objeto do tipo **Task**, criei uma nova instância de Task na propriedade `task` do nosso $scope que agora esta ligado automaticamente com nossa diretiva **ng-model** no formulário. Também escrevi um código bem simples para inserir um novo item a nossa lista e depois resetando o valor padrão da propriedade `task` com uma nova instância de **Task**.

Agora que tal exibir nossas tasks?

## Exibindo nossas Tasks
{% highlight html %}
<!-- Código omitido -->
<ul class="list-container">
  <li ng-repeat="task in todoList" ng-class="{'completed': task.completed}">
    <input type="checkbox" ng-model="task.completed" />{{task.name}}
  </li>
</ul>
<!-- Código omitido -->
{% endhighlight %}

Novamente por partes:

- Primeiro utilizei a diretiva **ng-repeat** que nada mais é que um **loop** utilizando como base nosso array de tasks, ele implementa a mesma sintaxe que utilizando no **for in** no JS, então o que estamos fazendo é um loop em nosos array `todoList` e informando que para cada item queremos utilizar a variavel `task` no contexto do loop. Mas o que é contexto nesse caso? O contexto é o dominio da diretiva **ng-repeat**, por isso utilizamos na tag `<li>`, criando o contexto naquele elemento repetindo-o para cada item em nosso array de tasks;

- Depois disso, você deve ter percebido a diretiva **ng-class**, que nesse caso adiciona a classe **completed** na nossa tag caso a condição seja verdadeira, nesse caso, caso `task.completed` seja **true** ou contenha algum valor. Veja também que estamos utilizando o contexto do item `task` nesse caso, que vai se repetir para cada item do nosso array.

- Também utilizando o mesmo contexto em nosso loop, utilizamos a diretiva **ng-model** em nosso checkbox que nesse caso marcado é **true** e do contrário **false**. Além disso também utilizamos uma **expression** no contexto `task.name` do item.

Com isso já temos o comportamento básico da nossa lista, só faltando implementar a função delete:

{% highlight html %}
<!-- Código omitido -->
<button class="btn btn-block btn-danger" ng-click="deleteTasks()">Delete Completed Tasks</button>
<!-- Código omitido -->
{% endhighlight %}

{% highlight javascript %}
{%raw%}
// Código omitido
$scope.deleteTasks = function() {
  var newList = [];
  $scope.todoList.forEach(function(item) {
      if (!item.completed) {
          newList.push(item);
      }
  });

  $scope.todoList = newList;
}
// Código omitido
{%endraw%}
{% endhighlight %}

Além de atribuir o método `deleteTasks` ao evento de click do botão, fiz um **forEach** em nosso array e atribui a  variável `newList` apenas os items que ainda não foram completados e por fim retornei a mesma variável. Sim, é um código extremamente simples, e a ideia é justamente essa.

## Bônus: Validando nosso Formulário
Apenas para fecharmos esse overview sobre Angular.js, vamos fazer uma validação simples em nosso formulário de forma que não queremos habilitar o botão para adicionar novas tasks se os critérios não forem válidos, nesse caso vamos apenas continuar utilizando o validador do HTML5 com o atributo `required` que colocamos em nosso input:

{% highlight html %}
<!-- Código omitido -->
<form class="add-form" name="todoForm" ng-submit="addItem()">
  <div class="form-group">
    <label>What you want todo?</label>
    <input type="text" name="task" class="form-control" ng-model="task.name" placeholder="Put something..." required="required" />
    <br/>
    <button class="btn btn-block btn-success" ng-disabled="todoForm.$invalid">Add Task</button>
  </div>
</form>
<!-- Código omitido -->
{% endhighlight %}

Podemos ver mais uma nova diretiva, a **ng-disabled** que seta nosso botão como desabilitado e também travando o action de submit padrão do formulário. Fizemos isso utilizando o atributo **name** em nosso formulário e utilizando isso com o verificador **$invalid** que varre nosso formulário procurando por impedimentos ou critérios não satisfeitos como por exemplo a propriedade `required` em nosso input. Simples não? Também é possível por exemplo criar um método em nosso controller que cheque as condições baseadas em nosso model **task** como por exemplo se ele tem mais de "x" caracteres, etc.

Espero que vocês tenham gostado, e deixo também um **[demo](http://jsfiddle.net/awghg64o/)** que fiz implementando uma barra de progresso bem simples utilizando o próprio componente do bootstrap. Pensem a respeito, Angular é muito mais que isso! Deixei N tópicos de fora, principalmente **rotas**, **vies**, **Ajax** e como **criar nossas próprias diretivas** que provavelmente são a parte mais legal do framework. Agora você já sabe o básico do framework, sei que a explicação não foi das melhores, mas o objetivo era dar o incentivo ao leitor para buscar conhecimento sobre o framework, acreditem isso foi o básico do básico comparado ao potencial do framework.
