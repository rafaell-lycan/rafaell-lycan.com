---
layout: post
title:  "HTML5 - Você deveria estar usando"
date:   2012-05-07
categories: outros
tags: html5
image: assets/images/posts/html5-voce-deveria-estar-usando.jpg
keywords:
related:
  - title: Era uma vez uma referência chamada Dive into HTML5…
    url: http://zenorocha.com/era-uma-vez-uma-referencia-chamada-dive-into-html5/
  - title: Como usar HTML5 sem uma máquina do tempo (by Zeno Rocha)
    url: http://zenorocha.com/como-usar-html5-sem-uma-maquina-do-tempo/
  - title: Biblioteca Modernizr para HTML5 e CSS3 (by Maujor)
    url: http://www.maujor.com/tutorial/css3-html5-modernizr.php
description: >
   A linguagem HTML5 ainda não está na sua versão final, mas a cada dia que passa mais e mais websites começam a usá-la. A linguagem aproxima-se dos requisitos da Web e torna-se mais fácil publicar conteúdos Web 2.0. Quando HTML4 reinava, a Web2.0 nem sequer tinha sido pensada, sendo assim pouco compatíveis. Mas com HTML5, é expectável que seja diferente.
---
**HTML5** continua sendo HTML, mas ao contrário das versões anteriores agora ele fornece ferramentas para **CSS** e ao **JavaScript** para fazerem seu trabalho da melhor maneira possível, permitindo por meio de suas API's, a manipulação das caracteristicas destes elementos, de forma que o website ou aplicação continue leve e funcional.

Mas, **o que mudou? E o que preciso saber para usar HTML5 hoje?**

## Sintaxe simplificada
Esta é uma das diferenças mais notáveis entre HTML4 e HTML5, e que certamente faz os programadores web adorarem simplementes por ser uma coisa **decorável**.

A sintaxe HTML5 é compativel com HTML4 mas há bastantes melhorias. A declaração **doctype** é muito mais curta:
{% highlight html %}
<!-- Era XHTML -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- Agora::HTML5 -->
<!DOCTYPE html>
{% endhighlight %}

E para declarar o **charset**? Quem lembra?

{% highlight html %}
<!-- Era HTML4/XHTML -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Agora::HTML5 -->
<meta charset="UTF-8">
{% endhighlight %}

## Novos Elementos
Os novos elementos em HTML5 é a diferença mais notável, têm como propósito a simplificar o desenvolvimento do website e torná-los mais semânticos. Você pode consultar a lista essas novas tags e outras modificações [aqui](https://rawgit.com/whatwg/html-differences/master/Overview.html).

Deixo agora alguns elementos aqui descritos <del>que eu particuparmente já estou usando</del>:

- **`<article>`:** Este atributo é usado para separar artigos, posts de blogs e outro conteúdo de texto. Com a crescente comunidade de bloggers e artigos de opinião, este elemento é certamente muito útil.

- **`<section>`:** É o que possui menor especificidade em sua semântica, pode abrigar os elementos `header`, `footer`, `article` e sua principal função é dividir o conteúdo em macro estruturas, em blocos.

- **`<header>` e `<footer>`:** Estes elementos são usados para o cabeçalho e rodapé da página e podem substituir os elementos `<div> que usamos hoje para identificar vários elementos, incluindo o cabeçalho e rodapé. Uma vez que cabeçalho e rodapé estão presentes em quase todas as páginas, faz sentido que agora tenham um elemento só seu.

- **`<nav>`:** Semelhente ao `<header>` e `<footer>`, na medida em que foi criado para dar um elemento à navegação de página.

- **`<figure>`:** Para agrupamento de uma sessão de conteúdo de mídia (Normalmente, isso é uma imagem, uma ilustração, um diagrama, etc) e sua legenda utilizando `<figcaption>`.

- **`<hgroup>`:** Sessão de agrupamento dois ou mais elementos headings (h1 até h6) organizando-os em uma hierarquia de títulos e subtítulos.

Além dos novos elementos introduzidos, foram também introduzidos novos atributos a elementos já existentes, mas a lista é ainda maior do que a lista dos elementos. De qualquer forma, antes de começar a programar em HTML5, dê uma olhadela na nova lista de atributos para elementos que usa frequentemente.

{% highlight html %}
<!-- Era HTML4/XHTML -->
<div id="topo">
  <ul id="menu">
    <li>...</li>
  </ul>
</div>
<div id="sidebar"></div>
<div id="container"></div>
<div id="rodape"></div>
{% endhighlight %}

{% highlight html %}
<!-- Agora::HTML5 -->
<header id="topo">
  <nav id="menu">
    <ul>...</ul>
  </nav>
</header>
<aside id="sidebar"></aside>
<section id="container"></section>
<footer id="rodape"></footer>
{% endhighlight %}

É `<div>`, perdeu playboy!

## Elementos e atributos eliminados
Além de novos elementos e atributos, também alguns destes foram apagados. Embora muitos deles não venham a fazer falta, porque muito raramente eram utilizados, alguns podiam ter ficado.

- O primeiro grupo de elementos que foram utilizados e que serão melhor utilizados através de **CSS** são o `<center>`, `<big>` e `<u>`. Agora o seu lugar é na folha de estilos.

- O segundo grupo tem a ver com as **frames**, `<frame>`, `<frameset>` e `<noframes>` eram tão antiquados que foi um alívio terem sido eliminados.

- O terceiro grupo pende em elementos raramente utilizados, que é o caso do `<isindex>`, `<dir>`, `<applet>` e `<acronym>`.

Como pode constatar, há de facto algumas diferenças entre o HTML5 e o HTML4, mas elas não são diferenças muito profundas. Quero com isto dizer que não terá de reaprender HTML da estaca zero. De qualquer das formas irá levar o seu tempo até se habituar ás novas regras, etc... no que toca aos atributos e elementos alterados. A boa notícia é que o HTML5 veio para simplificar, e isto é o suficiente para justificar a actualização.

## HTML5, Formulários e você!
De longe, algumas coisas que achei super legais no HTML5 foi de cara os novos tipos de input no formulário, que veio para facilitar a vida de nós desenvolvedores (Sem a necessidade de libs JavaScript). São eles:

- **tel:** Entrada de um número de telefone.
- **search:** Entrada de um campo de busca.
- **url:** Entrada de uma URL em formato válido (http, https)
- **email:** Entrada de um ou mais endereço de email.
- **number:** Entrada de números.
- **range:** Entrada de uma faixa de valores.
- **color:** entrada de uma cor em haxadecimal como #FF00FF.
- **datetime, date, month, week, time:** Entradas é uma data e/ou hora especifica.

## HTML5, ao infinito e além
Além de tudo o que já foi dito neste post como novos elementos mais semânticos para cabeçalhos, rodapés, menus, seções, artigos e a melhoria com novos atributos e inputs de formulários, ainda ganhamos total suporta ao **CSS3**, novas APIs JavaScript e muito mais como:

- **Gráficos:** com **canvas** e **svg**;
- **Multimídia:** com **audio** e **video** APIs;
- **Conectividade:** com **websockets**;
- **Acesso ao hardware:** com **geolocation**, **camera**, **microfone**, etc;
- **Offline storage:** com **localStorage/sessionStorage** e **indexedDB**;
- E muito, muito mais mesmo....

No fim das contas, com o cenário que essa mundança nos trouxe, podemos dizer que HTML5 seria representado dessa forma:
!['Explicação de como HTML5 funciona'](/assets/images/posts/html5-houses.png)

## Como usar o HTML5 hoje, sem enrolação?
Antes de qualquer coisa mesmo, você precisa saber algo quase que crucial: **HTML**, **CSS** e **JavaScript**. Pronto agora só depende de você.

Entenda o principio das coisas. A base continua sendo a mesma (HTML/CSS/JS), então em tese não precisamos pensar muito e ver que isso é sem dúvidas o primeiro passo.

#### Mas e o IE?
É, mesmo com novas versões de navegadores, o mercado (principalmente corporativo) ainda utilizam versões que não suporte ao HTML5 mas para resolver isso use o **[Modernizr](http://modernizr.com/)** para lhe dar suporte ao menos a novas tags em browsers antigos.

#### Mas e o Google?
Acredito que utilizando da forma certa, pode ter certeza que os gigantes vão amar seu código mais bem organizado e semântico (o que vai fazer muito mais sentido aos motores de busca não?).

## Conclusão
Os tempos são outros, o mercado esta mudando e crescendo. Eu lembro muito bem de quando comecei a estudar mais sobre HTML para fazer *"sitezinhos"* e blablabla. Antes o menino do HTML fazia básicamente **email marketing** e **PSD para HTML**.

Pois bem, eu comecei básicamente nessa geração lá por 2009, e mesmo assim estou achando um máximo essa mudança. Mas isso sou eu.

Não vacile, as portas estão abertas e só depende de você.