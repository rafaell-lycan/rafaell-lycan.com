---
layout: post
title:  "Hello World Firefox OS"
date:   2014-04-06
categories: outros
tags: mobile firefox-os
image: assets/img/posts/hello-world-firefox-os.jpg
keywords: mobile firefox os hello world
resumo: >
  Como começar com Firefox OS, o mais novo sistema mobile da Mozilla. Vamos criar o primeiro aplicativo e entender o sistema operacional Firefox OS e suas peculiaridades.
---
##Firefox OS
Eu recentemente ganhei um [Keon (Firefox OS Developer Preview)](http://www.geeksphone.com/) e hoje estou fazendo meu primeiro experimento.

**Você não precisa ter um device para desenvolver**, basta ter o [Firefox OS simulator](https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/) instalado na sua maquina e esta tudo cero.

Firefox OS é o sistema operacional móvel da [Mozilla](https://www.mozilla.org/), empresa que criou o navegador de Internet [Firefox](https://www.mozilla.org/firefox/).

O Firefox OS **não veio para competir** com o mercado de smartphones como iPhone e Android, ele veio para **suprir a necessidade dos consumidores** que não tem acesso a esses smartphones mais caros. Ele tem a proposta de um sistema operacional que atenda o mercado de forma satisfatória com valores entre R$180,00 e R$400,00 aqui no Brasil.

Além de ter a Mozilla como principal responsável, o Firefox OS conta com apoio de outras empresas como a Vivo e uma vasta comunidade de voluntários em todo o mundo.

##Entendendo o sistema
O sistema é bastante simples, voltado para aparelhos econômicos, e baseado no projeto open-source da Mozilla, chamado [Boot to Gecko (B2G)](https://github.com/mozilla-b2g/B2G) que é composta por três módulos: Gonk, Gecko e Gaia.

####Gonk
É o ***sistema operacional*** de baixo nível. Essencialmente é o [kernel Linux](https://www.kernel.org/) e a camada de abstração de hardware. O kernel é baseado no kernel da versão open source do Android, o [Android Open Source Project (AOSP)](http://source.android.com/).

####Gecko
Essa camada é uma versão do mesmo motor de layout utilizado no navedor Firefox. Ela permite que as interfaces e apps funcionem no próprio Firefox OS e em outros sistemas operacionais nos quais o navegador é utilizado.

####Gaia
É a camada da interface gráfica do sistema operacional. Nela está implementados tudo que aparece quando o sistema operacional é carregado. Ou seja, tela de bloqueio, barra de notificações, discador, gerenciador de mensagens de texto, câmera e demais aplicações A interface é totalmente escrita em **padrões abertos da Web**: HTML, CSS e JavaScript.

##Começando com Firefox OS
Vale lembrar que os aplicativos são construídos a partir de padrões como HTML5, CSS e JavaScript, mas não exige acesso à Internet para que os usuários rodem programas. Em todos os aparelhos, os apps são salvos na memória interna, e depois executados normal, como em qualquer outro smartphone.

Depois de instalar o [Firefox OS simulator](https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/), vá em `Ferramentas -> Desenvolvedor Web` para abrir o simulador. Na lateral esqueda **ligue o simulador**.

<div class="center">
  <img src="/assets/img/posts/firefox_os001.png" alt="Firefox OS Simulator">
</div>

Para entendermos a estrutura basica do nosso app, precisamos de apenas alguns aquivos, entre eles o **manifest.webapp**, que é o arquivo de configuração para do app.