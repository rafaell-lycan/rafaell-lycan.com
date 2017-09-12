---
layout: post
title:  "Usando Áudio e Vídeo no HTML5"
date:   2013-09-21
tags: html5
image: assets/images/posts/html5-audio-video.jpg
keywords: html5 tags, audio, video, multimidia
description: >
  Como funciona o audio e vídeo no HTML5? Além das tags, vamos ver o que mais conseguimos fazer utilizando multimídia nativa na web.
related:
  - title: Using HTML5 audio and video
    url: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video/
  - title: Media formats supported by the HTML audio and video elements
    url: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats/
  - title: HTML5 Audio and Video - What you Must Know
    url: http://code.tutsplus.com/tutorials/html5-audio-and-video-what-you-must-know--net-15545/
---
## Porque nativo?
A primeira vez que eu ouvi sobre áudio e vídeo no HTML5 eu pensei **"Uauuu"** mas não me liguei ao ponto do porque. Algum tempo depois comecei a ler alguns artigos no [HTML5 Rocks](http://www.html5rocks.com/) e alguns outros blogs e cheguei a uma conclusão simples: Você provavelmente assiste vídeos no [Youtube](http://youtube.com/) ou ouve músicas certo? Antigamente era necessário utilizar um plugin de terceiros como o QuickTime, talvez o WMP e normalmente o Flash.

Esses plugins se integram com seu browser <del>as vezes não</del> e execultam em background sendo que você não é nem avisado que ele está rodando. Mas e se você esta em uma plataforma que não suporta algum deles?

Pois é, cade seu deus agora? Tirando o que penso ser um certo abuso no consumo de memória quanto você execulta por exemplo umas 5 abas no seu navegador favorito.

## Multimídia no HTML5
Com a chegada do HTML5 temos inumeras novidades, entre elas vamos destacar multimídia.

Para que não sabe ainda `<audio>` e `<video>` são as novas tags de media com um proposito maravilhoso: ***"acabar com a dependencia de plugins"*** para a reprodução de áudio e vídeo nas páginas, e também beneficiar os desenvolvedores que estarão livres de plugins de terceiros. Claro que nem tudo são rosas, já que o IE8 não suporta HTML5 apenas o IE9 e posteriores. <del>IE Must Die</del>.

O objetivo deste post é apresentar uma breve introdução a essas novas tags, então vamos lá.

## Audio
Como o proprio nome já diz, a tag `<audio>` define o som, como uma música ou outras fontes de áudio.

{% highlight html %}
<audio src="song.mp3" controls="controls">
  Seu navegador não suporta HTML :(
</audio>
{% endhighlight %}
[Exemplo aqui](http://jsfiddle.net/6uqgvjku/).

Temos um exemplo básico da tag `<audio>` com dois atributos básicos, sendo `src` que é o caminho do arquivo de áudio e, `controls` que mostra os controles básicos do nosso player. Apenas para deixar claro os controles não são realmente necessários nesse caso, apenas coloquei para vizualisarmos o player.

Além desses podemos incluir também outras propriedades como o `autoplay` que executa o som assim que ele é carregado, `loop` que repete a musica sempre que ela acaba, `muted` que deixa mudo e alguns outros.

Para mais informações veja a documentação [aqui](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

## Vídeo
A tag `<video>` define o vídeo, como um clipe, filme ou outros tipos de vídeo
{% highlight html %}
<video width="320" height="240" src="movie.mp4" controls="controls">
  Seu navegador não suporta HTML :(
</video>
{% endhighlight %}
[Exemplo aqui](http://jsfiddle.net/rL95t064/).

Não é nada diferente do que já vimos, exeto que desta vez eu adicionei as propriedades `width` e `height` para definir um tamanho especifico para o vídeo.

Além de todas os atributos que o áudio possui, também podemos incluir algumas outras como `poster"*** que nada mais é do que uma imagem a ser apresentada enquanto o video é baixado.

Para mais informações veja a documentação [aqui](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video).

## Multiplos formatos
Um dos problemas que precisamos ficar atentos é quanto ao formato suportado por cada browser já que cada um implementa a funcionalidade de uma forma. Em um mundo perfeito, seria muito fácil implementar uma aplicação de uma forma que todos eles conseguissem interpretar sem precisar de alguma alteração.

Não adianta ficar triste, mas também não é o fim do mundo, para isso usamos a tag `<source>`.

Para os formatos de multimídia não é diferente, cada browser suporta um tipo especifico de CODEC de audio e vídeo. É muito importante que você inclua, nos seus elementos source de áudio e vídeo, informação a respeito do container e codecs utilizados. Isso vai evitar que o navegador tenha que baixar, pelo menos parcialmente, o arquivo de mídia para, depois, descobrir que não consegue tocá-lo.

É importante lembrar que a extensão do arquivo não é informação relevante para isso, pelo contrário, não significa nada já que uma URL pode não ter extensão de arquivo e pode levar a um redirecionamento.

### Google Chrome
**Audio:** Ogg Vorbis, MP3, WAV, ACC. <br>
**Video:** Ogg/Theora, H.264 / MP4, WebM.

### Mozilla Firefox
**Audio:** Ogg Vorbis, WAV. <br>
**Video:** Ogg/Theora, WebM.

### Internet Explorer 9
**Audio:** MP3, WAV. <br>
**Video:** H.264 / MP4.

### Safari
**Audio:** MP3, WAV, ACC. <br>
**Video:** H.264 / MP4.

### Opera
**Audio:** Ogg Vorbis, WAV. <br>
**Video:** Ogg/Theora, WebM.

Utilizando a tag `<source>` precisamos informar 2 atributos como `src` que especifica a URL do arquivo e `type` que especifica o tipo de mídia do recurso.

{% highlight html %}
<audio controls="controls">
  <source src="song.mp3" type="audio/mpeg"/>
  <source src="song.ogg" type="audio/ogg"/>
  Seu navegador não suporta HTML :(
</audio>
{% endhighlight %}

{% highlight html %}
<video width="320" height="240" controls="controls">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Seu navegador não suporta HTML :(
</video>
{% endhighlight %}

**Dica:** Colocar .MP3 e .MP4 é uma das poucas formas de fazer seu player funcionar no iPad e iPhone.

## Controles customizados
Como **nada é tão bom, que não possa melhorar** também temos uma API JavaScript para a manipulação de multimídia, ou seja, com um conhecimento prévio de JavaScript e CSS podemos fazer um player todo personalizado, desabilitando os controles (controls) para que tenhamos o controle apenas pelo nosso próprio player.

Um exeplo:
{% highlight html %}
<audio id="player">
  <source src="song.mp3" type="audio/mpeg"/>
  <source src="song.ogg" type="audio/ogg"/>
  Seu navegador não suporta HTML :(
</audio>

<button id="play">Play</button>
<button id="pause">Pause</button>
<button id="mute">Mute</button>
{% endhighlight %}

{% highlight javascript %}
(function () {
  var player = document.getElementById('player'),
      play = document.getElementById('play'),
      pause = document.getElementById('pause'),
      mute = document.getElementById('mute');

  play.addEventListener('click', function () {
    player.play();
  });

  pause.addEventListener('click', function () {
    player.pause();
  });

  mute.addEventListener('click', function () {
    player.muted = true;
  });
})();
{% endhighlight %}

Da pra se divertir bastante, eu perdi alguns dias para fazer algo que visualmente me agrada e também me serviria para escutar musicas durante o dia. Veja meu exemplo [aqui]({{site.url}}/music-player/)