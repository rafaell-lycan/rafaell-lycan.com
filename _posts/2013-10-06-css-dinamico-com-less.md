---
layout: post
title:  "Usando o pré-processador LESS CSS para um CSS mais dinâmico"
date:   2013-10-06
categories: less, css, css3
tags: less css css3
image: assets/img/posts/css-dinamico-com-less.jpg
comments: true

author_link: http://twitter.com/RafaellLycan
author_profile: https://plus.google.com/113755365039926065548
keywords: less, css, css3, pre processadores
resumo: >
  Aumente sua produtividade e comece a trabalhar com LESS CSS, o pré-processador que é dinâmico, fácil e flexível para desenvolver suas Cascading Style Sheets.
related:
  - title: CSS fácil, flexível e dinâmico com LESS
    url: http://blog.caelum.com.br/css-facil-flexivel-e-dinamico-com-less/
  - title: Simplificando a vida com LESS
    url: http://loopinfinito.com.br/2012/06/19/simplificando-a-vida-com-less/
---
CSS é o padrão para estilização visual de páginas Web, então não temos muito como fugir dele. Ele as vezes pode impacar nosso desenvolvimento por conta de algumas limitações, prefixos, folhas de estilo muito grandes valores repetitivos entre outras coisas.

**Definição das CSS:**

> É um mecanismo simples para adicionar estilos (p.ex., fontes, cores, espaçamentos) aos documentos Web.
>
> <footer>- Maujor</footer>

Eu os apresento o [LESS](http://lesscss.org/), um pré-processador para as CSS.

**Mas porque utilizar um pré-processador?** <br>
E porque não?

Claro que existem N fatores, tanto positivos quanto negativos quando se parte para o uso de pré-processadores, mas é uma abordagem interessante e isso tem me ajudado muito.

Em geral, quando utilizamos pré-processadores para as CSS, seja ele LESS, [SASS](http://sass-lang.com/), [Stylus](http://learnboost.github.io/stylus/) ou qualquer outro ganhamos algumas coisas muito interessantes como variáveis, operadores, funções, aninhamento/herança, mixins e claro o mais importante: melhora o fluxo de trabalho.

A sintaxe das CSS é browser-friendly, já os pré-processadores CSS são human-friendly por terem uma sintaxe bem simples.

> I want to work faster and more efficiently. That's what CSS preprocessors really do.
>
> <footer>- Chris Coyier (CSS Tricks)</footer>

##Sobre o LESS
O LESS é uma linguagem baseada em CSS (mesma ideia, sintaxe familiar) com recursos que fazem falta no CSS em algumas situações. É também chamado de pré-processador pois, na verdade, é usado para gerar um arquivo CSS no final.

Existem duas maneiras de se utilizar o LESS em sua página: Compilando ou utilizando o interpretador JS.

##Principais Features:

####Variáveis:
{% highlight css %}
/*LESS*/
@color: #557B10;
@fonts: Arial, sans-serif;
#header {
  color: @color;
}
article header{
  font-family: @fonts;
  border-bottom:3px solid @color;
}
{% endhighlight %}

{% highlight css %}
/*CSS*/
#header {
  color: #557B10;
}
article header{
  font-family: Arial, sans-serif;
  border-bottom:3px solid #557B10;
}
{% endhighlight %}

####Operadores:
{% highlight css %}
/*LESS*/
@desktop-width: 960px;
@context: 10px;

section.main{
  width: @desktop-width - (@context*2);
}
{% endhighlight %}

{% highlight css %}
/*CSS*/
section.main{
  width: 940px;
}
{% endhighlight %}

####Aninhamento:
{% highlight css %}
/*LESS*/
#nav{
  a{
    color: #555;
    &:hover{
       color: #212121;
    }
    .title &{
      color: rgba(37, 55, 148, .5);
    }
  }
}
{% endhighlight %}

{% highlight css %}
/*CSS*/
#nav a{
  color: #555;
}
#nav a:hover{
  color: #212121;
}
.rgba #nav a{
  color: rgba(37, 55, 148, .5);
}
{% endhighlight %}

####Mixins:
{% highlight css %}
/*LESS*/
.radius ( @radius ) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  -ms-border-radius: @radius;
  -o-border-radius: @radius;
  border-radius: @radius;
}

img{
  .radius(3px);
}
{% endhighlight %}

{% highlight css %}
/*CSS*/
img {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
{% endhighlight %}

Gostou? Tem muito mais como modularizar uma aplicação inteira usando `@import` sem problema algum, já que ele cria um arquivo único que possui o estilo de todos os arquivos, concatenar variáveis como `@url: 'assets/img` e aplicar em elementos `background: url("@{url}/image.jpg");`.

Mágico não?

**Apenas cuidado com alguns pontos:**

1. Apesar da curva de aprendizado ser muito rápida, mas é importante manter um padrão antes que tudo acabe virando um completo caos;
2. Se você esta em um projeto grande, além de utilizar um padrão, procure documentar já que se alguem novo entrar no seu time além de não conhecer pré-processadores também pode ficar meio perdido no início das coisas;
3. Não é porque você sabe que utilizar `@import` funciona, etc... vai sair criando milhares de arquivos. Defina uma estrutura;
4. Veja a viabilidade de se utilizar um pré-processador, depois que o projeto já esta bem encaminhado é dificil voltar;
5. Saiba CSS. Não é porque você descobriu um jeito novo de faze-lo, vai sair fazendo aninhamento, criando variáveis e outras coisas atoa.