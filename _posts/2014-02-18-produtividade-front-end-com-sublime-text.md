---
layout: post
title:  "Produtividade Front-End com Sublime Text"
date:   2014-02-18
categories: produtividade, dicas sublime
tags: sublime produtividade dicas front-end
image: assets/img/posts/produtividade-front-end.jpg
comments: true

author_link: http://twitter.com/RafaellLycan
author_profile: https://plus.google.com/113755365039926065548
keywords: html5 api, web storage, html5 sql, html5 tags
resumo: >
  Precisamos de produtividade, cada vez mais o mercado nos cobra mais agilidade no desenvolvimento de aplicações seja front-end ou back-end. Sabia que também é possível ser produtivo no mundo front-end?
---
##Be Smart
A um tempo atrás desenvolvendo websites e aplicações para web me deparei com a seguinte situação: **preciso ser mais rápido**, **desenvolver mais rápido**, **entregar antes da data final**.

**Mas como?**

Por um bom tempo fiquei lendo, procurando formas de desenvolver as coisas mais rápidas, como a base de quase tudo que faço é front-end então eu dependia da complexibilidade dos websites, interações, etc...

Li diversos artigos falando que o ideal é desenvolver uma camada por vez:
Primeiro o markup (HTML), depois se aplica o estilo e por fim é adicionado eventos JavaScript, mas pra mim não estava adiantando muito,
eu continuava a escrever da mesma forma e as vezes me dispersava muito fácil com redes sociais, o antigo messenger, etc.

Eu trabalhei por um tempo também com PHP, desenvolvendo pequenas aplicações, e tenho que admitir que trabalhar com IDE's como [NetBeans](https://netbeans.org/) e [phpStorm](http://www.jetbrains.com/phpstorm/) eram realmente bom, mas quando eu ia para o front-end eu preferia algo mais leve e tudo mudava já que na época o [Notepad++](http://notepad-plus-plus.org/) e ele não supria minha necessidade de ser mais produtivo.

Até que comecei a procurar uma ferramenta melhor para desenvolvimento, algo que fosse bom, rápido e pratico de aprender os atalhos.

**Mas então minha vida mudou e encontrei algo divino... =)**

Em 2011 me deparei com alguns editores do mercado tais como o [Expresso](http://macrabbit.com/espresso/), [Sublime Text](http://www.sublimetext.com/) e o [TextMate](http://macromates.com/).

Na maioria das vezes os vídeos que via no [YouTube](https://www.youtube.com/) e [NetTuts](http://net.tutsplus.com), os desenvolvedores utilizavam na maioria das vezes o Sublime Text, e percebi as vantagens de utiliza-los.

##Sublime Text
Sem dúvidas um dos melhores editores de texto que já utilizei.

Ele é muito leve, multiplataforma, possui vários temas diferentes e uma gama de plugins para acelerar e facilitar ainda mais o desenvolvimento que podem ser instalados através do seu [Package Control](https://sublime.wbond.net/installation).

Uma das coisas que me chamou muita a atenção além dos plugins é claro, foi a possibilidade de trabalhar com colunas, ou seja, você pode ter duas ou mais colunas e abrir arquivos diferentes nelas. Ex: HTML na esquerda e CSS na direita, o que pra mim é bem útil. Além disso também é possível deixa-lo em modo fullscreen o que é ótimo por questões de distração e coisas do tipo e te faz ficar focado no código.

Uma outra coisa é que ele salva automaticamente a ultima coisa que você estava fazendo e quais documentos estavam abertos, o que é ótimo caso o programa pare do nada (algo comum no Windows). Outra coisa legal também é poder selecionar varias linhas diferentes em pontos específicos e poder altera-las ao menos tempo. Também é possível utilizar **code folding** através de atalhos o que facilita esconder coisas inúteis como conteúdo e focar no código HTML por exemplo.

##Plugins
Como disse, um dos pontos fortes que achei no [Sublime](http://www.sublimetext.com/) foi essa flexibilidade de poder instalar novos plugins com o gerenciador de pacotes, o que realmente me fez optar pelo editor.

Para instalar basta abrir o terminal do sublime em <code class="code">View->Show Console</code> e colar o código disponível no site do [Package Control](https://sublime.wbond.net/installation) e reiniciar o sublime.

Para instalar um novo plugin ou procurar por algum basta digitar <code class="code">Ctrl+Shift+p</code> ou <code class="code">Command+Shift+p</code>, digite **install** e aperte <code class="code">Enter</code>. Neste momento o sublime vai carregar uma lista de plugins disponíveis e você só precisa digitar o nome do que quer.

Depois de instalar o gerenciador de pacotes, além de instalar novos plugins ele te ajuda a descobrir novos plugins pelo autocomplete.

###[JsMinifier](https://github.com/cgutierrez/JsMinifier)
O [JsMinifier](https://github.com/cgutierrez/JsMinifier) é um plugin que minifica seu JavaScript e CSS sem ter muito trabalho, no meu dia a dia utilizo ferramentas de automação para minificar arquivos, mas é muito útil para que ainda não utiliza. Vale a pena conferir.

###[AutoFileName](https://github.com/BoundInCode/AutoFileName)
O [AutoFileName](https://github.com/BoundInCode/AutoFileName) tem uma função simples: completar o nome dos diretórios e arquivos quando você esta digitando seu código.

Se você esta por exemplo digitando uma imagem no html como <code class="code">src="/assets/images/"</code>, ele da dicas das imagens que existem naquele diretório incluindo largura (w) e altura (h). Funciona pra CSS também <code class="code">url('../img/')</code>

###[SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements)
Este plugin aumenta as opções que você tem por padrão na SideBar do Sublime, adicionando varias opções para copiar, ou até abrir arquivos direto no browser.

###[SyncedSideBar](https://github.com/sobstel/SyncedSideBar)
O [SyncedSideBar](https://github.com/sobstel/SyncedSideBar) tem uma única função: sincronizar a sua sidebar com tudo o que acontece com o diretório do projeto. As vezes num pull do projeto você já vê os novos arquivos que foram adicionados em um diretório especifico que você esta visualizando, etc...

###[Emmet](http://emmet.io/)
Este sem dúvidas é um dos melhores plugins para o Sublime que já utilizei, encontrei em 2011 em um [post](http://blog.thiagobelem.net/zen-coding-criando-html-como-um-ninja/) do [@TiuTalk](https://twitter.com/TiuTalk) falando sobre [Zen Coding](http://en.wikipedia.org/wiki/Zen_Coding), um plugin que expande expressões para código HTML e CSS validos e organizados.

Hoje o projeto se chama [Emmet](http://emmet.io/), um projeto de [@chikuyonok](https://twitter.com/chikuyonok) feito em 2009 e desde então evoluindo e sendo melhorado com o passar do tempo.

Achei tudo muito mágico, e o mais incrível era que uma simples expressão nada difícil de se aprender como esta:
{% highlight html %}
div#page>div.logo+ul#navigation>li*5>a
{% endhighlight %}

Facilmente vira esse bloco HTML:
{% highlight html %}
<div id="page">
        <div class="logo"></div>
        <ul id="navigation">
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
        </ul>
</div>
{% endhighlight %}

Legal né?

O Emmet possui um boa [documentação](http://docs.emmet.io/) e realmente facilita o desenvolvimento do front-end, seja HTML ou CSS (por hora só utilizo para estes dois meios). É de fácil aprendizado e depois de um tempo você se acostuma a escrever expressões gigantescas que viram desde um componente, até uma página completa.

Só cuidado, viciar no autocomplete do Emmet e suas expressões pode te fazer esquecer alguns comandos de CSS (já aconteceu comigo). Tirando isso use e abuse deste plugin.

###[FileDiffs](https://github.com/colinta/SublimeFileDiffs)
Sem dúvidas um plugin muito bom para comparar arquivos, eu sempre utilizei isso no Notepad++, mas infelizmente não vem nativo no Sublime. Quando descobri o [FileDiffs](https://github.com/colinta/SublimeFileDiffs) tenho que admitir que imaginei que não existia nada que não fosse possível com o Sublime (e ainda acredito).

###[Bracket Highlighter](https://github.com/facelessuser/BracketHighlighter)
Este plugin cria uma marcação na lateral do editor junto ao números da linha para evitar que você se perca no escopo do código.

###[JavaScript Console snippets](https://github.com/caiogondim/js-console-sublime-snippets)
Este plugin te da vários snippets para você utilizar o objeto console do javascript tais como <code class="code">console.log()</code>, etc...

Um print do que é possível fazer:
![JavaScript Console Snippets - by Caio Gondin](https://camo.githubusercontent.com/148623dfd43f825b4ff417f91d18418cebcce394/68747470733a2f2f7261772e6769746875622e636f6d2f6361696f676f6e64696d2f6a732d636f6e736f6c652d7375626c696d652d736e6970706574732f6d61737465722f736e6970706574732e676966)

O legal é que ele foi feito por um brasileiro, o que além de ser muito útil, mostra o que o Brasil também tem gente muito boa na área de desenvolvimento.

##O que mais?
O [Sublime](http://www.sublimetext.com/) como disse anteriormente é multiplataforma, tem pra Windows, Mac e até Linux.

Pra quem estiver começando agora a utiliza-lo eu sugiro dar uma olhada nesses [atalhos](https://gist.github.com/bjhess/1596897) básicos e também ver o curso [Perfect Workflow in Sublime Text 2](http://courses.tutsplus.com/courses/perfect-workflow-in-sublime-text-2) com o [@jeffrey_way](https://twitter.com/jeffrey_way).