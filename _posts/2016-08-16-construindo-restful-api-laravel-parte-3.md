---
layout: post
title:  "Construindo uma API RESTful com Laravel - Parte 3"
date:   2016-08-16
tags: laravel php
image: assets/img/posts/laravel-api.jpg
keywords: laravel, construindo apis, api restful, laravel api, laravel cors
resumo: >
  No artigo anterior da série criamos nossas rotas e finalizamos nosso CRUD, mas enfim a jornada chega ao fim. Vamos trabalhar com validações, autenticação e tratamento de erros.

related:
  - title : Teach a Dog to REST
    url: https://vimeo.com/17785736
  - title : Tymon/jwt-auth.
    url: https://github.com/tymondesigns/jwt-auth
  - title : Trick - Validation within models.
    url: https://daylerees.com/trick-validation-within-models/
  - title : Laravel - Validation
    url: https://laravel.com/docs/5.2/validation
  - title : Create REST API using Laravel
    url: https://www.youtube.com/playlist?list=PLpvpznviFFFJUWlHylwipLLr1iLYs-cft
---
[No artigo anterior da série]({{site.baseurl}}2016/construindo-restful-api-laravel-parte-2/) criamos nossas rotas e adicionamos uma verificação básica de autenticação através de **middlewares**, mas enfim a jornada chega ao fim. Vamos trabalhar com **validações**, **autenticação** e tratamento de erros.

Nesta parte vamos tocar os seguintes tópicos do roadmap:

- Autenticação e Sessão
- Validações e tratamento de erros
- <del>Controle de cache com Redis</del>

## Autenticação e Sessão

Quando falamos de autenticação e sessão isso pode ser um assunto um tanto trivial para alguns, principalmente se pensarmos em aplicações web classicas, através de **forms de login** e sessão utilizando **cookies**. Mas desta vez estamos falando de uma API, a qual deveria ser **stateless** e com toda comunidação (request/response) simplificada utilizando JSON.

Nós vamos utilizar **JWT** *(Json Web Token)* para a comunicação em nossas rotas privadas, o qual irá conter as informações básicas do usuário que esta pedindo a requisição. Eu não vou explicar em detalhes o que é um JWT, mas você pode ler sobre isso neste artigo sobre *[Autenticação com Tokens em uma aplicação AngularJS]({{site.baseurl}}2016/autenticacao-jwt-angular-app/)* e entender os 3 elementos que formam um JWT válido.

Agora que estamos alinhados,vamos instalar o pacote `jwt-auth` em nosso `composer.json`. Atualize o bloco `require` incluindo o novo pacote:

{% highlight php %}
<?php
...

"require": {
    "php": ">=5.5.9",
    "laravel/framework": "5.1.*",
    "tymon/jwt-auth": "0.5.*"
},

{% endhighlight %}

Em seguida, vamos atualizar nossos pacotes rodando o comando abaixo:

{% highlight bash %}
composer update
{% endhighlight %}

Agora precisamos atualizar nosso array de providers no arquivo `config/app.php`. Procure pelo aray `providers` localizado na **linha 111** e adicione a seguinte linha:

{% highlight php %}
<?php
...

Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class
{% endhighlight %}

Também é necessário adicionar os facedes do pacote `jwt-auth` no mesmo arquivo. Procure logo abaixo um array chamado `aliases` e adicione essas duas linhas:

{% highlight php %}
<?php
...

'JWTAuth'   => Tymon\JWTAuthFacades\JWTAuth::class,
'JWTFactory' => Tymon\JWTAuthFacades\JWTFactory::class
{% endhighlight %}

Por fim, precisamos publicar os arquivos de configuração deste novo pacote. Fazemos isso rodando o comando abaixo:

{% highlight bash %}
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
{% endhighlight %}

Pronto! Foi criado o arquivo `config/jwt.php` que contem as configurações default do `jwt-auth`. Vamos gerar uma chave secreta para encriptar/decriptar nossos tokens através do comando abaixo:

{% highlight bash %}
php artisan jwt:generate
{% endhighlight %}

Isso irá gerar um novo valor em `secret` onde antes se encontrava `"changeme"` anteriormente. Também precisamos alterar o arquivo model do usuário que por default esta como `App\User`, e em nosso caso precisamos altera-lo para `App\Company`.

{% highlight bash %}
<?php
# config/jwt.php
...

'user' => 'App\Company',
{% endhighlight %}

Agora já podemos trabalhar com o pacote `jwt-auth` e com isso já podemos definir alguns pontos básicos da nossa aplicação como a autenticação em si. Com isso vamos criar um novo controller chamado `AuthController` só que desta vez não queremos um **resource controller**, então utilizamos a flag `--plain` no final do comando para cria-lo em branco:

{% highlight bash %}
php artisan make:controller AuthController --plain
{% endhighlight %}

Feito isso, vamos adicionar um novo *endpoint* em nosso grupo prefixado com `api` em nosso arquivo de rotas:

{% highlight php %}
<?php
# app/Http/routes.php
...

Route::post('auth/login', 'AuthController@authenticate');
{% endhighlight %}

Agora sabemos que o *endpoint* `/api/auth/login` através do verbo `POST` irá utilizar o método `authenticate` do nosso controller, então vamos desenvolve-lo:

{% highlight php %}
<?php
# app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Company;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Hash;

class AuthController extends Controller
{
    public function authenticate(Request $request) {
      // Get only email and password from request
      $credentials = $request->only('email', 'password');

      // Get user by email
      $company = Company::where('email', $credentials['email'])->first();

      // Validate Company
      if(!$company) {
        return response()->json([
          'error' => 'Invalid credentials'
        ], 401);
      }

      // Validate Password
      if (!Hash::check($credentials['password'], $company->password)) {
          return response()->json([
            'error' => 'Invalid credentials'
          ], 401);
      }

      // Generate Token
      $token = JWTAuth::fromUser($company);

      // Get expiration time
      $objectToken = JWTAuth::setToken($token);
      $expiration = JWTAuth::decode($objectToken->getToken())->get('exp');

      return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => JWTAuth::decode()->get('exp')
      ]);
    }
}
{% endhighlight %}

O código acima é bem simples, mas mesmo com os comentários vamos entender o que esta acontecendo passo a passo:

1. Pegamos da nossa requisição apenas `email` e `password`;
2. Procuramos pela primeira ocorrência no banco de dados onde a empresa tenha o mesmo email;
3. Verificamos se a empresa existe. Caso `null` enviamos um *erro** `401`;
4. Verificamos se o `password` bate com o **Hash** que temos gravado no banco de dados. Caso contrário enviamos um *erro** `401`;
5. Geramos o token com o facede `JWTAuth` através do método `fromUser`;
6. A partir do token gerado, pegamos a expiração no formato **timestamp** <del>através de mágia negra</del>;
7. Retormamo nosso um **JSON** contendo o token e outros valores como a expiração e o tipo do token.

Você deve ter percebido queutilizamos o método `fromUser` com um objeto do tipo `Company` certo? É por isso que fizemos aquela alteração no arquivo de configuração, mas também reparou que este código ainda esta falho pois não verificamos os dois parâmetros de entrada necessários *(`email` e `password`)* e ainda geramos um **timestamp** apenas para exibição na resposta.

Você realmente não precisa seguir este padrão de resposta que eu coloquei, eu simplesmente segui o padrão do [OAuth 2.0](http://oauth.net/2/) baseado na [RFC 6749](https://tools.ietf.org/html/rfc6749), mas nada te impede de retornar apenas o token.


<div class="center">
  ![Laravel Postman POST Authenticate](/assets/img/posts/laravel-api-postman-autenticate.png)
</div>

Agora já conseguimos criar nossos tokens, mas e quanto a recupera-los e intercepta-los em nossos requests? Primeiramente eu gostaria de informar que o pacote que escolhemos já resolve esse problema para nós através dos middlewares `jwt.auth` e `jwt.refresh`, porem vamos precisar configurar nossa model `Company` para suportar as implementações do driver de `Auth` e modificar o arquivo de configuração em `config/auth.php` para utilizar a classe `Company` por padrão ao invés de `User`:

{% highlight php %}
<?php
# config/auth.php
...

// Original
    'model' => App\User::class,

    'table' => 'users',

// Updated
    'model' => App\Company::class,

    'table' => 'companies',
...
{% endhighlight %}

Agora vamos adicionar nossos middlewares:

{% highlight php %}
<?php
# app/Http/Kernel.php
...

protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'jwt.auth' => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
    'jwt.refresh' => \TymonJWTAuth\Middleware\RefreshToken::class
];
...
{% endhighlight %}

Para evitarmos erros na hora de verificar os tokens, também precisamos **implementar algumas interfaces** em nossa classe `Company` e utilizar algumas **traits** que vai ficar desta forma:


{% highlight php %}
<?php
# app/Company.php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


class Company extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;
...
}
{% endhighlight %}

Agora vamos substituir nosso middleware `auth` por `jwt.auth` em ambos os controllers e pronto, já temos nossa implementação feita.

Agora falta muito pouco, pois com o token já conseguimos pegar o usuário o que vai nos permitir realizar alguns tratamentos em nossa aplicação.

Você pode testar a autenticação das rotas de duas formas, primeiramente adicionando `authorization` em sua header de requisição:

{% highlight text %}
Authorization: Bearer {token}
{% endhighlight %}

Ou simplesmente adicionar uma query string seguida pelo token no parâmetro `token`:

{% highlight text %}
http://localhost:8080/api/jobs?token={token}
{% endhighlight %}

Um aviso aos usuários de **Apache**, ele discarta a header `Authorization` em todas as requests, dessa forma você será forçado a reescrever a regra de configuração:

{% highlight text %}
RewriteEngine On
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
{% endhighlight %}

## Validações e tratamento de erros

É claro que em questão de segurança e domínio ainda estamos muito longe de algo aceitável, ainda precisamos de validações na criação e atualização de nossos recursos, identificar quem é a empresa que esta criando um novo job ao invés de simplesmente passar o `id` e outros pequenos tratamentos.

Uma das coisas que eu descobri depois de um ano utilizando Laravel, assim que virou para a versão 5 foi a facilidade de customizar tudo e utilizar como injeção de dependência.

Primeiramente você precisa notar que tanto em `store` quanto `update` utilizamos como injeção o objeto `Request`, então o que vamos fazer é criar um tipo de request com validações em nossas estradas, e é claro que vamos utilizar o **artisan** para isso.

{% highlight bash %}
php artisan make:request StoreCompanyRequest

php artisan make:request UpdateCompanyRequest

php artisan make:request JobRequest

php artisan make:request AuthenticateRequest
{% endhighlight %}

Sim você leu corretamente, com isso já podemos adicionar regras customizadas para nossas entradas. Esses arquivos foram criados em `app/Http/Request/`, e com isso já podemos respirar aliviados adicionando nossas validações e dormir em paz a noite. :)

{% highlight php %}
<?php
# app/Http/Requests/AuthenticateRequest.php

...
class AuthenticateRequest extends Request
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required',
            'password' => 'required'
        ];
    }
}
{% endhighlight %}

{% highlight php %}
<?php
# app/Http/Controllers/AuthController.php

...
use App\Http\Requests\AuthenticateRequest;

class AuthController extends Controller
{
    public function authenticate(AuthenticateRequest $request)
    {
    ...
    }
}
{% endhighlight %}

Em tese isso já resolve nosso problema, porem como nossas chamas são Ajax o retorno é sempre 200 seja para sucesso ou erro, o que implica ao exibir as mensagem de erro pois essa é uma forma de [validar erros de formulário](https://laravel.com/docs/5.2/validation#form-request-validation) onde conseguimos retornar mensagens de erro para o front, mas infelizmente não funciona com AJAX.

#### Validando models e sessão

É possível através de um código ligeiramente simples adicionar validadores a nossa aplicação. Veja um exemplo:

{% highlight php %}
<?php
...

// Validator Method
protected function companyValidator($request) {
    $validator = Validator::make($request->all(), [
        'name' => 'required|max:100',
        'email' => 'required|email|unique:companies'
    ]);

    return $validator;
}

public function store(Request $request)
{
  $validator = $this->companyValidator($request);

  if($validator->fails() ) {
      return response()->json([
          'message'   => 'Validation Failed',
          'errors'        => $validator->errors()
      ], 422);
  }
...
}
{% endhighlight %}

Com esse pequeno trecho de código já é possível criar uma validação com regras simples em `name` e `email` e prevenir que eu tente cadastrar algo sem todos os dados necessários.

Imagine que podemos tratar isso em nossas requisições `POST` e `PUT` previnindo assim registros em branco, e quando um erro ocorre, retornamos um JSON formatado com todos os erros e utilizando o status HTTP `422` como o retorno a seguir:

{% highlight javascript %}
{
  "message": "Validation Failed",
  "errors": {
    "name": [
      "The name field is required."
    ],
    "email": [
      "The email field is required."
    ]
  }
}
{% endhighlight %}

Gostou? Pois é o Laravel possui esses pequenos serviços como o `Validator`, que pode nos ajudar em coisas simples e pontuais. Poderiamos até mesmo realizar validações diretamente em nossas models mas nesse caso vamos expor nossas validações diretamente em nossos controllers, mesmo eu pensando que essa não é a maneira ideal.

{% highlight php %}
<?php
# app/Http/Controllers/AuthController.php

use Validator;


class AuthController extends Controller
{

...
    public function authenticate(Request $request) {
      // TODO: authenticate JWT
      $credentials = $request->only('email', 'password');

      $validator = Validator::make($credentials, [
          'password' => 'required',
          'email' => 'required'
      ]);

      if($validator->fails()) {
          return response()->json([
              'message'   => 'Invalid credentials',
              'errors'        => $validator->errors()->all()
          ], 422);
      }
...
{% endhighlight %}

Pronto, já validamos a entrada de autenticação da API. É claro que isso vai depender muito do que queremos validar exatamente, mas para nosso exemplo serve perfeitamente bem.

Agora vamos validar o cadastro e a atualização em `CompaniesController` em `store`, `update` e `delete`:

{% highlight php %}
<?php
# app/Http/Controllers/CompaniesController.php

use Validator;


class CompaniesController extends Controller
{

...
    public function __construct() {
        $this->middleware('jwt.auth', ['except' => ['index', 'show', 'store']]);
    }
...
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|max:100',
            'email' => 'required|email|unique:companies',
            'password' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
            ], 422);
        }

        $company = new Company();
        $company->fill($data);
        $password = $request->only('password')["password"];
        $company->password = Hash::make($password);
        $company->save();

        return response()->json($company, 201);
    }
...
    public function update(Request $request, $id)
    {
        $company = Company::find($id);
        $data = $request->all();

        // Verify if $company exists
        if(!$company) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        // Remove email from $data if it doesn't change
        if(array_key_exists('email', $data) && $company->email == $data['email']) {
            unset($data['email']);
        }

        $validator = Validator::make($data, [
            'name' => 'max:100',
            'email' => 'email|unique:companies',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
            ], 422);
        }

        $company->fill($request->all());

        // Verify if exists a new password on the request
        if (array_key_exists('password', $data)) {
            $company->password = Hash::make($data['password']);
        }

        $company->save();

        return response()->json($company);
    }

    public function destroy($id)
    {
        $company = Company::find($id);

        if(!$company) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        if(\Auth::user()->id != $company->id) {
            return response()->json([
                'message'   => 'You haven\'t permission to delete this entry',
            ], 401);
        }

        return response()->json($company->delete(), 204);
    }
...
{% endhighlight %}

O método `store` é bem simples, parecido com o exemplo anterior onde deixamos as 3 entradas como `required` e adicionamos uma validação extra em email onde informamos que deve conter o formato de email e também que ele deve ser único, baseado em nossa base em `companies`.

Já o método `update` tivemos que adicionar algumas regras extras como por exemplo verificar se o `email` é novo ou é o mesmo que já temos em nosso objeto `$company` para evitarmos receber o erro que o email já existe na base e continuar validando emails únicos. Além disso também fazemos a verificação se existe um novo `password` na request, e caso existir criamos um `Hash` a partir dele e finalmente atualizamos nosso registro.

Você também deve ter reparado que deixamos o método `store` fora da validação do middleware `jwt.auth`, isso acontece porque não vamos estar logados quando criarmos uma empresa, já que precisamos de uma para se logar no sistema.

Enquanto isso temos a mesma validação de identidade em `update` e `delete` que através do objeto `Auth` temos todas as informações usuário autenticado via token, e dessa forma verificamos se o registro a ser alterado/removido pertence ao mesmo. Bem simples e funcional.

Novamente essa pode não ser a melhor forma de fazer isso, porem eu não encontrei <del>procurei pouco</del> uma forma melhor de realizar essas validações. Poderiamos como eu disse realiza-las diretamente em nossa model, mas isso vai de cada caso e nesse em especifico não julguei necessário.

Agora vamos adicionar algumas validações em nosso `JobsController`:

{% highlight php %}
<?php
# app/Http/Controllers/JobsController.php

use Validator;


class JobsController extends Controller
{

...
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => 'required|max:255',
            'description' => 'required',
            'local' => 'required',
            'remote' => 'in:yes,no',
            'type' => 'integer',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
            ], 422);
        }

        $job = new Job();
        $job->fill($data);
        $job->company_id = \Auth::user()->id;
        $job->save();

        return response()->json($job, 201);
    }
...
    public function update(Request $request, $id)
    {
        $job = Job::find($id);

        if(!$job) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        if(\Auth::user()->id != $job->company_id) {
            return response()->json([
                'message'   => 'You haven\'t permission to change this entry',
            ], 401);
        }

        $validator = Validator::make($data, [
            'title' => 'max:255',
            'remote' => 'in:yes,no',
            'type' => 'integer',
        ]);

        if($validator->fails()) {
            return response()->json([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
            ], 422);
        }

        $job->fill($request->all());
        $job->save();

        return response()->json($job);
    }

    public function destroy($id)
    {
        $job = Job::find($id);

        if(!$job) {
            return response()->json([
                'message'   => 'Record not found',
            ], 404);
        }

        if(\Auth::user()->id != $job->company_id) {
            return response()->json([
                'message'   => 'You haven\'t permission to delete this entry',
            ], 401);
        }

        $job->delete();
    }
...
{% endhighlight %}

Veja que as validações são bem similares as anteriores, contudo, dessa vez adicionamos uma validação do tipo **enum** para `remote` e esperamos que o valor de `type` seja **integer**.

Perceba também que estamos adicionando o `company_id` baseado no id do usuário da sessão, o que facilita o relacionamento para nós e ainda adicionamos a simples validação para que apenas a empresa só possa alterar/remover seus proprios jobs.

#### Tratando erros

Fizemos praticamente todas as validações necessárias em nossa API, entretanto faltou uma simples verificação para erros `404` quando um recurso não existe e `405` para um verbo HTTP não suportado em um determinado endpoint. Para isso vamos alterar o arquivo `Handler.php` que é responsável por lidar por quaisquer tipos de **exception** que nossa aplicação possa ter.

{% highlight php %}
<?php
# app/Exceptions/Handler.php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
...
    public function render($request, Exception $e)
    {
    ...
        // Not found exception handler
        if($e instanceof NotFoundHttpException) {
            return response()->json([
                'error' => [
                    'description' => 'Invalid URI',
                    'messages' => []
                ]
            ], 404);
        }

        // Method not allowed exception handler
        if($e instanceof MethodNotAllowedHttpException) {
            return response()->json([
                'error' => [
                    'description' => 'Method Not Allowed',
                    'messages' => []
                ]
            ], 405);
        }

        return parent::render($request, $e);
    }
...
{% endhighlight %}

Com as verificações `NotFoundHttpException` e `MethodNotAllowedHttpException` já resolvemos o problema, inclusive a APP já pode ser considerada pronta para produção.

## Update
Então cadê a parte Redis? Pois é, depois de algumas horas escrevendo esta parte do artigo eu reparei que não valeria a pena adicionar **redis** ao projeto, já que os registros podem mudar frequentemente (ou não), mas ideia era bem simples, criar um cache para os registros, assim toda vez que os métodos `index` e `show` fossem chamados, nós iriamos buscar diretamente no cache os dados ao invés de bater no banco de dados. E toda vez que uma nova vaga/empresa fosse adicionada, atualizada ou deletada, nós atualizariamos o cache. Bem simples na verdade.

Mas como não quero demorar mais uma semana para escrever esse artigo acho válido deixar em aberto que é possível e dependendo do tamanho do seu projeto é uma boa escolha.


