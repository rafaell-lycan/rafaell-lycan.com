---
layout: post
title:  "Automação de tarefas com Grunt.js"
date:   2014-02-14
categories: grunt, automação, javascript, tools
tags: tools, dicas
image: assets/img/posts/automacao-de-tarefas-com-grunt.jpg
comments: true

author_link: http://twitter.com/RafaellLycan
author_profile: https://plus.google.com/113755365039926065548
keywords: grunt js, automação front-end, tools, ferramentas front-end
resumo: >
  Já imaginou poder automatizar tarefas simples como concatenar arquivos, minificar, testar e até mesmo atualizar o navegador a cada Ctrl+S? Conheça o Grunt.js.
---
A maioria dos desenvolvedores front-end já utilizam algum tipo de processo de construção para em seus projetos, mesmo sem saber.

Quando estamos desenvolvendo é normal procurarmos ferramentas que facilitem nosso trabalho, e todo desenvolvedor front-end precisa concatenar e minificar arquivos <code class="code">.css</code> e <code class="code">.js</code>, checar a qualidade do seu código JavaScript ([JSLint](http://www.jshint.com/)/[JSHint](http://www.jslint.com/)) e até mesmo testa-lo antes do "build" afim de seguir as boas práticas para performance de sites, e percebemos que esses processos se repetem.

A questão é: Você vai precisar juntar os arquivos, depois concatenar, provavelmente você deve estar utilizando algum pré-processador entre outras coisas que colocam a prova a nossa sanidade? É ai que precisamos pensar em automatização.

##Porque automatizar?
Automação é a **aplicação de técnicas** computadorizadas ou mecânicas para **diminuir o uso de mão-de-obra** em qualquer processo, especialmente o uso de robôs nas linhas de produção.

Em desenvolvimento de software automação é o processo de escrita de um programa de computador para executar uma série de tarefas automaticamente. <br>
Estas tarefas servem desde para a **garantia do funcionamento** como para a **performance** de um software.

Desde o surgimento do HTML5, construir aplicações web ficou mais complexo, performance virou fator crucial com pacote do código fonte já testado e otimizado.

A complexidade não está só nas linguagens, que evoluíram muito nos últimos anos, mas também na diversidade de dispositivos para acessar a internet, que aumentaram rapidamente (e tendem a continuar...).

No meu caso, algumas tarefas que são "padrão" em todo o projeto são:

* Concatenar e comprimir os arquivos CSS e JavaScript;
* CSS Pré-processado (Sass e Less);
* Testes de JavaScript (Jasmine);
* Validar qualidade do código (JSHint);

Uso até mesmo no meu blog esse padrão de tarefas, acho que é o minimo, mas fazer isso na "unha" é insano.

##Grunt

##Começando