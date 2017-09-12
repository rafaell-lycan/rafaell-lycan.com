---
layout: post
title:  "Construindo uma API RESTful com Laravel - Parte 2"
date:   2016-08-05
tags: laravel php
image: assets/images/posts/laravel-api.jpg
keywords: laravel, construindo apis, api restful, laravel api, laravel cors
description: >
  No artigo anterior da série nós vimos o setup básico da nossa API, mas esta na hora de fazermos mais, esta na hora de configurarmos nossas rotas e finalizar nosso CRUD.

related:
  - title : Teach a Dog to REST
    url: https://vimeo.com/17785736
  - title : Eloquent - eager-loading
    url: https://laravel.com/docs/5.0/eloquent#eager-loading
  - title : RESTful Resource Controllers
    url: https://laravel.com/docs/5.0/controllers#restful-resource-controllers
  - title : Controller Middleware
    url: https://laravel.com/docs/5.0/controllers#controller-middleware
---

<p class="info-box">
  **Atenção:** Este artigo utiliza a versão **5.2** do Laravel.
</p>

[No artigo anterior da série]({{site.url}}/2015/construindo-restful-api-laravel-parte-1/) nós vimos o setup básico da nossa API, mas esta na hora de fazermos mais, esta na hora de configurarmos nossas rotas e a autenticação do usuário.

Depois de muito tempo e alguns pedidos para continuar a série, resolvi dar uma olhada no que faltava para terminar. Resolvi então quebrar a série em 3 partes ao invés de duas.

Nesta parte vamos tocar os seguintes tópicos do roadmap:

<!-- {% include toc.html %} -->

- [Controllers e Rotas](#controllers-e-rotas)
- [Middlewares](#middlewares)

## Controllers e Rotas
Para conseguirmos expor os dados do nosso banco de dados em nossa API, precisamos seguir dois passos muito simples:

1. Definir as rotas dos recursos utilizados em nossa aplicação, *Jobs* e *Companies*.
2. Criar métodos em nossos controllers que irão responder as nossas rotas para cada verbo HTTP.

Todo desenvolvedor novo que começa com laravel e vê os comandos **artisan** e segue ao menos a documentação chega a parte de [routing](https://laravel.com/docs/5.1/routing), que ao meu ver é uma das partes que me fez se apaixonar pelo framework.

Vamos primeiramente definir nosso grupo de recursos em `routes.php`:

{% highlight php %}
<?php

Route::group(array('prefix' => 'api'), function()
{

  Route::get('/', function () {
      return response()->json(['message' => 'Jobs API', 'status' => 'Connected']);;
  });

  Route::resource('jobs', 'JobsController');
  Route::resource('companies', 'CompaniesController');
});

Route::get('/', function () {
    return redirect('api');
});

{% endhighlight %}

Primeiramente, como uma boa prática é prefixar um agrupamento de rotas que irá servir como namespace da nossa API. Nesse caso utilizamos `api`, porem você pode utilizar qualquer outro nome e até mesmo definir uma versão da API. Também sabemos que serão criados 2 controllers RESTful que irão lidar com o HTTP para os recursos **jobs** e **companies**. Por fim também foi adicionado um redirect caso o usuário dê um **GET** na raiz da aplicação.

Nosso primeiro recurso será `jobs` que é a base da nossa aplicação e esta relacionado ao segundo recurso `companies` que será o meio de gerenciar essas vagas. Pense nesse recurso como um recurso de usuário, mas ao invés de informações sobre o mesmo temos informações sobre a empresa.

Sabendo disso, vamos criar nossos recursos utilizando **Artisan** para gerar nossos controllers:

{% highlight php %}
php artisan make:controller JobsController
{% endhighlight %}

{% highlight php %}
php artisan make:controller CompaniesController
{% endhighlight %}

Navegando até o diretório `app/Http/Controllers` você vai notar que os arquivos `CompaniesController.php` e `JobsController.php` foram criados.

#### Listando rotas

Toda vez que registramos um **resource route**, o Laravel adiciona e lista os endpoints que podem ser utilizados, e podemos consulta-los através do comando:

{% highlight php %}
php artisan route:list
{% endhighlight %}

Isso ira nos retornar uma lista das rotas definidas seguidas pelo verbo HTTP correspondente. No fim, teremos uma listagem como essa.

<div class="center">
  ![Laravel Route List](/assets/images/posts/laravel-route-list.png)
</div>

#### Listando registros

Até agora tudo bem, não tivemos nada muito complexo e para finalizar essa sessão de forma razoável, vamos fazer nosso `JobsController` retornar nossos jobs cadastrados <del>aqueles criados no seed</del> utilizando o método `index`:

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
use App\Job;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    public function index()
    {
        $jobs = Job::with('company')->get();
        return response()->json($jobs);
    }
...
{% endhighlight %}

O método `index` é normalmente utilizado para listar todos os dados do recurso, em outras palavras como um **get all**, e isso é exatamente o que ele esta fazendo aqui. Estamos utilizando em conjunto o [eager loading](https://laravel.com/docs/5.0/eloquent#eager-loading) para retornar nossos **jobs** que estão associados com **companies** e só ai retornando. Também note que utilizamos nosso model `Job` no todo com o a declaração `use` para evitar o namespace toda vez que for utiliza-lo.

Para termos certeza de que esta tudo OK, podemos utilizar uma ferramente como o [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) do Google Chrome que é um cliente REST para nos ajudar a testar e debugar nossas rotas da aplicação.

Uma vez que você já tenha o **postman** instalado, vamos realizar um request do tipo `GET` no endpoint `/api/jobs` e ver o retorno:

<div class="center">
  ![Laravel Postman GET Jobs](/assets/images/posts/laravel-api-postman-get.png)
</div>

Já resolvemos a listagem dos jobs, agora vamos fazer o mesmo para empresas:

{% highlight php %}
<?php
//app/Http/Controllers/CompaniesController.php
...
use App\Company;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return response()->json($companies);
    }
...
{% endhighlight %}

Aqui você pode ver que estamos fazendo exatamente a mesma coisa que em `JobsController` com a única diferença de trazer exclusivamente os dados de **company**. Você pode utilizar o **postman** para testar o endpoint `/api/companies` utilizando o verbo `GET`.

Já conseguimos listar nossos registros, mas algumas vezes, vamos precisar pegar apenas um passando como parâmetro no endpoint um **ID**, vamos fazer isso de forma simples e rápida em nossos os controllers:

{% highlight php %}
<?php
//app/Http/Controllers/CompaniesController.php
...
use App\Company;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    public function show($id)
    {
        $company = Company::find($id);

        if(!$company) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        return response()->json($company);
    }
...
{% endhighlight %}

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
use App\Job;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    public function show($id)
    {
        $job = Job::with('company')->find($id);

        if(!$job) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        return response()->json($job);
    }
...
{% endhighlight %}

Podemos ver que é um código bem simples, primeiramente utilizando o método `find($id)` verificamos se o registro `$id` é `null`, se sim retornamos um **erro** `404` com uma mensagem no corpo. Caso contrário atualizamos o registro atual com os dados vindos da requisição. E pronto! Você pode testar essa implementação utilizando o verbo `GET` nos endpoints `/api/jobs/:id` e `/api/companies/:id` apenas subistituindo `:id`.

#### Criando registros

A primeira parte foi a mais fácil, agora vamos de fato criar nossas rotas para **inputar registros**, vamos seguir um lógica simples:

- Precisamos pegar dados vindo de nossas requests (`POST`);
- Podemos também validar os dados, adicionando alguns como obrigatórios, mas iremos com isso depois;
- Por fim salvar os dados utilizando o Eloquent.

Eu vou começar com a empresa, por acreditar que será mais fácil por esse caminho, então vamos seguir nossa lógica utilizando o código abaixo:

{% highlight php %}
<?php
//app/Http/Controllers/CompaniesController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    public function store(Request $request)
    {
        $company = new Company();
        $company->fill($request->all());
        $company->save();

        return response()->json($company, 201);
    }
...
{% endhighlight %}

Esse código é ligeiramente simples, o método `store` recebe um objeto `Request` que contem todos os dados da requisição `POST` no endpoint `/api/companies` onde criamos um novo model `Company` que após ser salvo retornamos o mesmo com o **status** `201`.

Enviando um simples **payload** contendo `name` e `email` e o **Content-Type** como `application/json` já conseguimos gravar nosso primeiro registro. Vou utilizar o **cURL** como exemplo, mas você pode utilizar o **postman** se preferir:

{% highlight bash %}
curl -H "Content-Type: application/json" \
  -X POST -d '{"name": "My awesome company","email": "contact@company.com"}' \
  https://laravel-jobs-api.dev/api/companies
{% endhighlight %}

Feito isso temos o seguinte retorno:

{% highlight javascript %}
{
  "name": "My awesome company",
  "email": "contact@company.com",
  "updated_at": "2016-06-30 14:52:21",
  "created_at": "2016-06-30 14:52:21",
  "id": 3
}
{% endhighlight %}

Com o retorno da nossa empresa que possui o `id=3` já conseguimos criar um job que pertence a uma empresa, para isso a implementação no `JobsController` é tão simples quanto a que acabamos de desenvolver:

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    public function store(Request $request)
    {
        $job = new Job();
        $job->fill($request->all());
        $job->save();

        return response()->json($job, 201);
    }
...
{% endhighlight %}

Com o método `store` implementado exatamente como vimos anteriormente, já podemos utilizar o endpoint `/api/jobs` com o verbo `POST` com o seguinte **payload**:

{% highlight bash %}
curl -H "Content-Type: application/json" \
  -X POST -d '{"title": "PHP Developer / Laravel Expert","description": "Laravel Expert", "local": "São Paulo", "remote": "no", "company_id": "3"}' \
  https://laravel-jobs-api.dev/api/jobs
{% endhighlight %}

Temos o seguinte retorno:

{% highlight javascript %}
{
  "title": "PHP Developer / Laravel Expert",
  "description": "Laravel Expert",
  "local": "São Paulo",
  "remote": "no",
  "company_id": "3",
  "updated_at": "2016-07-02 20:23:47",
  "created_at": "2016-07-02 20:23:47",
  "id": 5
}
{% endhighlight %}

*Em bash, utilizamos o caractere **barra invertida/barra inversa** `\` para permitir quebra de linha, mas você pode enviar uma única linha apenas retirando este caractere.*

Eu sei que nosso código esta falho, pois se não enviarmos nenhum **payload** o registro será criado em branco e isso não é útil para nenhuma aplicação. Vamos ver diversas **armadilhas e como contorná-las** com implementações simples, no caso de cadastro *é falho passar o* `id` *da empresa* que esta cadastrando uma vaga, esse parâmetro deve *ser pego na sessão*.

#### Atualizando registros

Precisamos fornecer ao usuário uma forma para atualizar os dados em nossa aplicação, nesse caso, será razoavelmente simples, porem como mencionado acima, precisamos depois **lidar com as armadilhas** que estamos deixando para trás, como por exemplo *um usuário só pode atualizar seu próprio registro de empresa e suas prórias vagas*. Não é uma coisa difícil de se fazer, mas precisamos saber os problemas que teremos que resolver.

Vamos adicionar uma lógica simples em nossos controllers para atualizar os registros. Vamos começar em `JobsController` dessa vez:

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    public function update(Request $request, $id)
    {
        $job = Job::find($id);

        if(!$job) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $job->fill($request->all());
        $job->save();

        return response()->json($job);
    }
...
{% endhighlight %}

Esse código é bem similar aos que já implementamos, verificamos se o registro `$id` é `null`, se sim retornamos um **erro** `404`, se não retornamos atualizamos o registro atual e o retornamos. Podemos agora utilizar o verbo `PUT` no endpoint `/api/jobs/100` e teremos o seguinte retorno:

{% highlight javascript %}
{
  "message": "Record not found"
}
{% endhighlight %}

Neste exemplo estamos tentando atualizar o registro de `$id=100`, porem o mesmo ainda não foi criado então temos a mensagem de erro acima, mas caso o mesmo exista o registro atualizado nos sera retornado com o **status** `200`.

Você provavelmente já deve ter visto também uma implementação diferente, como esta:

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
class JobsController extends Controller
{
    public function update(Request $request, $id)
    {
        try {
            $job = Job::findOrFail($id);

            $job->fill($request->all());
            $job->save();

            return response()->json($job);
        } catch (Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            response()->json($e);
        }
    }
...
{% endhighlight %}

Esse é o exemplo de implementação default do Laravel que você pode achar em qualquer documentação ou tutorial com o seguinte retorno:

{% highlight javascript %}
{
  "error": {
    "description": "Invalid URI",
    "messages": []
  }
}
{% endhighlight %}

Eu particularmente não sou muito fã, prefiro criar uma mensagem personalizada seguindo uma outra estrutura de resposta. **Mas isso é gosto, ambas implementações funcionam bem**.

Agora fazendo exatamente a mesma coisa em `CompaniesController`:

{% highlight php %}
<?php
//app/Http/Controllers/CompaniesController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    public function update(Request $request, $id)
    {
        $company = Company::find($id);

        if(!$company) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $company->fill($request->all());
        $company->save();

        return response()->json($company);
    }
...
{% endhighlight %}

Agora é só testar via **postman** ou **cURL** e teremos o mesmo padrão de resposta implementado em `JobsController`.

{% highlight bash %}
curl -H "Content-Type: application/json" \
  -X PUT -d '{"name": "My new named company","email": "contact@newcompany.com"}' \
  https://laravel-jobs-api.dev/api/companies/3
{% endhighlight %}

Ja implementamos uma forma do usuário atualizar os registros, agora precisamos implementar uma forma de remove-los.

#### Deletando registros

Essa sem dúvidas é a parte mais fácil a ser implementada, e aqui vamos deixar nossa última armadilha, por exemplo precisamos fazer a mesma validação e *verificar se o usuário é dono da vaga*, pois uma empresa só pode deletar suas próprias vagas.

O código para implementação é simplesmente ridículo, primeiro vou implementar em `CompaniesController` e em seguida em `JobsController`:

{% highlight php %}
<?php
//app/Http/Controllers/CompaniesController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    public function destroy($id)
    {
        $company = Company::find($id);

        if(!$company) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $company->delete();
    }
...
{% endhighlight %}

{% highlight php %}
<?php
//app/Http/Controllers/JobsController.php
...
use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    public function destroy($id)
    {
        $job = Job::find($id);

        if(!$job) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        $job->delete();
    }
...
{% endhighlight %}

Implementado o método `destroy`, podemos ver como o código é realmente simples. Pegamos o id passado pelo endpoint `/api/jobs/:id` utilizando o verbo `DELETE` e pronto! Caso o registro não exista retornamos um **erro** `404` com uma mensagem personalizada. Você pode utilizar `findOrFail` em um bloco `try/catch` se preferir, mas de novo, isso vai de gosto.

Podemos perceber que não existe retorno de sucesso quando um registro é deletado, você poderia utilizar o **status** `204` *(No Content)* se preferir, mas eu acredito ser apenas um contexto perdido. Prefiro deixar `200` como padrão.

Existe [esse post](http://blog.ploeh.dk/2013/04/30/rest-lesson-learned-avoid-204-responses/) do [Mark Seemann](https://twitter.com/ploeh) que eu li a mais ou menos um ano atrás, ele explica algumas **lições aprendidas desenvolvendo APIs REST** e que me convenceram a não utilizar **status** `204` nas respostas. Você pode simplesmente ler e tirar sua conclusão.

> A DELETE request represents the intent to delete a resource. Thus, if the service successfully handles a DELETE request, what else can it do than returning a 204 (No Content)? After all, the resource has just been removed.

## Middlewares

Conseguimos! Fizemos o CRUD básico, contudo deixamos varios problemas para trás, alguns bem críticos na verdade.

Middlewares são recursos que nos permitem interceptar requisições HTTP. Nesse caso vamos apenas proteger algumas rotas que necessitam do usuário estar autenticado. Caso contrário nós vamos retornar um erro informando que o usuário não esta logado.

Vou tentar ser breve, não vou explicar como criar um middleware customizado mas vou explicar os conceitos básicos. Primeiramente você precisa saber que todos os middlewares existentes no Laravel, estão localizados em `/app/Http/Kernel.php`. Por padrão a propriedade `$routeMiddleware` é um `Array` que contem a base de middlewares do framework, e para criar e adicionar um novo middleware basta apenas incluir no array seu caminho.

#### Middlewares em rotas especificas

É possível utilizar um middleware para proteger uma rota especifica. Por exemplo:

{% highlight php %}
<?php
Route::get('admin/profile', function () {
    // Protected route
})->middleware('auth');
{% endhighlight %}

Nesse caso estamos protegendo a rota `/admin/profile` com o middleware `auth`, que garante que o usuário precisa estar logado para acessar a determinada rota.

Também é possível utilizar mais de um middleware, onde serão validados um por um sequencialmente.

{% highlight php %}
<?php
Route::get('admin/profile', function () {
    // Protected route
})->middleware('auth', 'custom');
{% endhighlight %}

Também é possível utiliza-los em grupos de rotas:

{% highlight php %}
<?php
Route::group(['middleware' => ['auth']], function () {
    // Protected routes
});
{% endhighlight %}

Novamente o código é simples e irá deixar o grupo de routas protegidas com o middleware `auth`. Também é possível utilizar outros middlewares passando um `Array` como argumento.

#### Middlewares em controllers

O conceito é o mesmo, proteger rotas especificas mas dessa vez através dos controllers. Podemos utilizar o método `$this->middleware()` em nosso contrutor desde que ele extenda o `Controller` base.

{% highlight php %}
<?php
...
class ApplicationController extends Controller {

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('auth', ['only' => 'update']);
        $this->middleware('custom', ['except' => ['index', 'show']]]);
    }
...
}
{% endhighlight %}

Seguindo mais ou menos o exemplo anterior, você também pode utilizar vários middleware, sendo que eles serão usados sequencialmente. No código de exemplo o primeiro middleware de `auth` vai deixar todas as rotas do controller seguras, porem eu também posso informar quais rotas eu quero aplicar meu middleware através do segundo parâmetro de configuração utilizando a chave `only` e os métodos/rotas que o middleware será aplicado. Também é possível aplicar o middleware em todas as rotas e remover algumas entradas expecificas utilizando a chave `except`.

Tanto em `JobsController` quanto em `CompaniesController` vamos adicionar a seguinte configuração de middleware:

{% highlight php %}
<?php
...
    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }
...
{% endhighlight %}

Agora temos todas as rotas protegidas exceto os métodos `index` e `show` que são utilizados pelos verbo `GET` em ambos os controllers. Já conseguimos dar o básico de segurança em nossa aplicação, mas ainda temos muito o que fazer.

E agora vamos editar nosso middleware, apenas modificando seu comportamento padrão, e para isso vamos editar o método `handle` do middleware `Authenticate` em `/app/Http/Middleware/Authenticate.php`:

{% highlight php %}
<?php
...

// Original
    if ($request->ajax()) {
        return response('Unauthorized.', 401);
    } else {
        return redirect()->guest('login');
    }

// Updated
    if ($this->auth->guest()) {
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }
...
{% endhighlight %}

O que fizemos foi o seguinte, por padrão o middleware `Authenticate` faz dois níveis de verificação, sendo o primeiro se o usuário é convidado, ou seja se ele não esta em uma sessão. Já a segunda validação padrão é se a requisição é AJAX, se sim é retornado um **erro** `401` em texto plano, caso contrário o usuário é redirecionado para a página `/auth/login`.

O que fizemos foi tirar a validação das requisições e retornar uma única mensagem em formato JSON com **erro** `401`, obviamente vamos precisar tratar tokens e outras coisas mas vamos um passo por vez.

No próximo artigo vamos vamos cobrir os problemas criticos que deixamos para trás como **validações de entrada** para criação dos registros, criar  nossa **rota de autenticação** que retornará um token válido, **verificação e validação do token** em nosso middleware de autenticação.

Peço desculpas a todos pois este artigo teve início a mais de um mês, porem como eu queria terminar tudo de uma vez, ficou faltando algumas partes, portanto vou deixar a parte restante para uma terceira e última parte da série.

## Update
Eu já tinha começado esse artigo em julho, mas enrolei um pouco pra terminar a parte de autenticação, comecei a estudar outras coisas e esqueci completamente que faltava tão pouco pra termina-lo. Então decidi quebrar e deixar a parte de Auth para o final.

Desculpem =(
