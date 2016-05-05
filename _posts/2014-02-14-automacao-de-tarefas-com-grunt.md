---
layout: post
title:  "Automação de tarefas com Grunt.js"
date:   2014-02-14
tags: automação tools dicas
image: assets/img/posts/automacao-de-tarefas-com-grunt.jpg
keywords: grunt js, automação front-end, tools, ferramentas front-end
resumo: >
  Já imaginou poder automatizar tarefas simples como concatenar arquivos, minificar, testar e até mesmo atualizar o navegador a cada Ctrl+S? Conheça o Grunt.js.
related:
  - title: Grunt JavaScript Automation for the Lazy Developer
    url: https://www.youtube.com/watch?v=bntNYzCrzvE
  - title: Grunt – Getting Started
    url: http://gruntjs.com/getting-started
  - title: Meet Grunt - The Build Tool for JavaScript
    url: http://code.tutsplus.com/tutorials/meeting-grunt-the-build-tool-for-javascript--net-24856
---
A maioria dos desenvolvedores front-end já utilizam algum tipo de processo de construção para em seus projetos, mesmo sem saber.

Quando estamos desenvolvendo é normal procurarmos ferramentas que facilitem nosso trabalho, e todo desenvolvedor front-end precisa concatenar e minificar arquivos CSS e JavaScript, checar a qualidade do seu código JavaScript ([JSLint](http://www.jshint.com/)/[JSHint](http://www.jslint.com/)) e até mesmo testa-lo antes do "build" afim de seguir as boas práticas para performance de sites, e percebemos que esses processos se repetem.

A questão é: Você vai precisar juntar os arquivos, depois concatenar, provavelmente você deve estar utilizando algum pré-processador entre outras coisas que colocam a prova a nossa sanidade? É ai que precisamos pensar em automatização.

## Porque automatizar?
Automação é a **aplicação de técnicas** computadorizadas ou mecânicas para **diminuir o uso de mão-de-obra** em qualquer processo, especialmente o uso de robôs nas linhas de produção.

Em desenvolvimento de software automação é o processo de escrita de um programa de computador para executar uma série de tarefas automaticamente. <br>
Estas tarefas servem desde para a **garantia do funcionamento** como para a **performance** de um software.

Desde o surgimento do HTML5, construir aplicações web ficou mais complexo, performance virou fator crucial com pacote do código fonte já testado e otimizado.

A complexidade não está só nas linguagens, que evoluíram muito nos últimos anos, mas também na diversidade de dispositivos para acessar a internet, que aumentaram rapidamente (e tendem a continuar...).

No meu caso, algumas tarefas que são "padrão" em todo o projeto são:

- Concatenar e comprimir os arquivos CSS e JavaScript;
- CSS Pré-processado ([Sass](http://sass-lang.com/) e [Less](http://lesscss.org/));
- Testes de JavaScript ([Jasmine](http://jasmine.github.io/));
- Validar qualidade do código (JSHint);

Uso até mesmo no meu blog esse padrão de tarefas, acho que é o minimo, mas fazer isso na "unha" é insano. Antes eu utilizava o [CodeKit](https://incident57.com/codekit/) para compilar [LESS]({{site.url}}/2013/css-dinamico-com-less/) e JavaScript, já hoje vejo que não preciso mais ficar dependendo de ferramentas gráficas.

## Grunt
O [Grunt](http://gruntjs.com/) é uma ferramenta automação de tarefas (Task Runner) feita totalmente em JavaScript. A grande vantagem de se usar o Grunt ao meu ver é a grande quantidade de plugins disponíveis.

## Começando
O Grunt é baseado no Node.js, você vai ter que instala-lo primeiro. Para utilizarmos precisamos instalar o pacote `grunt-cli` através do [NPM](https://npmjs.org/) (Node Package Manager).

{% highlight bash %}
$ npm install grunt-cli -g
{% endhighlight %}

A flag `-g` irá disponibilizar o comando `grunt` globalmente no seu ambiente.

Depois precisamos criar um arquivo **package.json** onde iremos colocar as configurações do projeto bem como as dependencias.
{% highlight json %}
{
  "name": "Grunt",
  "version": "0.0.1"
}
{% endhighlight %}

Agora a cada plugin que você precisar durante seu workflow, basta instalar via NPM e utilizar a flag `--save-dev`.

{% highlight bash %}
$ npm install grunt-contrib-less --save-dev
{% endhighlight %}

{% highlight json %}
{
  "name": "Grunt",
  "version": "0.0.1"
  "devDependencies": {
    "grunt": "*",
    "grunt-contrib-less": "*"
  }
}
{% endhighlight %}

Você pode encontrar uma lista completa de plugins disponíveis no [site oficial](http://gruntjs.com/plugins).

Agora precisamos criar o arquivo **Gruntfile.js** que nada mais é do que o arquivo de configuração das tasks do projeto.
{% highlight javascript %}
module.exports = function(grunt) {
  // Configuração de tasks
  grunt.initConfig({
      less: {
        options: { // Configurações opcionais
          compress: true // Minifica o arquivo css
        },
        files: { // Destino <- Origem
          'css/main.css': 'src/main.less'
        }
      }
  });

  // Carrega plugins para o grunt
  grunt.loadNpmTasks("grunt-contrib-less");
};
{% endhighlight %}

Agora podemos compilar nossos arquivos [LESS]({{site.url}}/2013/css-dinamico-com-less/) através do comando:
{% highlight bash %}
$ grunt less
{% endhighlight %}

É claro que ficaria chato rodar task por task, imagine com o tempo a quantidade de tarefas que teriamos? Para isso registramos novas tarefas com a função `grunt.registerTask`. É comum registrar uma tarefa `default` quando não passamos nenhuma tarefa.
{% highlight javascript %}
  // Carrega plugins para o grunt
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["jshint", "uglify", "less"]);
  grunt.registerTask("js", ["jshint", "uglify"]);
};
{% endhighlight %}

E agora podemos simplesmente rodar o comando `grunt` ou `grunt js`.
{% highlight bash %}
$ grunt
{% endhighlight %}

Espero que essa ferramenta lhe traga agilidade e te ajude em seu workflow. Caso seu arquivo de configuração fique muito grande, separe as configurações por arquivos exportando os módulos e utilizando require.