---
layout: post
title:  "Construindo uma API RESTful com Laravel - Parte 1"
date:   2015-12-10
tags: laravel php
image: assets/images/posts/laravel-api.jpg
keywords: laravel, construindo apis, api restful, laravel api, laravel cors
description: >
  Nesta série vamos criar uma pequena aplicação focando em desenvolver uma API RESTful para armazenar vagas de emprego e ver como o Laravel nos ajudará com isso.

related:
  - title : Teach a Dog to REST
    url: https://vimeo.com/17785736
  - title : Database - Migrations
    url: http://laravel.com/docs/5.1/migrations
  - title : Eloquent - Getting Started
    url: http://laravel.com/docs/5.1/eloquent
  - title : Eloquent - Relationships
    url: http://laravel.com/docs/5.1/eloquent-relationships
---
Primeiramente, quero deixar claro que não vou me aprofundar muito em padrões de projeto nem otimizações. O foco aqui é resolver pequenos problemas que tive e que gostaria de compartilhar com vocês, mesmo que existam materiais em inglês com mais detalhamentos, etc.

Se você já entende bem os conceitos de como o Laravel funciona, como utilizar o `Route` de uma forma mais organizada, com **grupos**, **middlewares**, tipos de `response` como **json**, proteção contra [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) e [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), talvez esse post não seja destinado a você.

***Mas sinta-se a vontade para me dar feedback de onde posso melhorar.***

## Objetivo

Construir uma API RESTful para armazenar vagas de emprego cadastradas por uma empresa. Simples não?

Vamos a um Roadmap do que irei abordar nesta série:

- [Instalação e configuração do Laravel](#instalao)
- [HTTP e RESTful](#http-e-o-restful)
- [Models e Migrations](#models-e-migrations)
- Controllers e Rotas
- Middlewares
- Autenticação e Sessão
- Validações e tratamento de erros
- Controle de cache com Redis

Se der tempo <del>e coragem</del>, eu posso colocar testes também.

## Instalação
Vamos utilizar o [Composer](https://getcomposer.org/) para criar nosso novo projeto, nada de clonar o repositório nem nada do tipo.

{% highlight text %}
composer create-project laravel/laravel laravel-api
{% endhighlight %}

Quando a instalação terminar, vá ate a pasta criada e abra em seu editor de preferência.

Existe uma pequena coisa que precisamos resolver antes de começarmos a desenvolver nosso serviço RESTful, e se não resolvermos isso logo após a instalação, isso vai nos empacar no meio do desenvolvimento e provavelmente não vamos achar isso legal.

Por padrão, a partir da versão 5, o Laravel usa por padrão um middleware para previnir CSRF. Porem, não estamos construindo websites, mas sim uma API, o que perde faz esse middleware perder completamente o sentido em nosso projeto.

Para remove-lo, e para fazer isso vamos até a pasta **app/Http** e abrir o arquivo **Kernel.php**. Nele, vamos remover a seguinte linha:

{% highlight text %}
\App\Http\Middleware\VerifyCsrfToken::class,
{% endhighlight %}

Vamos também remover alguns arquivos inuteis como nossa view default **welcome.blade.php** dentro de **resources/views** e qualquer controller default que a app tenha criado dentro de **app/Http/Controllers**.

Vamos ao **setup** da nossa API utilizando o **.env**, recurso adicionado na versão 5 do framework. Vamos renomear o arquivo `.env.example` para apenas `.env`, e adicionar algumas como banco de dados:

{% highlight text %}
APP_ENV=local
APP_DEBUG=true
APP_KEY=6894RPBq2sEylIP3C5XDUnEniIRwreLT

DB_HOST=localhost
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
{% endhighlight %}''

No caso eu apenas adicionei o usuário **root** do meu **MySQL** e a minha senha praticamente inquebravel.

O `APP_KEY` normalmente é gerado na instalação, mas caso algo dê errado, você pode executar o comando `php artisan key:generate`.

Em nosso MySQL vamos apenas precisar criar o banco de dados, todo o resto sera feito através de [migrations](https://en.wikipedia.org/wiki/Data_migration).

Acesse seu banco de dados e crie o database `laravel`:

{% highlight text %}
CREATE DATABASE laravel
{% endhighlight %}

Por ultimo, mas não menos importante, em `/config/app.php` vamos alterar o **timezone** da nossa aplicação para `America/Sao_Paulo`. Eu particularmente não gosto de utilizar UTC na aplicação, a não ser que seja realmente necessário.

## HTTP e o RESTful
Antes de ir mais além em nível de código, vamos ver rapidamente uma abordagem sobre HTTP e RESTful, porque se vamos falar de APIs, acho válido também citar a base da coisa.

#### Porque REST/RESTful?
REST é uma maneira simples de realizar e permitir interações entre sistemas independentes que ganhou força nos últimos anos inspirado pelo HTTP.

Nossa *app* utiliza o conteito **RESTful** sob o protocólo **HTTP**, ou seja, utilizando *URLs*, *verbos HTTP* e *status code*.

#### HTTP
HTTP é o protocolo que nos permite enviar e receber documentos através da web. No conceito do HTTP temos o **servidor** e o **cliente** que em linhas gerais se comunicam através do protocolo através de mensagens de texto, ou bits de texto mesmo que no corpo da mensagem possa existir algum tipo de mídia, tudo isso é transferido através de trocas de mensagens utilizando bits de texto.

#### URLS
São as responsáveis por serem os identificadores para obter algum recurso, assim como páginas na web, como a página de contato, artista, entre muitas outras que um site possa ter.

Seguindo esse pensamento, cada URL é um tipo de recurso, vamos considerar a nossa aplicação com algumas URLs simples:

{% highlight text %}
/jobs               // Returns all jobs
/jobs/add           // Render a form to add a new job
/job/123            // Return the job with ID 123
/companies/123      // Returns the company with ID 123
/companies/123/edit  // Render a form to edit the company with ID 123
{% endhighlight %}

No padrão *RESTful* utilizamos por convenção nossas URLs (também chamados de ***endpoint***) sempre no plural, indiferente do retorno ser um único registro por conta do ID passado como segundo parâmetro. Recursos são identificadores únicos.

***Mas e se eu precisar de uma action diferente? Salvar, Criar, Atualizar, Deletar?***

Simples meu caro, para isso utilizamos os verbos HTTP.

#### Verbos HTTP
A cada requisição realizada, é utilizado um tipo de verbo HTTP no cabeçalho da requisição. Exemplo:

{% highlight text %}
GET     /jobs           // Returns all jobs
DELETE  /job/123        // Delete the job with ID 123
POST    /companies      // Create a new company through post data
PUT     /companies/123  // Update a company with ID 123
{% endhighlight %}

Se você cria formulários com HTML, você já deve estar familiarizado com os dois métodos mais importantes do verbo HTTP: **GET** e **POST**. Mas além deles, temos outros métodos também disponíveis que são muito importantes para criarmos uma aplicação *RESTful* como *GET*, *POST*, *PUT* e *DELETE*. Ainda existem outros como o *OPTIONS* e *HEAD*, mas não quero ir muito a fundo neste assunto.


- **GET** é o método HTTP mais simples. Utilizado toda vez que você clica em um link ou digita uma URL no browser. Uma requisição *GET* não deve modificar nenhum recurso em seu sistema, ou seja, deve apenas recuperar informações; <br>
**Ex:** Listagem das vagas. `GET /api/jobs` <br>
- **POST** é utilizado quando precisamos processar algo no servidor, adicionar informações a um recurso ou criar um novo recurso. Quando enviamos um formulário de cadastro para o servidor, que envia um corpo em seu request a uma URL especifica; <br>
**Ex:** Criação de um Job ou uma Empresa. `POST /api/jobs` <br>
- **PUT** é utilizado quando queremos criar ou atualizar um recurso existente através de um *endpoint* especifico. A grande diferença entre *PUT* e *POST* é que além utilizarem *endpoints* diferentes, o *POST* utiliza uma URL onde vai ser tratada a informação e o *PUT* utiliza o *endpoint* em que a informação será armazenada/atualizada em sí; <br>
**Ex:** Atualizar dados da Empresa ou Job. `PUT /api/jobs/1` <br>
- **DELETE** é utilizado quando queremos remover algum recurso passado por uma URL especifica; <br>
**Ex:** Deletar um Job. `DELETE /api/jobs/1`

#### Status Code
Eu particularmente acho essa parte como uma das mais importantes e também uma das mais discutidas.

**Status Code / Response Codes** é a forma padrão de informar ao cliente sobre o resultado de uma requisição feita ao servidor. Essas informações ficam contidas nas **headers** das requisições HTTP que por padrão carregam alguns tipos de dados como o **status code**, **encode**, **content type**, etc.

Alguns desenvolvedores utilizam convenção de status 200 (OK) para alguns erros de requisição como um registro não encontrado e coisas do tipo, já outros preferem utilizar erros na faixa dos 400 ou 500 para facilitar o tratamento no cliente, mas isso varia muito.

O servidor deve retornar o status mais apropriado para cada tipo de requisição. Dessa forma o cliente consegue tratar mais facilmente erros entre outras coisas. O erro mais familitar que a maioria conhece é o 404 (Not Found), ainda assim existem vários outros que podem ser muito úteis para se utilizar em seu serviço.

Alguns dos **status code** mais utilizados em uma arquitetura REST:

#### 200 OK
Indica que uma requisição foi feita com sucesso.

#### 201 Created
Indica que uma requisição foi feita com sucesso e que um recurso foi criado. Normalmente utilizamos esse padrão de resposta para **POST** e **PUT**.

#### 400 Bad Request
Infica que uma requisição não possuí um formato especifico. Normalmente utilizada quando alguma validação de dados não passa, ou quando esta faltando algum dado ou até mesmo um formato errado. Muito comum utilizar como erro de retorno para **POST** e **PUT**.

#### 401 Unauthorized
Indica que o recurso ou *endpoint* precisa de um requisição autenticada antes de proseguir.


#### 404 Not Found
Indica que o recurso da requisição não existe. Normalmente utilizado quando um **endpoint** não corresponde com nenhuma rota registrada na aplicação.

#### 405 Method Not Allowed
Indica que o método HTTP utilizado não esta disponível para aquele *endpoint*.

#### 409 Conflict
Indica que um conflito ocorreu durante a requisição. Por exemplo, isso poderia ocorrer quando você utiliza **PUT** para atualizar o mesmo registro com dados duplicado, pode não ser um exemplo muito bom, mas não tenho nada melhor em mente.

#### 422 Unprocessable Entity
Indica que a request foi realizada e entendida pelo servidor, porem não foi possível proceguir devido a erros no formato/parâmetros informados. Por exemplo, o erro pode ser lançado caso você espere um XML como parâmetro mas ao invés disso o cliente envia um JSON, ou em um caso mais simplificado poreriam ser valores obrigatórios em um JSON que não correspondem com um modelo/validação.

#### 500 Internal Server Error
Indica uma falha do lado servidor, normalmente utilizamos quando algo inesperado acontece do lado servidor.

Em geral, devemos assumir que as respostas HTTP devem ser utilizadas para melhorar o tipo de resposta da nossa aplicação, mas sempre visando o bom senso, tente utilizar da forma correta principalmente quanto aos códigos de erro.

Aos que gostam de cachorros, existe um site que mostra todos os HTTP Status Code [bem aqui](http://httpstatusdogs.com/).

## Models e Migrations
Nossa App será bem simples, vai consistir em duas models: **Company** que sera referente as empresas(usuários) cadastrados em nossa app, e **Job** referente as vagas cadastradas.


Primeiramente vamos criar nosso model **Company**:
{% highlight text %}
php artisan make:model Company
php artisan make:model Job
{% endhighlight %}

{% highlight php %}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
}

{% endhighlight %}

{% highlight php %}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
}

{% endhighlight %}

Certo, agora vem a parte onde vamos utilizar **migrations**, que funcionam como controle de versão para nosso banco de dados quando precisamos criar/modificar tabelas ou suas propriedades.

Para saber mais sobre **migrations** no Laravel, acesse [este link](http://laravel.com/docs/5.1/migrations).

Agora vamos pensar em nossos **schemas**. Um Job pertence a uma empresa (Company), ou seja, a empresa pode ter N jobs, logo temos uma relação **1:N**.

Quanto aos tipos de dados, vamos ir pelo básico:

- **Company** tem um *nome*, *email* para login/login, url para o *website*, url para o *logo* e uma *senha*;
- **Job** possui um *titulo*, uma *descrição*, um *local* de trabalho, se é permitido trabalhar remotamente e o *tipo* do job.

Além é claro que o **Job** esta vinculado a uma **Company**, então baseado nisso vamos criar nossas *migrations* começando pela nossa tabela **Companies**;

{% highlight text %}
php artisan make:migration create_companies_table --create=companies
{% endhighlight %}

{% highlight php %}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->string('email', 60);
            $table->string('website');
            $table->string('logo');
            $table->string('password', 64);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('companies');
    }
}

{% endhighlight %}

Vamos a explicação básica:

- Criamos uma migration através de nosso CLI **artisan** para a tabela **companies**
- Adicionamos um **Schema** base restringindo o tamanho de algumas colunas como *name*, *email* e *password*;
- Informamos que a coluna *email* sera do tipo `UNIQUE`, para não termos logins duplicados em nosso sistema;
- Também incluimos **timestamps** que nos geram dois **timestamp** `create_at` e `update_at`, bem como **soft delete** que nos gera um **timestamp** `deleted_at`.

Para aqueles que ainda não estão familiarizados com o processo de *migragions* e o [Eloquent](http://laravel.com/docs/5.1/eloquent), ele utiliza essas 3 colunas com o principio de sempre ter uma referencia sobre os dados criados, atualizados e removidos, que no caso não são removidos de fato quando utilizamos `softDeletes()`, o **Eloquent** modifica a query caso essa coluna exista na tabela utilizando a clausula **WHERE**, algo como `WHERE delete_at IS NULL` na hora de trazer o resultado.

Vamos agora criar a migration para nossa tabela **Jobs**, a qual tera uma referencia para a tabela **Companies** através de uma **foreign key**.

{% highlight text %}
php artisan make:migration create_jobs_table --create=jobs
{% endhighlight %}

{% highlight php %}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->longText('description');
            $table->string('local');
            $table->enum('remote', ['yes', 'no']);
            $table->integer('type');
            $table->integer('company_id')->unsigned();
            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jobs');
    }
}

{% endhighlight %}

Rapida explicação:

- Migration através do **artisan CLI**;
- Adicionamos um **Schema** simples utilizando tipos como `INT`, `VARCHAR`, `ENUM`, `LONGTEXT`, etc;
- Também adicionamos **timestamps** e **softDeletes** pelas mesmas razões da tabela posterior;
- Adicionamos uma **foreign key** `company_id` com a regra **unsigned** para não manter um relacionamento restrito ao criar/modificar as tabelas;
- Informamos a referencia a tabela **Companies** e utilizamos o  **delete cascade** quando o ID referênte for deletado.

Chega de explicações chatas, vamos apenas atualizar nossas models:

{% highlight php %}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['name', 'email', 'website', 'logo', 'password'];

    protected $hidden = ['password'];

    protected $dates = ['deleted_at'];

    public function jobs()
    {
        return $this->hasMany('App\Job');
    }
}

{% endhighlight %}

{% highlight php %}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = ['title', 'description', 'local', 'remote', 'type', 'company_id'];

    protected $dates = ['deleted_at'];

    function company() {
        return $this->belongsTo('App\User');
    }
}

{% endhighlight %}

Pronto, agora com nossas *models* atualizadas, definimos **white lists** através do atributo `$fillable`, utilizamos o relacionamento através `belongsTo` e `hasMany` em métodos específicos para nos trazer a listagem da relação dos models, além de  deixamos explicito que estamos utilizando **soft delete** através do atributo `$dates`.


A nível de teste, você pode criar um simples **seed** para inserir os primeiros dados da nossa *app*:

{% highlight php %}
// CompaniesSeed.php
<?php

use Illuminate\Database\Seeder;

class CompaniesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Company::create([
            'name' => str_random(10),
            'email' => str_random(10).'@gmail.com',
            'password' => bcrypt('secret'),
        ]);
    }
}

{% endhighlight %}

{% highlight php %}
// JobsSeed.php
<?php

use Illuminate\Database\Seeder;

class JobsSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Job::create([
            'title' => str_random(10),
            'description' => str_random(1000),
            'local' => 'São Paulo / SP',
            'title' => str_random(10),
            'remote' => 'no',
            'type' => 3,
            'company_id' => 1,
        ]);
    }
}

{% endhighlight %}

{% highlight php %}
// DatabaseSeeder.php
<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(CompaniesSeed::class);
        $this->call(JobsSeed::class);

        Model::reguard();
    }
}

{% endhighlight %}

Você pode inclusive testar via o [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) do Laravel através do comando `php artisan tinker`.

{% highlight text %}
var_dump( App\Company::all() );

$company = App\Company::find(1);
var_dump($company->jobs);
{% endhighlight %}

No proximo artigo desta série, vamos abordar os *Controllers*, *Rotas*, tipos e mensagens de *erro*  e retornar valores em JSON.
