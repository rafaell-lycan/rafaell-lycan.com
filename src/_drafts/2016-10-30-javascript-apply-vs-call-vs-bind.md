---
layout: post
title:  "JS Tips: Apply vs. Call vs. Bind"
date:   2016-10-30
categories: javascript
tags: javascript
keywords:
resumo: >
  Os métodos apply(), call() e bind() são essensiais para desenvolvedores JavaScript. Se você não sabe a diferença entre eles, esse post é para você.
---

## I'm Back bitches
Fala pessoal, tudo bem por ai?

Estava afastado a algum tempo, mas resolvi escrever um pouco , quando esse tópico me pareceu bem relevante, principalmente por ter tido que responder isso entrevista no exterior (Typeform). Então vamos começar.

Uma das coisas mais complicadas sobre a linguagem JavaScript é aprender as diferenças entre os métodos `apply`, `call` e `bind`. Todos esses três métodos nos permitem alterar o valor de `this` em uma determinada função.

Funções em JavaScript são objetos de primeira classe, e você deve/deveria saber isso. E como objetos, funções possuem métodos definidos em seus protótipos, incluindo algumas poderosas como [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) e [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

## TL;DR

- **Call** executa a função e nos permite passar os argumentos sequencialmente (um por um) sendo que o primeiro é o contexto (`this`).
- **Apply** executa a função e nos permite passar os como um array sendo que o primeiro é o contexto (`this`).
- **Bind** retona uma nova função com contexto e argumentos fixos.

O `bind` é um pouco diferente e mais novo, nem todos os browsers tem suporte (browsers antigos), mas ele basicamente criar um wrapper para a sua função criando um novo contexto. Por outro lado, `apply` e `call` são bem similares e frequentemente utilizados para passar métodos para uma função e mudar o contexto `this` explicitamente. Também utilizando `apply` para passar multiplos argumentos para nossas funções, mas em geral, todas são utilizadas para mudar o contexto de uma função. Vamos aprender mais sobre isso daqui a pouco.

Enquanto `apply` e `call` foram definidas no ECMAScript 3 (disponível no IE 6, 7, 8 e browsers modernos), o método `bind` foi adicionado no ECMAScript 5. Estes 3 métodos de função muitas vezes são necessários para resolvermos problemas de contexto. Vamos começar com método **bind**.

## Método Bind

Nós usamos o método `bind` principalmente para modificar explicitamente o contexto (`this`) de uma função ao ser executada. Em outras palavras, `bind()` nos permite setar facilmente qual objeto específico será utilizado como contexto quando uma função ou método é invocado.


```javascript
var p1 = {firstName: 'Rafaell', lastName: 'Lycan'};
var p2 = {firstName: 'John', lastName: 'Doe'};

function sayHello() {
    console.log('Olá ' + this.firstName + ' ' + this.lastName);
}

var hello1 = say.bind(p1);
var hello2 = say.bind(p2);
 
hello1(); // Hello Rafaell Lycan
hello2(); // Hello John Doe
```
