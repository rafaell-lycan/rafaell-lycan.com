---
layout: post
title:  "Autenticação com Tokens em uma aplicação AngularJS"
tags: development angular
date:   2016-05-29
<!-- image: assets/images/posts/hello-world.jpg -->
keywords: angular, jwt, auth, js
description: >
  Neste artigo vamos ver como desenvolver um exeplo de autenticação utilizando AngularJS Json Web Token.
related:
  - title: JWT.IO
    url: https://jwt.io/
  - title: Death to Cookies, Long Live JSON Web Tokens
    url: https://www.youtube.com/watch?v=trCEGixJu34
  - title: Angular $HTTP Interceptors
    url: https://docs.angularjs.org/api/ng/service/$http#interceptors
  - title: Monitoring $http Activity With $http Interceptors In AngularJS
    url: http://www.bennadel.com/blog/2777-monitoring-http-activity-with-http-interceptors-in-angularjs.htm
---
Primeiramente vamos a pergunta que não quer calar: **você usa tokens?**

Se você quer pular a teoria e ir direto para o código, sinta-se livre e veja <a href="#angular-app">usar tokens em um SPA Angular</a>.

Então todo mundo já utilizou token algumas vezes na vida. Como? Sabe aqueles arquivos marotos que ficam em nossos navegadores chamados **[cookies](https://en.wikipedia.org/wiki/HTTP_cookie)**? Então, a cada vez que utilizamos sessão do servidor, a aplicação grava um número composto da sessão e expiração em um cookie. Sim, você usa token, talvez apenas não se deu conta disso.

Tokens são uma forma de se identificar com a aplicação, nada mais que isso.

Num mundo virtual cada token representa uma sessão/identificação. Um token pode conter N informações como nível de acesso, data de expiração e outras coisas não muito recomendadas como ID do usuário normalmente encriptado com 128 bits (128-bit [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)).

Quando falamos de tokens, temos que ter uma maneira simples de criar um padrão de tokens inteligentes, e toda essa magia por traz disso é composta por algumas especificações do Json Object Signing and Encryption (JOSE) que é um conjunto de definições dos padrões para a criação de tokens inteligentes ([RFC 7519](https://tools.ietf.org/html/rfc7519)).

JOSE divide a ordem lógica de criação e composição de tokens em 5 padrões: JWT, JWA, JWS, JWK e JWE.

## JWT
Json Web Token (JWT) é um padrão ([RFC 7165](https://tools.ietf.org/html/rfc7165)) que define como transmitir de forma segura objetos JSON compactos entre aplicações. Neste artigo vamos nos focar nele.

Para criarmos um JWT, precisamos entender que ele é composto por 3 elementos:

#### Headers
**Headers** são objetos JSON que normalmente definem duas partes: O **tipo do token** (typ) que é **JWT**, e o **algorítimo (alg) de encriptação** que será utilizado, como HMAC SHA256 ou RSA;

Exemplo:
{% highlight json %}
{
  "alg": "HS256",
  "typ": "JWT"
}
{% endhighlight %}

#### Payload (Claims)
**Payloads** são objetos JSON que contem os chamados **claims**, que pode definição são os atributos sobre a entidade tratada (normalmente o usuário). Existem 3 tipos de claims em payloads:

- Reserved claims: São atributos não obrigatórios (mas recomendados) que podem ser um conjunto de informações úteis e interoperáveis normalmente utilizados por protocolos de segurança em várias APIs. *Ex: **iss**(issuer), **exp**(expiration), **sub**(subject), etc.*
- Public claims: São atributos que definem o uso do JWT e informações úteis para a aplicação.
- Private claims: São atributos definidos especialmente para compartilhar informações entre aplicações

Exemplo:
{% highlight json %}
{
  "iss": "https://api.github.com",
  "exp": 1300819380,
  "user": "rafaell-lycan",
  "admin": true
}
{% endhighlight %}

#### Signature
Onde a magia acontece, é a terceira e ultima parte do nosso JWT feita a partir do hash (Base64Url) do header e do payload e uma **chave** definida em nossa aplicação e assinar isso.

Vamos a um exemplo utilizando o algoritimo HMAC SHA256:
{% highlight javascript %}
var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);

HMACSHA256(encodedString, 'secret');
{% endhighlight %}

Isso ira gerar um token com essa estrutura:
{% highlight bash %}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5naXRodWIuY29tIiwiZXhwIjoxMzAwODE5MzgwLCJ1c2VyIjoicmFmYWVsbC1seWNhbiIsImFkbWluIjp0cnVlLCJpYXQiOjE0NjQxOTQzNTh9.CcXOdvwL1baDNzhEjds9u59oHVrqG97hj9oVdZMzpaI
{% endhighlight %}

Perceba que é uma string dividida em **3 partes** separados por `.`, sendo elas os respectivos hashs dos headers, payload e signature.

Atualmente o [Auth0](https://auth0.com/) é o melhor lugar para tirar informações sobre como criar e testar seus tokens. Você também pode utilizar o [JWT Debugger](https://jwt.io/) para verificar se a assinatura é válida.

**Tudo muito lindo e legal, mas como isso funciona na prática?**

Imagine que sua Aplicação possui 2 clientes: SPA e Mobile. Nós utilizaremos o JWT para **autenticar** o usuário a acessar certas partes da nossa aplicação, mas para isso ele precisa logar em nosso sistema que retornar um JWT a ser armazenado na aplicação (LocalStorage/SQLite) ao invés de utilizar o modo tradicional através de cookies e sessão.

Sempre que for necessário acessar recursos protegidos, o cliente deve enviar o JWT através do **Authorization** na header utilizando a flag **Bearer**.

{% highlight json %}
Authorization: Bearer <token>
{% endhighlight %}

Este é um exemplo de autenticação **stateless**, que é uma forma de proteger rotas onde uma vez que o usuário o JWT definido, ele pode acessar recursos protegidos. Uma boa ideia é colocar alguns dados no payload que irão reduzir o acesso ao DB sem necessidade. Essa também é uma forma de permitir serviços comunicarem-se entre si. E o melhor, não importa de qual domínio sua aplicação esta sendo acessada, pois podemos facilmente contornar esse problema utilizando [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), o que já não é possível através de cookies a não ser que você faça uma gambiarra com `postMessage()` que não é uma coisa muito bonita de se fazer.

O diagrama a baixo mostra o processo:
![Comunicação via JWT](https://cdn.auth0.com/content/jwt/jwt-diagram.png)

Agora que você já sabe o que é um JWT, então podemos continuar para a autenticação no Angular.

## Angular App
No lado cliente, nossa aplicação Angular precisa enviar dados de autorização para nossa API no cabeçalho a cada requisição HTTP.

Essa é uma alteração comum em uma aplicação MEAN Stack, pois como disse anteriormente cookies não são a melhor maneira de criarmos e utilizarmos tokens.

Eu vou dividir o exemplo em 3 partes:

1. Auth Service
2. HTTP Interceptor
3. Secured Routes

Como é um exemplo simples, eu vou deixar claro que nos códigos a seguir estou utilizando o [ngStorage](https://github.com/gsklee/ngStorage) e [ngRoute](https://docs.angularjs.org/api/ngRoute).

#### Auth Service
Bom, o `AuthService` será o encarregado por fazer login/logout e armazenar o token do usuário.

{% highlight javascript %}
angular.module('app', [])
  .factory('AuthService', AuthService);

function AuthService ($http, $localStorage, $q) {
  return {
    getToken : function () {
      return $localStorage.token;
    },
    setToken: function (token) {
      $localStorage.token = token;
    },
    signin : function (data) {
      $http.post('api/signin', data);
    },
    signup : function (data) {
      $http.post('api/signup', data);
    },
    logout : function (data) {
      delete $localStorage.token;
      $q.when();
    }
  };
}
{% endhighlight %}

Sim, este exemplo de serviço esta longe de ser um dos melhores, já que ele faz muita coisa como gerenciar as rotas e gerenciar o token da aplicação. Uma boa refatoração seria isolar isso em dois serviços.

Explicando brevemente, temos **signin** onde passamos *username* e *password* e como retorno temos o token caso sucesso, e **signup** onde passamos os dados para cadastro e no fim também temos o token caso sucesso. **logout** apenas vamos deletar o token da aplicação e o **retorno é uma promise**/`$q.when()`, o qual será *utilizada para um possível redirect* e **get/set** para utilizarmos o token.

#### HTTP Interceptor
Tendo em mente que nosso `AuthService` já esta pronto, agora precisamos injeta-lo em nosso serviço HTTP. Lembrando que podemos ter vários interceptores em nossa aplicação.

Existem 2 tipos de interceptors: **Request** e **Response**.

Ambos são funções, com a principal diferença que toda **request** recebe um objeto **config** como parametro default, o qual configura toda requisição realizada, enquanto toda **response** recebe o objeto de response padrão da API.

É muito comum tratar vulnerabilidade dependendo do contexto e conteúdo que você tem na sua aplicação.

Tanto a **request** quanto a **response** podem sofrer algum tipo de falha/rejeição durante a ação, então também temos dois handlers para tratarmos os erros de requisição.

{% highlight javascript %}
angular.module('app', [])
  .factory('AuthInterceptor', AuthInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

function AuthInterceptor ($location, AuthService, $q) {
  return {
    request: function(config) {
      config.headers = config.headers || {};

      if (AuthService.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + AuthService.getToken();
      }

      return config;
    },

    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        $location.path('/signin');
      }

      return $q.reject(response);
    }
  }
}
{% endhighlight %}

Em resumo nós colocamos um `AuthInterceptor` utilizando o `$httpProvider` onde configuramos as headers da aplicação para caso exista um token em nosso `AuthService`, o mesmo será adicionado junto a flag **Bearer** no momento da **request**, e adicionamos um **handler de error** em nosso **response** para caso o status da requisição retorne 401 ou 403 nós redirecionamos o usuário para a tela de login e caso contrário nós passsamos o erro adiante através de `$q.reject()`.

#### Secured Routes

Por padrão como disse anteriormente sua app deveria ser stateless, mas como o mundo não é perfeito nem de longe, eu quero compartilhar uma abordagem para validar rotas verificando o mínimo possível.

A primeira coisa a ser feita é adicionar um parâmetro simples nas propriedades da rota para verificar se a rota precisa ser autenticada ou não:
{% highlight javascript %}
$routeProvider.when('/rota-segura', {
  templateUrl: '/template.html',
  controller: 'mainController',
  controllerAs: 'vm',
  authorize: true
});
{% endhighlight %}

Feito isso, a cada mudança de rota, precisamos agora verificar se existe a propriedade `authorize` na rota destino, o que faremos escutando o evento `$routeChangeStart` do **ngRoute**.

{% highlight javascript %}
angular.module('app', [])
  .run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.authorize) {
        if (!AuthService.getToken()) {
          /* Ugly way
          event.preventDefault();
          $location.path('/login');
          ========================== */

          $rootScope.$evalAsync(function () {
            $location.path('/signin');
          })
        }
      }
    });

  });
{% endhighlight %}

Neste exemplo deixamos claro que além de verificar se a rota possui a propriedade `authorize`, também verifico uma informação adicional, nesse caso eu usei o `getToken()` mas você pode utilizar o que fizer sentido na sua aplicação. Talvez um nível de usuário ou algo do tipo. Quanto a forma de cancelar o evento, existem duas formas de se fazer a mesma coisa. A primeira que é mais simples é cancelar o evento através de `event.preventDefault()` e redirecionar o usuário. Uma forma mais elegante seria utilizar o `$evalAsync` que é um método existente nos escopos que em uma cadeia de eventos assincronos, ele tem prioridade sobre as outras, ou seja, ele precisa rodar para o evento vigente continuar, o que nesse caso cancela o evento default da rota e atualiza o escopo redirecionando o usuário.

## Nota

Sei que estou um tanto quanto ausente nos posts, principalmente na série Laravel, mas prometo colocar mais conteúdo assim que possível.

Na verdade este post só saiu por conta de ser uma coisa que fui motivado a fazer pelo **Fabio Santos**, o qual me mandou um email perguntando exatamente sobre isso, então durante algumas horas no meu fim de semana eu li um pouco mais sobre **JOSE** e as RFC's afim de melhor meu embasamento teórico e escrever algo de qualidade.

Acho justo escrever coisas com qualidade, e não apenas escrever por escrever.

Em algumas semanas eu vou ter mais tempo para escrever, pois estarei de férias da pós, assim termino os posts de Laravel e outros dois sobre NodeJS.

Dúvidas? Podem colocar nos comentários abaixo que assim que der eu respondo.
