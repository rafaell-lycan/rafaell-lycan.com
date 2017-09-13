---
layout: post
title:  "AngularJS: Services, Factories e Providers"
date:   2015-05-23
tags: angular
image: assets/images/posts/angularjs-services.jpg
keywords:
description: >
  Angular.js e suas drogas. Este post visa explicar as diferenças entre os tipos distintos de serviços no Angular, sejam eles Services, Factories ou Providers.

related:
  - title : Developer Guide - Services
    url: https://docs.angularjs.org/guide/services
  - title : Developer Guide - Providers
    url: https://docs.angularjs.org/guide/providers
  - title : AngularJS - Factory vs Service vs Provider by Tyler McGinnis
    url: http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
---
Bem, sem dúvidas todos os que estão começando ou estão a algum tempo trabalhando com **[Angular.js](https://angularjs.org/)** já se perguntaram qual a diferença dos módulos **Factory**, **Service** e **Provider**; Eu particularmente li diversas vezes a documentação para entender realmente a diferença principalmente entre Factory e Service.

O Angular vem com diversos módulos de serviços, cada um com seus tipos de uso e propósito <del>as vezes parece tudo igual, mas...</del> .

Os serviços são sempre padrão **[singleton](http://en.wikipedia.org/wiki/Singleton_pattern)**, mas enfim, chega de enrolação e bora pro que realmente interessa.

## Factory
O **Factory** é sem dúvidas o tipo mais comum utilizado no mundo Angular e provavelmente o mais fácil e simples de entender.

Um **Factory** pode retornar qualquer tipo de dado, não existe uma maneira ou padrão explicito que você deva seguir para criar esses dados, você precisa somente retornar algo.

Se você leu o livro sobre **[JavaScript Design Patters](http://shop.oreilly.com/product/0636920025832.do)** do **[Addy Osmani](https://twitter.com/addyosmani)**, provavelmente viu o **[Revealing Module Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)**, que é um padrão que eu particularmente gosto de utilizar.

{% highlight javascript %}
app.factory('todoListService', function() {
  var todoList = [];
  function addTodo(todo) {
    // Sua implementação
  }
  function removeTodo(todo) {
    // Sua implementação
  }

  return {
    todoList: todoList,
    addTodo: addTodo,
    removeTodo: removeTodo
  };
});

app.controller('MyController', ['$scope', 'todoListService', function($scope, todoListService) {
  $scope.todoList = todoListService.todoList;
}]);
{% endhighlight %}
**[Veja o exemplo neste link](http://jsfiddle.net/ya1ewy78/)**

## Service
O **Service** trabalha muito parecido com o **Factory**, porem a direfença é que o **Service** nos da como retorno uma uma instancia dele mesmo ao invés de retornar um novo objeto como em **Factory**, em outras palavras é como se estivese-mos utilizando um `new ServiceName()`.

{% highlight javascript %}
app.service('todoListService', function() {
  this.todoList = [];
  this.addTodo = function (todo) {
    // Sua implementação
  }
  this.removeTodo = function (todo) {
    // Sua implementação
  }
});

app.controller('MyController', ['$scope', 'todoListService', function($scope, todoListService) {
  $scope.todoList = todoListService.todoList;
}]);
{% endhighlight %}
**[Veja o exemplo neste link](http://jsfiddle.net/L2dydeq5/)**

## Provider
**Providers** são muito parecidos com **Services** e **Factories**, porem são completamente configuraveis, o que pode tornalos um pouco mais complexos. Você só precisa retornar seu serviço em uma função chamada `$get` que nos dá a API publica daquele serviço, em outras palavrás o que vier dentro do nosso retorno em `$get` funciona exatamente como um **factory** por exemplo.

Mas porque devemos utilizar um **provider** ao invés de um **factory** então? **Providers** por si mesmos tem a caracteristica de serem configuráveis na **etapa de configuração**, em outras palavras podemos implementar o mesmo serviço desta maneira:

{% highlight javascript %}
app.provider('todoListService', function() {

  var todoList = [];

  return {
    loadDefaults: function(newList) {
      todoList = newList;
    },
    $get: function() {
      function addTodo(todo) {
        // Sua implementação
      }
      function removeTodo(todo) {
        // Sua implementação
      }

      return {
        todoList: todoList,
        addTodo: addTodo,
        removeTodo: removeTodo
      };
    }
  };
});

app.config(function(todoListServiceProvider) {
  todoListServiceProvider.loadDefaults([1, 2, 3]);
});

app.controller('MyController', ['$scope', 'todoListService', function($scope, todoListService) {
  $scope.todoList = todoListService.todoList;
}]);
{% endhighlight %}
**[Veja o exemplo neste link](http://jsfiddle.net/webjm28f/)**

Neste exemplo eu deixei a propriedade `todoList` do nosso serviço e em seguida criei um método `loadDefaults` fora da função `$get` justamente para torna-lo acessível apenas na etapa de configuração mudando assim o valor padrão de `todoList`.

Não entendeu ainda? Então imagine criar um módulo totalmente genérico para acessar recursos (REST), como você iria gerir as URLs desses endpoints? Hard code? Por isso a ideia é criar um serviço que seja capaz de configurar essas URLs através de um objeto mapeado talvez e o serviço utiliza-las atráves da API publica.

No Angular, temos diversos providers para configurar alguns serviços como `$routeProvider` ou `$locationProvider` para configurarmos nossas rotas, modo HTML5, etc.

Providers provavelmente são os serviços mais chatos de entender, depois de algum tempo desenvolvendo eu consegui entender seu papel dentro do ecossistema Angular.

## Bonus
Uma ultima coisa que não tem muito haver com o título do post, mas achei interessante mencionar é que **Values** e **Constantes** também podem ser considerados como serviços dentro do ecossistema Angular. Curioso não?

{% highlight javascript %}
app.value('appInfoValue', {version: "2.0"} );
app.constant('appInfoConstant', {version: "2.0"} );

app.controller('MyController', ['$scope', 'appInfoValue', 'appInfoConstant', function($scope, appInfoValue, appInfoConstant) {
  $scope.value = appInfoValue.version;
  $scope.const = appInfoValue.version;
}]);
{% endhighlight %}
**[Veja o exemplo neste link](http://jsfiddle.net/7p8h9qoa/)**
