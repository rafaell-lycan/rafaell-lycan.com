---
layout: post
title:  "Laravel Valet: Agilidade no seu ambiente local"
date:   2016-06-11
tags: laravel tools
keywords: laravel valet, valet, laravel environment, homestead alternative
resumo: >
  Entenda como obter agilidade em um ambiente de desenvolvimento minimalista com essa alternativa ao Homestead mesmo se você não esta utilizando Laravel.
related:
  - title: Laravel Valet
    url: https://laravel.com/docs/5.2/valet
  - title: Announcing Laravel Valet (Post)
    url: https://laravel-news.com/2016/05/announcing-laravel-valet/
  - title: What Is Laravel Valet, and Why All the Fuss?
    url: https://www.sitepoint.com/what-is-laravel-valet-and-why-all-the-fuss/
  - title: Quick Start Using Homebrew on Mac OS X
    url: https://github.com/thecodersguild/quick-start-using-homebrew-on-mac-os-x
  - title: Local WordPress Development With Laravel Valet
    url: https://www.youtube.com/watch?v=Ai-HogVDxq4
---
Se você esta familiarizado com a comunidade PHP, provavelmente você deve estar familiarizado com o grande número de framework populares nesse meio hoje. Um dos mais falados da atualidade é o [Laravel](https://laravel.com/).

Recentemente (6 de Maio), [@taylorotwell](https://twitter.com/taylorotwell) (criador do Laravel) lançou algo chamado [Valet](https://laravel.com/docs/5.2/valet) (ou mais especifico "Laravel Valet"), que visa fazer o seguinte:

>"Valet is a Laravel development environment for Mac minimalists. No Vagrant, No Apache, No Nginx, No /etc/hosts file. You can even share your sites publicly using local tunnels. Yeah, we like it too."

Aparentemente foda não é mesmo?

O mais legal é que o Taylor disse em poucas palavras que a motivação foi:

>"I wanted to have the convenience of `php artisan serve` without ever having to run `php artisan serve`"

Veja um comercial criado por [@adamwathan](https://twitter.com/adamwathan) mostrando como Valet funciona. Vale a pena assistir, tem algumas partes bem divertidas em que ele solta alguns palavrões (som de bips).

<div class="center">
<iframe width="640" height="400" src="https://www.youtube.com/embed/H3Z4Gk9Wc0s?rel=0" frameborder="0" allowfullscreen></iframe></div>

Eu particularmente fiquei alguns meses longe da comunidade Laravel e não consegui postar antes, porem isso foi bom por conta das melhorias e tudo mais o que rolou para as versões seguintes.

## Mas já mudou?

Inicialmente, Valet utilizava um mini servidor HTTP através do [DnsMasq](https://en.wikipedia.org/wiki/Dnsmasq) para processar as requisições para o domínio `.dev` em seu ambiente local. Bem, na versão 1.1.0 que foi lançada alguns dias depois, eles colocaram o [Caddy](https://caddyserver.com/) como servidor que possibilitou melhorias significativas e também permitiu ter multiplus apps utiizando Valet sem bloquear o servidor.

Se você já instalou e não gostou, ou mesmo se você esta feliz com a versão anterior, atualiza ai:

{% highlight php %}
composer global update
{% endhighlight %}

Depois disso execute o comando `valet install` para criar um novo arquivo do **Caddy** (Caddy daemon) no seu sistema.

## Suporte

Bem, este é o ponto que eu quero tocar e espero que você que é desenvolvedor PHP (até mesmo os xiitas) entendam meu ponto.

Eu sou desenvolvedor PHP a pouco mais de 2 anos. Passei do estruturado ao pseudo OO, CodeIgniter, Zend/Magento e outras drogas.

Quando eu li sobre o Valet, uma das coisas que mais me tocou na sua [documentaçao](https://laravel.com/docs/5.2/valet) foi que ele instala o mínimo possível em seu ambiente OSX (preciso atualizar meu dotfiles), é rápido e tem **suporta diversos frameworks**:

- Laravel
- Lumen
- Symfony
- Zend
- CakePHP 3
- WordPress
- Craft
- Statamic
- Jigsaw
- Static HTML

Sejamos sinceros, é muito foda isso, inclusive já testei com WordPress e Symfony e rodou lindamente.

Então, você não precisa desenvolver especificamente no Laravel para ter um bom ambiente de desenvolvimento.


#### OSX Only

Sim, por hora o suporte esta disponível apenas para OSX, e sim essa é a maior reclamação daqueles que descobrem e entendem o Valet.

Embora seja possível faze-lo funcionar no Linux por conta da arquitetura que ambos os sistemas tem e o suporte a versões mais antigas do PHP. Windows provavelmente nunca sera uma opção ao Valet, mas isso quem irá dizer é o tempo.

Não, não é uma conspiração voltada a usuários apple, o lance é, com o gerenciador de pacotes do OSX ([Homebrew](http://brew.sh/)), fica muito fácil desenvolver projetos por conta da variedade de pacotes e outros padrões pré-instalados.

## Setup
Para instalar o Laravel Valet é bem simples na verdade, basta você ter um Mac e algumas ferramentas instaladas.

#### Requisitos

- Sistema Operacional Mac;
- [Homebrew](http://brew.sh/);
- Não ter nenhuma programa utilizando a sua porta :80 como o Apache ou Nginx.

#### 1. Instalando o Homebrew

Bom para que  não sabe o [Homebrew](http://brew.sh/) é o gerenciador de pacotes do OSX, e sem dúvidas é a forma mais fácil de instalar pacotes no sistema. Para instalar, basta rodar o comando abaixo em no terminal:

{% highlight php %}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{% endhighlight %}

Se você receber algum tipo de erro durante a instalação, verifique se você já possui o **Xcode Command Line Tools**.

#### 2. Atualizando o Homebrew

Caso você já utilize o Homebrew, sempre é uma boa opção atualiza-lo através do comando `brew update`;

{% highlight php %}
brew update
{% endhighlight %}

Aproveite também para verificar se todos os serviços estão funcionando através do comando `brew services list`;

{% highlight php %}
brew services list
{% endhighlight %}

#### 3. Instalando o PHP 7.0

Sim, nós vamos utilizar o PHP 7 com o Valet. Caso você pense que isso pode ser um problema, basta apenas verificar se a sua aplicação rode em versões anteriores, como por exemplo o WordPress que a **versão mínima é o 5.2.4**. O legal de se utilizar o PHP 7 é que  podemos utilizar coisas novas em nosso sistema, mas se você não encherga a necessidade disso e seu desenvolvimento é focado em um ambiente de produção com versões anteriores pode prosseguir com o desenvolvimento normalmente.

Para instalarmos o PHP 7 via **brew**, utilize o comando: `brew install php70`;

{% highlight php %}
brew install php70
{% endhighlight %}

#### 4. Instalando o Valet

Agora vamos instalar o Valet, e para fazer isso você precisa ter o [Composer](https://getcomposer.org/) instalado na sua maquina globalmente. Veja na [documentação oficinal](https://getcomposer.org/doc/00-intro.md) como faze-lo.

Verifique se você tem o Composer instalado globalmente no seu PATH (Se você trabalha a algum tempo com PHP você provavelmente já tem), caso contrário adicione ao seu `.bash_profile` a seguinte linha:

{% highlight php %}
export PATH="$PATH:$HOME/.composer/vendor/bin"
{% endhighlight %}

Feito isso, execute no terminal o comando: `composer global require laravel/valet`;

{% highlight php %}
composer global require laravel/valet
{% endhighlight %}


Até este ponto nós apenas adicionamos as dependências necessárias e precisamos instalar de fato o Valet, e para faze-lo, basta rodar o comando: `valet install`;

{% highlight php %}
valet install
{% endhighlight %}

**Pronto.**, veja um fragmento interessante da documentação:

>"Valet will automatically start its daemon each time your machine boots. There is no need to run `valet start` or `valet install` ever again once the initial Valet installation is complete."

#### 5. Comandos

Uma vez que o Valet esta instalado, você tem tudo necessário para testar seus sites, mas antes disso você precisa saber os comandos básicos que ele possui, nesse caso vamos começar pelos 2 mais básicos:

- `park`: Adiciona um diretório inteiro ao Valet;
- `link`: Cria uma link simbólico de um único site para o Valet.

Eu particularmente utilizo o `park` no diretório `~/Sites` no meu usuário, e cada pasta vira um projeto Valet a ser executado. Por exemplo se eu executar dentro do diretório o comando `laravel new blog` eu posso simplesmente abrir meu navegador e acessar `http://blog.dev` e a tela de boas vindas do Laravel vai aparecer.

Se você quiser utilizar um folder que esta em outro lugar no seu sistema, o comando `link` pode ser mais interessante. Se eu estiver por exemplo na minha pasta `~/Downloads` e rodar o comando `valet link minha-app`, isso irá criar um link simbólico dentro para o meu diretório Valet e também vai me permitir abrir no meu navegador `http://minha-app.dev`.

Para verificar todos os links criados você pode utilizar o comando `valet links` e caso não esteja mais utilizando algum deles ou o folder não exista mais utilize `valet unlink nome-da-app`.

Uma outra coisa interessante é que você pode compartilhar a URL da sua aplicação com outras pessoas através do comando `share`, para isso basta acessar a pasta do seu projeto (ex: `~/Sites/blog`) e executar `valet share`. Isso vai exibir a URL pública que pode ser vista em qualquer navegador (é bem similar ao [BrowserSync](https://www.browsersync.io/)).

Existem outros comandos que você pode visualizar através do comando `valet --help`.

Existem uma série de comandos úteis como `logs` que eu acho muito útil quando estou utilizando o Laravel, `start`, `stop`, `restart` e muitos outros.

## Conclusão
É claro que eu ainda preciso utilizar muito mais o Valet, além disso ele possui **algumas PR's** com supostas melhorias, e por ser novo é bem provavel que seja reportado um problema ou outro.

É bem provavel que em posts futuros eu mostre o setup de alguma aplicação utilizando a ferramenta.

Dúvidas, críticas e sugestões relacionadas ao post serão muito bem vindas.
