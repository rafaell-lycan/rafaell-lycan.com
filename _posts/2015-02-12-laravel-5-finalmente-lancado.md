---
layout: post
title:  "Laravel 5 é finalmente lançado!"
date:   2015-02-12
categories: php
tags: php laravel
image: assets/img/posts/whats-new-laravel5.jpg
keywords:
resumo: >
  Laravel 5 finalmente lançado! Vamos ver o que mudou, no que isso ajuda em nosso workflow, quais são os novas features para nós desenvolvedores, e como fazer upgrade sem quebrar sua aplicação.
related:
  - title: Laravel 5 Fundamentals (Laracasts)
    url: https://laracasts.com/series/laravel-5-fundamentals
  - title: Convert a Laravel Application from 4 to 5 (Youtube)
    url: https://www.youtube.com/watch?v=Qds4CUXxKjk
---
Essa semana é sem dúvidas para a comunidade Laravel, pois nesta ultima foi lançado em sua versão 5.0 com mais de 22 novas features, conta também com uma nova estrutura de diretórios, mudanças no Blade, Contratos, Eventos e muito mais.

Essa nova versão que inicialmente seria a 4.3 teve seu nome mudado por uma decisão acredito pelo core team do framework e isso foi anunciado pelo próprio [Taylor Otwell](https://twitter.com/taylorotwell) por conta de iniciativas interessantes da propria comunidade.

Como toda major version, tivemos várias mudanças na estrutura de pastas, componentes, etc... o que pode <del>e vai</del> acarretar em problemas em migrações de sistemas, isso é um fato, mas precisamos também entender que isso tudo é por um bem maior.

Nesses ultimos meses que se passaram, eu não pude acompanhar de perto o que estava acontecendo, apenas fiquei vendo as divulgações em alguns fóruns de discução até o lançamento, o que também me surpreendeu e muito até realmente entender as mudanças da versão 4.2 para a 5.

##Nova Estrutura de Diretórios
Acredito que uma das maiores mudanças dessa versão, foi sem dúvidas a mudança de diretórios e como será nosso fluxo de desenvolvimento a partir disso. Coisas que antes estavam dentro da pasta **app** foram movidas para fora e separadas por responsabilidade como **config**, **database**, **storage** e **resources**, o que faz todo sentido se pararmos para analizar esse contexto de responsabilidades.

Dentro da pasta **app** agora temos outras coisas divididas da seguinte forma:

- Commands
- Console
- Events
- Exceptions
- Handlers
- Http
- Providers
- Services

Caso você esteja mais acostumado com as versões anteriores do Laravel, isso pode pegar você um pouco desprevinido, mas depois de um tempinho utilizando tudo fica mais claro para trabalhar.

Para mais informações sobre essa nova estrutura de diretórios, leia [este post](https://mattstauffer.co/blog/laravel-5.0-directory-structure-and-namespace) do [Matt Stauffer](https://twitter.com/stauffermatt).

##Contratos
Bem, os contratos podemos são um conjunto de interfaces, que define alguns serviços dentro do core do framework. Pelo que entendi, isso serve apenas como uma documentação para as features do framework, embora que isso também possibilite a criação de classes abstratas e a utilização direta de alguns serviços.

##Blade
Bem, para aquele como eu que gostam de usar Blade, bem, ele não passou por uma série de mudanças como o restante do framework, mas tivemos [algumas mudanças](http://laravel.com/docs/5.0/templates#other-blade-control-structures) no Blade principalmente quando se trata de Form e dados brutos (raw), que realmente você vai precisar saber.

Como todos sabem, no Laravel 4 o Blade Template incluiu dois tipos de "sintax" para utilizarmos os colchetes duplos `{{ }}` e triplos `{{{ }}}`.

Bem, agora ambas servem apenas para escapar variáveis, e uma nova forma para dados brutos utilizando `{!! $ var !!}` como sempre utilizamos em forms por exemplo.

{% highlight php %}
{!! Form::open() !!}
{% endhighlight %}

##Eventos
Bem, não é novidade trabalhar com programação orientada a eventos com PHP, mas o que eu posso dizer é que na versão 5, ficou ainda mais fácil trabalhar com eventos no padrão [Pub/Sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern). É claro que pra tudo existe limites e cuidados, você não vai sair disparando eventos por toda a sua aplicação, a não ser que isso seja realmente necessário; e caso você achar isso necessário provavelmente você modelou o seu sistema errado.

Particularmente eu nunca utilizei eventos do Laravel em casos reais, até porque os sistemas que faço e mantenho são de pequeno porte, então não tenho necessidade de sair disparando eventos pela aplicação.

Você pode ver alguns exemplos de como isso funciona nos seguintes links:

- [Laravel 5 Events - Laracasts](https://laracasts.com/lessons/laravel-5-events);
- [Laravel 5.0 - Events & Handlers](https://mattstauffer.co/blog/laravel-5.0-events-and-handlers);
- [Events - Laravel Docs](http://laravel.com/docs/5.0/events);

##Socialite
[Socialite](http://laravel.com/docs/master/authentication#social-authentication) é um pacote opcional de integração com redes sociais abstraindo [OAuth](http://en.wikipedia.org/wiki/OAuth) de maneira ridiculamente simples, o que é muito melhor que ficar utilizando SDK's do Facebook e Twitter por exemplo.

Atualmente suporta Facebook, Twitter, Google e GitHub.

##Filesystem
Uma outra grande mudança foi a inclusão do [Flysystem](https://github.com/thephpleague/flysystem) que nada mais é do que uma abstração do sistema de arquivos que nos dá de graça para que você facilmente possa trocar entre seu filesystem local e remoto por exemplo. Algumas integrações (adapters):

- Local
- Amazon Web Services – S3
- Rackspace Cloud Files
- Dropbox

Isso quer dizer que é muito mais fácil fazer upload de arquivos para qualquer serviço disponível neste componente.

##Muito mais
Bem, acredito que essas foram as grandes mudanças, mas ainda assim tivemos também alguns novos comandos no **artisan**, novos atalhos como **view()** ao invés de **new View()** implementados como novos Facedes e Helpers, Controller Method Inject que nos permite colocar qualquer dependencia definida pelo tipo em nossos métodos como **public function store(Request $request)**, detecção de ambiente através de `$_ENV` e `$_SERVER`, [Elixir](http://laravel.com/docs/master/elixir) que nada mais é do que o Gulp compilando nossos assets, [Scheduler](http://laravel.com/docs/master/scheduling) que é uma espécie de CRON e muito mais.

##Upgrade
Fazer upgrade não é tão simples, afinal mudamos a versão major do framework, então não tente `composer update`.

Existe um [guia](http://laravel.com/docs/master/upgrade) no site oficial de fazer isso sem quebrar toda a sua aplicação e realmente vai te ajudar a entender como as coisas funcionam agora.