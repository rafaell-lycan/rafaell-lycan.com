---
layout: post
title:  "AngularJS: Definindo parâmetros opcionais com UI Router"
date:   2016-12-31
categories: javascript angular
tags: javascript angular
keywords:
description: >
  No passado nós vimos como utilizar o ngRoute e o UI Router para criar aplicações com Angular JS. Hoje vou explicar 3 formas que para definir rotas utilizando o UI Router e como isso pode ser útil para sua aplicação.
---

Aos que estão me mandando dúvidas por email sobre AngularJS e o [UI Router](https://github.com/angular-ui/ui-router), vou tentar esclarecer algumas coisas.

Atualmente estou trabalhando em um dashboard para um dos clientes da [GFT](http://www.gft.com/). É possível criar serviços e adicionar eles para determinadas áreas (grupos/familias/centros de custo), ou você pode criar um processo de um serviço (com descrição, etapas de execução, responsáveis, etc) que cria automaticamente um ID com iniciais referentes ao grupo do serviço.

Neste ultimo cenário, precisamos passar o `id` de serviço relevante para o controller de processos. Existem várias maneiras em que podemos declarar os parâmetros opcionais no UI Router.

## Query Parameters

Para mapearmos os parâmetros de URL (query params) em nossa aplicação, precisamos declara-los na configuração de estado (state) de nossa rotas:

{% highlight javascript %}
state('new-process', {
  url: '/new?serviceId',
  templateUrl: '/templates/process/new.html',
  controller: function($scope, $stateParams) {
     $scope.serviceId = $stateParams.serviceId;
  }
})
{% endhighlight %}

Você pode criar um link para esta rota utilizando o atributo `ui-sref`:

{% highlight html %}
<a ui-sref="new-process({ serviceId: 2 })">New Process</a>
{% endhighlight %}

Isso irá navegar para a rota `/new?serviceId=2`.

Se você tiver vários parâmetros opcionais, separe eles com um `&`:

{% highlight javascript %}
state('new-process', {
  url: '/new?serviceId&param1&param2',
  templateUrl: '/templates/process/new.html',
  controller: function($scope, $stateParams) {
     $scope.serviceId = $stateParams.serviceId;
     $scope.param1 = $stateParams.param1;
     $scope.param2 = $stateParams.param2;
  }
})
{% endhighlight %}

## Parâmetros de Rota Opcionais

Parâmetros de rota no UI Router são opcionais por padrão. Sim, isso quer dizer que tanto `/new/2` e `/new/` funcionam, mas não apenas `/new` sem a ultima barra `/`. O sufixo `?` que vimos no exemplo acima simplesmente informar ao UI Router a onde ele deve começar a busca de parâmetros de URL. ex: `/new/:serviceId?`.

{% highlight javascript %}
state('new-process', {
  url: '/new/:serviceId',
  templateUrl: '/templates/process/new.html',
  controller: function($scope, $stateParams) {
     $scope.serviceId = $stateParams.serviceId;
  }
})
{% endhighlight %}

Atualizando o atributo `ui-sref` para `new-process({ serviceId: 2 })` iremos ter o link  `/new/2`.

Se para você não é fã dessa barra como parâmetro, você vai ter que configurar uma outra abordagem para utilizar a rota sem parâmetros.

Para rotas com múltiplos parâmetros como `/services/process/:process/step/:step` talvez a única solução seja declarar várias rotas como  `/services/process/:process` e `/services/process/:process/step/:step`.

## Parâmetros de Rotas Non-URL

Recentemente descobri essa outra opção de passar parâmetros sem afetar a URL via o state do UI Router. No meu caso achei particularmente util pois não foi preciso nenhuma magia para solucionar o problema que tinha:

{% highlight javascript %}
state('new-process', {
  url: '/new',
  params: {
    serviceId: null,
  },
  templateUrl: 'new.html',
  controller: function($scope, $stateParams) {
     $scope.serviceId = $stateParams.serviceId;
  }
})
{% endhighlight %}

Para utilizar isso apenas modifique o atributo `ui-sref` para `new-nonurl({ serviceId: 2 })` que isso vai gerar o link `/new` passando o parâmetro `serviceId`.

Você pode inclusive usar o objeto `params` para declarar valores padrão para os seus parâmetros de rota.
