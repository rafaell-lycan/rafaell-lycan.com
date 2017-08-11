---
title: 'AngularJS: Dicas sobre Promises e $http Service'
tags: angular
resumo: >
   Um guia de boas praticas de como utilizar Promises junto a serviços dentro do ecossistema do AngularJS, em especial o $http Service.
---

Fala pessoal, tudo bem?

Primeiramente eu gostaria de agradecer os emails de todos vocês que tem dúvidas, eu gostaria de poder responder a todos, ou saber todas as respostas, mas as vezes ou não tenho tanto tempo ou simplesmente não sei a resposta.

Eu estou revisando muito código Angular ultimamente, e recebi um email curioso sobre um problema que vivo encontrando durante meus reviews é o uso desnecessário do objeto **deferred** para resolver ou rejeitar promises. Sim, é exatamente sobre isso que quero falar hoje, sei que pode não ser a coisa mais útil possível, mas como tive uma pergunta sobre isso e também vivo vendo código desnecessário, eu quero ensinar uma solução simplificada.

Um outro problema é sempre ficar misturando `then()` e `catch()` muitas vezes utilizando dois **callbacks** no `then()`, as vezes até mesmo `success()` e `error()` no retorno do **$http service**. Tentarei ser o mais breve possível com cada um desses exemplos, propondo adotar um único estilo que pode ser aplicado a qualquer outra biblioteca de promise no futuro.

## Resolvendo Promises

O código abaixo utilizar o **$http service** para fazer uma chamada a um serviço REST e retornar apenas a propriedade **data** da resposta. Esse é um padrão comum que costumo encontrar em código AngularJS, eu sei que funciona muito bem, mas vejamos como poderia ser melhorado.

{% highlight javascript %}
function getData($q, $http) {
  var deferred = $q.defer();
  $http.get('...')
    .then(function(response) {
      deferred.resolve(response.data);
    });

  return $q.promise;
}
{% endhighlight %}

O código acima pode ser simplificado assim:

{% highlight javascript %}
// Better
function getData($http) {
  return $http.get('...')
    .then(function(response) {
      return response.data;
    });
}
{% endhighlight %}

A função `then()` aceita três parâmetros de callback: *successCallback, errorCallback,* e *notifyCallback*

Se você retornar um valor no **successCallback** ou **errorCallback**, o valor retornado será usado para resolver a **promise**. Sim, você não precisa chamar explicitamente `deferred.resolve(response.data)` toda vez que for resolver uma **promise** do **$http service**, em vez disso, simplesmente retornamos o **response.data** no callback `then()`.

A função em seguida retorna uma nova **promise**, portanto não há necessidade de usar o `$q` para criar um objeto **deferred** para devolver e depois retornar essa **promise**. Apenas retorne a **promise** criada pelo `then()`.

## Rejeitando Promises

E quanto ao tratamento de erros? Vamos usar de exemplo o código acima, podemos chamar o `deferred.reject` como **errorCallback**.

{% highlight javascript %}
function getData($q, $http) {
  var deferred = $q.defer();
  $http.get('...')
    .then(function(response) {
      deferred.resolve(response.data);
    },
    function(err){
      deferred.reject(err);
    });

  return $q.promise;
}
{% endhighlight %}


Com isso podemos pensar em uma maneira simplificada e utilizar novamente o retorno ao invés de rejeitar certo? Mas fazendo isso, o que retornamos? Você provavelmente deve pensar que poderíamos retornar o erro como em **successCallback**:

{% highlight javascript %}
function getData($http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    },
    function(err){
      return err; // Wrong
    });
}
{% endhighlight %}


Como disse, os valores retornados tanto de **successCallback** quanto de **errorCallback** são considerados valores resolvidos para a **promise**. Portanto a resposta de retorno no **callback** de **error** irá resolver a **promise** ao invés de rejeita-la. Mesmo se você retornar um valor falso ou não retornar nada, o valor continua sendo considerado como **resolvido**. Você pode utilizar uma outra forma se for necessário através do `$q.reject(err)`:

{% highlight javascript %}
// Better
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    },
    function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}


Além do **errorCallback** como segundo parâmetro a **promise** tem um outro método chamado `catch()` para tratar as respostas de erro. Eu pessoalmente prefiro utilizar o `then()` e o `catch()` juntos ao invés de duas funções de **callback** dentro do `then()` por conta da legibilidade.

{% highlight javascript %}
// Even Better
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return response.data;
    })
    .catch(function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}


Utilizando desta forma o `then()` é utilizado apenas em caso de sucesso e `catch()` basicamente é utilizado para os erros aplicado como se fosse o `then()` sem o **callback** de sucesso – `then(angular.noop, errorCallback)`.

A maior vantagem é que podemos encadear as **promises** retornadas através de `then()` e capturar qualquer erro que aconteça durante o processo em um único `catch()`:

{% highlight javascript %}
function getData($q, $http) {
  $http.get('...')
    .then(function(response) {
      return DataService.validateData(response.data);
    })
    .then(function(data) {
      return DataService.updateOffilineStorage(data);
    })
    .catch(function(err){
      return $q.reject(err);
    });
}
{% endhighlight %}

Encadeando as chamadas com o serviço `DataService` que em alguns métodos nos retorna uma promise podemos deixar nosso código mais elegante e simples de ler e capturando quaisquer erros em um único ponto.

## Sucesso e Erros no $http Service

Em versões antigas do AngularJS (1.3.x e anteriores) o **$http service** possui outros dois métodos adicionais que são `success()` e `error()` que são muito similares ao `then()`, porem existem algumas diferenças entre eles:

{% highlight javascript %}
$http.get('...')
  .success(function(data) {
    ...
  })
  .error(function(err) {
    ...
  })
{% endhighlight %}


Se você por acaso se recordou da **jQuery** e como as coisas eram simples naquele tempo esqueça isso, pois esses dois métodos estão obsoletos desde a versão 1.4.x basicamente pela confusão que eles introduziram.

O **callback** que você passa tanto para `success()` quanto para `error()` não são um objeto de resposta, mas sim os dados em si (Como na **jQuery**), e dentro do callback deixa de ser necessário retornar o `response.data` para recuperar apenas os dados da requisição. Um exemplo:

{% highlight javascript %}
// Success
$http.get('...')
  .success(function(data) {
    $log(data)
  });
  
// Then
$http.get('...')
  .then(function(response) {
    $log(response.data)
  });
{% endhighlight %}


Sim, é uma diferença boba, porem nem `success()` ou `error()` retornam uma nova **promise**, portanto eu recomendaria utilizar apenas `then()` e `catch()` já que existem em outras bibliotecas de **promise** e já foram adotados como convenção.

## Conclusão

O uso de um objeto **deferred** pode ser substituído por coisas mais simples:

- Retornar um valor especifico criando uma nova **promise** quando a mesma resolve.
- Devolver uma **promise** rejeitado utilizando `$q.reject()` para rejeitar a promise.

Prefira utilizar `catch()` para fornecer **erroCallbacks** e facilitar o encadeamento **promises** ao invés de dois **callbacks** dentro de `then()`. e pare de utilizar `success()` e `error()`.
