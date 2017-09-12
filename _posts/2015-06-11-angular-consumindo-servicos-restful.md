---
layout: post
title:  "AngularJS: Consumindo Serviços RESTful"
date:   2015-06-11
tags: angular
image: assets/images/posts/angularjs-restful.jpg
keywords:
description: >
  Entender como o serviço $http funciona é algo bom e não envolve tantas surpresas no processo, porem, você pode se fascinar com o serviço $resource e o que ele pode proporcionar para a sua aplicação.

related:
  - title : $resource API
    url: https://docs.angularjs.org/api/ngResource/service/$resource
  - title : Ajax with $resource by Learn Angular.org
    url: http://learn-angular.org/#!/lessons/ajax-with-resource
---
A maioria das SPA's utilizam operações [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete), e você provavelmente deve utiliza-las. Vamos a um simples exemplo.

No [Angular.js](https://angularjs.org/) temos dois serviços para enviar e recuperar dados de uma API através do verbo HTTP: o [$http](https://docs.angularjs.org/api/ng/service/$http) e [$resource](https://docs.angularjs.org/api/ngResource/service/$resource).

Meh... ambos retornam uma [promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) então porque eu deveria escolher um ao invés do outro?

## $http Service
Vamos utilizar um simples código de exemplo:

{% highlight javascript %}
app.controller('MyController', ['$scope', '$http', function($scope, $http) {
  $scope.users;
  var baseUrl = '/api/users';

  $http.get(baseUrl).then(function(response) {
    $scope.users = response.data;
  }, function(err) {
    console.log(err);
  });
}]);
{% endhighlight %}

Se nosso objetivo é apenas retornar uma lista de dados, esta tudo pronto, inclusive tratando possíveis erros. Inclusive, é possível trabalhar exatamente como na [jQuery](http://api.jquery.com/jquery.ajax/):

{% highlight javascript %}
//....
$http.get(baseUrl).success(function(response) {
  list = response.data;
}).error(function(err) {
  console.log(err);
});
//....
{% endhighlight %}

O Serviço `$http` sem dúvidas é importante em aplicações Angular, principalmente pelo simples fato de poder encadear promises e ser absurdamente simples de utilizar.

Agora vamos pensar de uma outra forma: Imagine que você vai criar um serviço interagindo diretamente com uma API [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer), então esse nosso serviço tera métodos utilizando `$http.get`, `$http.post`, `$http.put` e `$http.delete` certo?

Logo somos obrigados a escrever novos métodos, e isso se resume em mais código que as vezes pode ser considerado desnecessário. Porque não utilizamos isso de uma forma otimizada?

## $resource Service
O Serviço `$resource` nada mais é do que uma fabrica que nos permite interagir com API's RESTful facilmente e é construido sobre o serviço `$http`.

Talvez seja mais simples apenas mostrar um exemplo de código:

{% highlight javascript %}
app.factory('MyService', function() {
  return $resource('/api/users/:id');
});

app.controller('MyController', ['$scope', 'MyService', function($scope, MyService) {
  $scope.users;
  MyService.query(function(data) {
    $scope.users = data;
  });
}]);
{% endhighlight %}

Dificil não?

Um porem é que o `$resource` service diferente do `$http` service não vem junto com o pacote do Angular... Porque?

Se analisarmos o simples fato que em nossa aplicação não é necessário algo como o `$resource`, porque então carrega-lo?

Isso é algo interessante em SPA's <del>varia do framework</del>, você não precisa utilizar tudo o que ela pode te proporcionar, apenas o que é interessante para a sua aplicação que talvez só precise de um simples `$http.get`.

Em todo caso, para utilizar-mos o `$resource` service precisamos adiciona-lo ao nosso projeto seja fazendo download do script ou adicionando o pacote **angular-resource** ao nosso projeto via [Bower](http://bower.io/) ou [NPM](https://www.npmjs.com/).

Também precisamos injeta-lo no módulo principal da aplicação:
{% highlight javascript %}
var app = angular.module('app', ['ngResource']);
{% endhighlight %}

A API do `$resource` service nos retorna alguns métodos como **get**, **save**, **query**, **remove** e **delete**.

- **query():** Uma solicitação GET para o recurso `/api/users/` ;
- **get():** Uma solicitação GET para o recurso `/api/users/:id`;
- **save():** Uma solicitação POST para o recurso `/api/users/` ;
- **remove():** Uma solicitação DELETE para o recurso `/api/users/:id`;
- **delete():** Uma solicitação DELETE para o recurso `/api/users/:id`;

Você deve ter percebido que utilizamos `:id` como parâmetro opcional que será utilizados com alguns dos verbos acima como por exemplo:

{% highlight javascript %}
var resource = $resource('/api/users/:id');

// GET /api/users/1
resource.get({id: 1}, function(data) {
  $scope.user = data;
});

// DELETE /api/users/1
resource.delete({ id: id });

// POST /api/users
resource.save(data);
{% endhighlight %}

Simples não é?

Os métodos `remove` e `delete` fazem exatamente a mesma ação, porem, como nem tudo é um mar de rosas, em certas versões do IE o delete pode não funcionar por ser uma palavra reservada. Por esse motivo o `remove` funciona como um **alias** para realizar a mesma ação.

Porem, ainda temos **mais um goodie**: Podemos utilizar alguns métodos que deixam nossas operações de CRUD ainda mais fáceis como `$save`, `$delete` e `$remove` que nos retornam uma **promise** propriamente dita, o que facilita muito em alguns casos como neste exemplo:

{% highlight javascript %}

app.controller('MyController', ['$scope', 'MyService', function($scope, MyService) {

  MyService.get({ id: 1 }, function(user) {
    user.name = "John Doe";
    // Faz update e nos retorna uma promise (success/error)
    user.$save();
  });
}]);
{% endhighlight %}

Tudo muito bonito, tudo muito legal, mas vamos utilizar um exemplo que realmente faça sentido. Meu amigo [@wbrunom](https://twitter.com/wbrunom) desenvolveu uma API RESTful em [Node](https://nodejs.org/) como exemplo onde o tema principal são **dragões**, o link para a documentação pode ser visto [aqui](https://dragons-api.herokuapp.com/).

Vamos analisar nossos endpoints REST:

<table class="table">
  <thead>
    <tr>
      <th>URL</th>
      <th>Method</th>
      <th>Params</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/api/dragons</td>
      <td>GET</td>
      <td>NULL</td>
      <td>All entries</td>
    </tr>
    <tr>
      <td>/api/dragons/:slug</td>
      <td>GET</td>
      <td>NULL</td>
      <td>Single entry</td>
    </tr>
    <tr>
      <td>/api/dragons</td>
      <td>POST</td>
      <td>JSON String</td>
      <td>Entry Created</td>
    </tr>
    <tr>
      <td>/api/dragons/:slug</td>
      <td>PUT</td>
      <td>JSON String</td>
      <td>Update Status</td>
    </tr>
    <tr>
      <td>/api/dragons/:slug</td>
      <td>DELETE</td>
      <td>NULL</td>
      <td>Delete Status</td>
    </tr>
  </tbody>
</table>

Vamos desenvolver um serviço para consumir esta API de forma simples:

{% highlight html %}
<!-- index.html -->
{% raw %}
<section ng-controller="mainController as vm">
  <h1>{{ vm.title }}</h1>
  <ul>
    <li ng-repeat="dragon in vm.dragons track by $index">
      <input ng-model="dragon.name"> <button ng-click="vm.updateDragon(dragon)">
        Update
      </button>
    </li>
  </ul>
</section>
{% endraw %}
{% endhighlight %}

{% highlight javascript %}
/* app.js */
;(function(angular) {
  angular.module('app', ['ngResource']);

  angular.bootstrap(document.body, ['app']);
})(angular);
{% endhighlight %}

{% highlight javascript %}
/* dragonsApiResource.js */
;(function(angular) {
  angular.module('app').factory('dragonsService', dragonsService);

  dragonsService.$inject = ['$resource'];

  function dragonsService ($resource) {
    var res = $resource('https://dragons-api.herokuapp.com/api/dragons/:slug');

    return res;
  }
})(angular);
{% endhighlight %}

{% highlight javascript %}
/* mainController.js */
;(function(angular) {
  angular.module('app').controller('mainController', mainController);

  mainController.$inject = ['dragonsService'];

  function mainController (dragonsService) {
  	var vm = this;

    vm.title = "Dragons API"

    dragonsService.query(function(dragons) {
      vm.dragons = dragons;
    });

  }
})(angular);
{% endhighlight %}

Apenas para informar, quando utilizamos o `angular.bootstrap` não fica mais necessário utilizar o ng-app em nossa aplicação. Assim conseguimos deixar nosso markup ainda mais limpo.

Sobre o HTML, utilizamos o `ng-repeat`, o que não é novidade para ninguem, mas também foi adicionado o `track by`, que é um parâmetro para otimizar o render dos elementos em loops como `ng-repeat` e `ng-options`.

O objetivo é atualizar os dados dragão, mas como no exemplo eu deixei apenas a informação do nome no input, referenciada no `ng-model`. No método `updateDragon`, disparado através do click do botão recebemos a informação do dragão relacionadas ao model, e como a entidade em si é um registro da nossa coleção **dragons** que veio do `$resource` service, ele nos fornece de graça o método `$save`, o que facilita o desenvolvimento de SPA. Certo?

{% highlight javascript %}
/* mainController.js */

  /* .... */

  vm.updateDragon = updateDragon;

  function updateDragon (dragon) {
  	dragon.$save();
  }

  /* .... */
{% endhighlight %}

Feito essas modificações em nosso controller, é a hora da verdade. Vamos atualizar um registro qualquer e ver o resultado.

{% highlight text %}
POST https://dragons-api.herokuapp.com/api/dragons 500 (Internal Server Error)
{% endhighlight %}

Primeiramente precisamos entender que o `$resource` não possui um método que realize `PUT` nativamente. Na verdade, quando utilizamos os métodos `query()` e `get(:id)`, eles nos retornam uma coleção ou objeto do tipo **Resource**, o qual nativamente conta com alguns métodos especiais de entidade como `$save()`, `$delete()` e `$remove()`.

O método `$save()` realiza um `POST`, o que funciona caso o **recurso** não exista na API, porém quando update, o servidor precisa checar e realizar uma espécie de **create or update** como existe no **activerecord** [Rails](http://rubyonrails.org/).

Os método `$delete()` e `$remove()` realizam requisições do tipo `DELETE`. Entretando, isso só funciona desde que nós informamos a referência em nosso recurso.

{% highlight javascript %}
/* dragonsApiResource.js */

  /* .... */

  var res = $resource('https://dragons-api.herokuapp.com/api/dragons/:slug', { slug: '@slug' });

  /* .... */
{% endhighlight %}

O segundo parametro é um objeto que indica o que será mapeado no endpoint a cada vez que um método especial da entidade for executado. Nesse caso foi associado que nosso `:slug` estará relacionado a propriedade `@slug`.

Feito isso agora nosso método `$save` ira apontar para o slug caso nosso **recurso** possua o atributo **slug**, do contrário podemos criar uma nova entidade utilizando nosso **dragonsService**, o que ira lhe lembrar muito uma `Classe` ou `Model`:

{% highlight javascript %}
/* dragonsApiResource.js */

  /* .... */

  var dragon = new dragonsService();
  dragon.name = "Meu Dragão";
  dragon.$save();

  /* .... */
{% endhighlight %}

Se funciona? Mas é claro que sim.

Foi criado um novo registro na API, o qual o slug é `meu-dragao`, e isso é ótimo caso seja utilizado da maneira correta, mas ainda não resolvemos o problema do update certo?

Como citei anteriormente, não possuimos um método o qual execute `PUT`, então a unica coisa que falta é o **update**. Para realizarmos essa operação, nós precisamos modificar nosso **resource** e deixa-lo mais customizável. Vejamos como:

{% highlight javascript %}
/* dragonsApiResource.js */

  /* .... */

  var res = $resource('https://dragons-api.herokuapp.com/api/dragons/:slug', { slug: '@slug' }, {
    update : {
      method: 'PUT'
    }
  });

  /* .... */
{% endhighlight %}

O terceiro parametro é um objeto que nos permite adicionar quantos métodos especiais forem necessários para a aplicação utilizando o prefixo `$`.

Agora que temos disponível o método `$update`, vamos coloca-lo em uso:

{% highlight javascript %}
/* mainController.js */

  /* .... */

  vm.updateDragon = function (dragon) {
  	dragon.$update();
  }

  /* .... */
{% endhighlight %}

Note que o retorno da API não é o registro atualizado, nem nada do tipo. Então nesse caso para atualizarmos a view, seria interessante ter um método que realiza novamente um `GET` para atualizar nossa view.

Você pode ver a [minha versão](https://jsfiddle.net/xqo3onht/) com esses métodos já implementados, porem o mais interessante seria criar métodos que iriam atuar dentro do próprio recurso para a realização do CRUD junto as validações necessárias e utiliza-las. Dessa forma criamos um padrão de assinatura de recurso em toda a aplicação aonde podemos utilizar promises através do `$q` e deixar nosso código mais legível e com o minimo possível de lógica nos controllers.

Existem ainda várias possibilidades para se utilizar o `$resource`, mas isso sera abordado com o tempo.

Espero que tenham entendido o conceito e as diferenças entre `$resource` e `$http`.
