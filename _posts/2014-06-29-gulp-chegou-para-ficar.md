---
layout: post
title:  "Gulp - O Task Runner que chegou para ficar"
date:   2014-06-29
tags: produtividade tools
image: assets/images/posts/gulp.jpg
keywords:
description: >
  Pouco mais de um ano, utilizando Grunt como task runner comecei a repensar várias coisas quando descobri um novo concorrente. Com vocês Gulp.
related:
  - title: An Introduction to Gulp.js
    url: http://www.sitepoint.com/introduction-gulp-js/
  - title: Bye bye Grunt.js, hello Gulp.js!
    url: http://blog.caelum.com.br/bye-bye-grunt-js-hello-gulp-js/
  - title: Gulp - O novo automatizador
    url: http://tableless.com.br/gulp-o-novo-automatizador/
---
Pouco mais de um ano, utilizando [Grunt]({{site.url}}/2014/automacao-de-tarefas-com-grunt/) como task runner comecei a repensar várias coisas quando descobri um novo concorrente. Com vocês [Gulp](http://gulpjs.com/).

É engraçado como a percepção sobre alguma tecnologia pode mudar rapidamente não é? Quando conheci o [Grunt](http://gruntjs.com/) em 2013 achei muito interessante principalmente por não ter mais que **ficar atualizando meu browser** a cada `ctrl+s`,  **compilar pré-processadores CSS**, ou melhor ainda, criar uma **task personalizada** para **concatenar**, **minificar**, **gerar sprites** e muito mais.

Por outro lado, as vezes me sentia um pouco incomodado com a complexidade de fazer algumas coisas, ou simplesmente por ter que escrever muito <del>sou preguiçoso</del> o que coincidentemente me fez conhecer o **Gulp**.

O Grunt sem dúvidas é uma ferramenta fantástica, com uma grande comunidade, flexível <del>até certo ponto</del>, e provavelmente se você usa ou já viu a [palestra](https://speakerdeck.com/almirfilho/esse-cara-e-o-grunt) do [@almirfilho](https://twitter.com/almirfilho) sobre Grunt, provavelmente deve restar se perguntando "Porque eu deveria mudar?". Bem, eu vou deixar alguns pontos do porque estou mudando e talvez isso possa te ajudar a ver as coisas como eu as vejo:

## Gulp e Grunt
Ambos são os automatizadores, famosos, feitos em JS e possuem várias coisas em comum, tais como:

- Rodam em cima do [Node](https://nodejs.org/) <3;
- Uma ótima comumidade, com vários plugins, etc;
- Possuem uma [CLI](http://en.wikipedia.org/wiki/Command-line_interface);
- Open source <3;

## Gulp x Grunt
Bem agora chega a parte em que talvez <del>com certeza</del> serei um pouco chato, já que eu tenho uma perspectiva sobre os dois automatizadores.

#### Tio Grunt

O Grunt sem dúvidas me ajudou muito, principalmente porque tudo o que eu precisava em quesito de **plugins** já estava no [NPM](https://www.npmjs.com/) e a **comunidade é bizarramente grande**.

Em contra partida alguns pontos que me deixam #chateado com o Grunt:

- Arquivos de configuração realmente grandes <del>sou preguiçoso lembram?</del>
- Processamento lento dependendo do número de tasks que você tem configurado
- Curva de aprendizado um pouco maior
- Código não é exatamente elegante ;(

Não te convenci? Então perá lá...

#### Tio Gulp
Uma das coisas que me surpreendeu foi a **simplicidade** e a **elegância** ou escrever uma task no Gulp, normalmente são **pequenas**, **idiomáticas** e **rápidas** na execução.

Primeiro vamos criar um novo projeto, instalar nossas dependências e criar um arquivo chamado **Gulpfile.js**.

{% highlight PowerShell %}
#criamos o projeto e o arquivo package.json
npm init

#instalamos o gulp e suas dependencias (tasks) que iremos utilizar
npm install gulp gulp-less gulp-autoprefixer --save-dev
{% endhighlight %}

{% highlight javascript %}
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
 return gulp.src('src/less/*.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(gulp.dest('assets/styles'));
});
{% endhighlight %}

Entendeu o porque isso é lindo? Não? Então vamos aos detalhes do que faz o Gulp ser essa coisa linda de deus:

- Utiliza [streams](https://nodejs.org/api/stream.html) o que faz reduzir o número de operações de I/O.
- Você escreve código e não aquela configuração chata que com o tempo fica gigante
- Tem **pipes**, o que nos permite encadear tarefas
- Código simples e idiomático
- API extremamente simples

Uma outra coisa interessante no Gulp é que ele já vem por default com alguns métodos/tarefas em sua API como task(),run(), watch(), src()e dest().

Vejamos como ficaria fazer watch em arquivos e delegar tasks:

{% highlight javascript %}
gulp.task('watch', function(){
    gulp.watch('src/templates/**/*.jade', ['jade']);
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/images/**/*.{jpg,png}', ['imagemin']);
});

gulp.task('default', ['js', 'jade', 'less', 'imagemin', 'watch', 'browser-sync']);
{% endhighlight %}

Neste meu simples exemplo, nós utilizamos o `watch()` **nativo** da API para observar meus arquivos arquivos e rodar tasks que eu tenha definido e também me possibilita rodar **N** comandos através de uma task default definida, da mesma forma que fazemos no Grunt, porem muito mais clara.

Mas como nada é perfeito, vamos aos pontos que eu considerei um pouco ruim:
- Menos plugins que o Grunt <del>continuo sendo preguiçoso</del> :P

Em contra partida algumas vantagens sem ser as mencionadas que me fizeram mudar de ideia:

- Melhor performance, principalmente em ambiente de deploy
- Plugins mais simples e bem menores
- Utilização de libs padrão via API ao invés de utilizar plugins para tudo

## Mas porque você fala tanto de performance? Precisa?
Então, como eu sei que meu ambiente na [AWS](http://aws.amazon.com/) é totalmente diferente do meu Macbook Pro (i7, 8GB, SSD, etc), eu fiz o teste com algumas tasks como **Less**, **Jade**, **Imagemin** e **Uglify**.

No Grunt, todas as tarefas exatamente nessa sequencia demorou em média **2.813** na minha maquina e **3.420** na AWS, enquanto o Gulp demorou **1.82** na minha maquina e milagrosos **2.13** na AWS.

## Conclusão
O Gulp sem dúvidas veio para ficar, principalmente nos meus novos projetos, mas isso não quer dizer que você deve mudar os seus projetos de Grunt para Gulp, só se for realmente viável.

Se você estiver confortável para mudar e não ver nenhum problema nisso OK, apesar de tudo o Grunt não é ruim e tem uma comunidade fantástica quando falamos de plugins, correção de bugs, etc... mas o que realmente importa é: O que você quer? Qual o melhor para o seu projeto?

Lembre-se que o Gulp é um pouco mais novo que o Grunt (cerca de 1 ano), eu particularmente tento não me apegar a uma certa tecnologia <del>e também sou preguiçoso</del>, ou seja, caso algo melhor venha a tona no mercado é muito provavel que eu também vou querer usar.

Lembre-se também que ambos vão evoluir com o tempo e o futuro é incerto sobre quem será o melhor. Uma dica que posso lhe dar é: fique atento, hoje eu uso Gulp e o amanhã é incerto.
