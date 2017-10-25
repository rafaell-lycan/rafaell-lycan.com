---
title: 'Utilizando Laravel Valet no Ubuntu'
date:  2017-10-23
tags: laravel php tools
description: >
  Saiba como instalar Laravel Valet no Ubuntu, você pode utilizar todas as features do Valet e se livrar das configurações desnecessárias para configurar seu ambiente de desenvolvimento.
---

Primeiro eu gostaria de esclarecer que só descobri tal feito devido a um [Meetup](https://www.meetup.com/Barcelona-on-Rails/events/244065623/) aqui em Barcelona na semana passada, e o melhor, não tinha nada a ver com PHP, mas um dos membros com N stickers de PHP em seu notebook ensinou-me o caminho das pedras. :metal:

Depois de passar um tempo utilizando [Laravel Valet](https://laravel.com/docs/master/valet), você nunca mais vai querer fazer o setup de uma aplicação PHP na sua maquina de novo, porem, recebi algumas pessoas comentando se já existia uma versão para Linux já que no [post anterior](/2016/utilizando-laravel-valet/) expliquei que ele foi feito para OSX.

Ao menos o desenvolvimento oficial do projeto foi feito para usuários Apple, mas como grande maioria dos desenvolvedores utilizam alguma distribuição Linux, acredito que a comunidade PHP viu ~~ou não~~ as vantagens de ter um ambiente de desenvolvimento em alguns minutos com praticamente nenhuma configuração.

O módulo [Valet Linux](https://cpriego.github.io/valet-linux/) foi criado pelo [@cpriego](https://github.com/cpriego) e tem uma documentação simples e clara.

Eu utilizei a distribuição [Ubuntu](https://www.ubuntu.com/) em sua ultima versão *(17.10)*, mas acredito pode você possa utilizar a distribuição de sua preferência.

## Instalação

A instalação é bem simples, primeiro de tudo tenha certeza que você tenha instalado ao menos a versão 5.6 do PHP *(recomendo utilizar o 7)* e também o [Composer](https://getcomposer.org/).

Depois, você precisa adicionar os seguintes pacotes:

```bash
sudo apt-get install libnss3-tools jq xsel
```

Por fim instalamos o pacote via **composer** e rodamos o comando para fazer o setup inicial:

```bash
composer global require cpriego/valet-linux
valet install
```

Se você tiver algum serviço rodando como o **Apache** ou **Nginx** por exemplo, tenha certeza de parar o processo e rodar o comando `valet install` novamente.

Depois disso, você pode utilizar os comandos `park`, `link` e `status` mencionados no [post anterior](/2016/utilizando-laravel-valet/).

Por vício, eu criei uma pasta em `/var/www/` e adicionei um link simbólioco na `/home` do meu usuário como `www`, e além disso, você pode instalar o [phpMyAdmin](https://www.phpmyadmin.net/) para gerenciar o seu Banco de Dados criando um link simbólico para onde esta configurado seu `park`, e acessar via `phpmyadmin.dev`.

```bash
ln -s /usr/share/phpmyadmin /home/$HOME/MyParkFolder
```

<div class="text-center">

![It's magic!](https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif)

</div>

**Dica:** Não se esqueça de rodar `valet start`, eu esqueci :ghost:

## Conclusão

Agora não tem mais desculpas para utilizar Valet, tudo esta funcionando muito bem e o melhor que isso, rodando no Linux.

Compartilhe o seu sucesso ~~ou não~~ e qual a sua distribuição utilizando [Valet Linux](https://cpriego.github.io/valet-linux/).