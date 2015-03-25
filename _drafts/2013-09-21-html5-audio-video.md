---
layout: post
title:  "Usando Áudio e Vídeo no HTML5"
date:   2013-09-21
categories: html5, audio, video, multimidia
tags: audio video html
image: assets/img/posts/html5-audio-video.jpg
comments: true

author_link: http://twitter.com/RafaellLycan
author_profile: https://plus.google.com/113755365039926065548
keywords: html5 tags, audio, video, multimidia
resumo: >
  Como funciona o audio e vídeo no HTML5? Além das tags, vamos ver o que mais conseguimos fazer utilizando multimídia nativa na web.
---
##Porque nativo?
A primeira vez que eu ouvi sobre áudio e vídeo no HTML5 eu pensei **"Uauuu"** mas não me liguei ao ponto do porque. Algum tempo depois comecei a ler alguns artigos no [HTML5 Rocks](http://www.html5rocks.com/) e alguns outros blogs e cheguei a uma conclusão simples: Você provavelmente assiste vídeos no [Youtube](http://youtube.com/) ou ouve músicas certo? Antigamente era necessário utilizar um plugin de terceiros como o QuickTime, talvez o WMP e normalmente o Flash.

Esses plugins se integram com seu browser <del>as vezes não</del> e execultam em background sendo que você não é nem avisado que ele está rodando. Mas e se você esta em uma plataforma que não suporta algum deles?

Pois é, cade seu deus agora? Tirando o que penso ser um certo abuso no consumo de memória quanto você execulta por exemplo umas 5 abas no seu navegador favorito.

##Multimídia no HTML5
Com a chegada do HTML5 temos inumeras novidades, entre elas vamos destacar multimídia.

Para que não sabe ainda `<audio>` e `<video>` são as novas tags de media com um proposito maravilhoso: ***"acabar com a dependencia de plugins"***, e assim beneficiar os desenvolvedores que estarão livres de plugins de terceiros. Claro que nem tudo são rosas, já que ainda temos navegadores antigos que não encorporam  HTML5 como o IE8 <del>must die</del>.

O objetivo deste post é apresentar uma breve introdução a essas novas tags, então vamos lá.

##Audio
Como o proprio nome já diz, a tag `<audio>` serve para incorporarmos e reproduzirmos medias de áudio:

{% highlight html %}
<audio src="song.mp3" controls="controls">
  Seu navegador não suporta HTML :(
</audio>
{% endhighlight %}
[Exemplo aqui](http://jsfiddle.net/6uqgvjku/).

Temos um exemplo básico da tag `<audio>` com dois atributos básicos, sendo ***"src"*** que é o caminho do arquivo de áudio e, ***"controls"*** que mostra os controles básicos do nosso player. Apenas para deixar claro os controles não são realmente necessários nesse caso, apenas coloquei para vizualisarmos o player.

Além desses podemos incluir também outras propriedades como o ***"autoplay"*** que executa o som assim que ele é carregado, ***"loop"*** que repete a musica sempre que ela acaba, ***"muted"*** que deixa mudo e alguns outros.

Para mais informações veja a documentação [aqui](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

##Vídeo

##Multiplos formatos

##Controles customizados

####Fontes:
- **[HTML5 Audio and Video: What you Must Know](http://code.tutsplus.com/tutorials/html5-audio-and-video-what-you-must-know--net-15545)**
- **[Using HTML5 audio and video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video)**