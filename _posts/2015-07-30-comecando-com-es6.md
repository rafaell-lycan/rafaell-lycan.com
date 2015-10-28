---
layout: post
title:  "Começando com ES6"
date:   2015-07-30
categories: javascript
tags: javascript
image: assets/img/posts/comecando-com-es6.jpg
keywords:
resumo: >
  Sinceramente estou ouvindo falar sobre ES6/ECMAScript 2015 a um bom tempo, mas nunca tinha parado para estudar mais a fundo. Sim isso realmente é novo mas não é o futuro, é o agora!

related:
  - title : Learn ES2015 (Babel Website)
    url: https://babeljs.io/docs/learn-es2015/
  - title : ES6 Rocks
    url: http://jsrocks.org/
  - title : ECMAScript 6 Tutorial
    url: http://ccoenraets.github.io/es6-tutorial/
  - title : ECMAscript 6 Lessons (Egghead.io)
    url: https://egghead.io/technologies/es6
---

Bem, nas ultimas semanas me deparei com alguns tutoriais utilizando ES6 (tambem conhecido como ECMAScript 2015 ou Harmony) como exemplo. Sim achei algumas coisas divinas, já outras são coisas que temos no Node.js por exemplo. Outras são coisas que alguns queriam a muito tempo para aproximar desenvolvedores back-end da linguagem JavaScript como classes.

Pois bem, este pode ser um post inútil para alguns, mas foi o que absorvi no ultimo mês e estou começando a utilizar em projetos pessoais com [Browserify](http://browserify.org/) e [Babelify](https://github.com/babel/babelify).

Na ultima semana terminei de assistir a um [workshop](http://howtocode.com.br/cursos/organizando-javascript) realizado pelo [@fnando](https://twitter.com/fnando) mostrando alguns goodies de JS já utilizando ES6. Confesso que fiquei perplexo no início já que o compilador ficava cuspindo um monte de código sem sentido ES5, porem tudo funcionando. Então percebi assim duas coisas:

- 1- ES6 não é difícil se você já sabe JS;
- 2- [Babel](https://babeljs.io/) é o transpiler mais quente do momento (Sorry TypeScript).

Pois bem, agora chegou a hora de passar o pouco que aprendi adiante, não se preocupe se você é um back-end developer, eu acredito que este pode ser o melhor momento para você aprender ES6, já que ele é muito mais clean e possui uma sintaxe um pouco mais bonita (Sugar syntax).

###GOALS
- Modules;
- Arrow Functions;
- Classes;
- let & const;
- Template strings.

##Modules
Porque não utilizar módulos hoje? Nós já fazemos isso no **Node** utilizando o padrão **CommonJS** ou até mesmo no front-end utilizando [Browserify](http://browserify.org/) e [RequireJS](http://requirejs.org/).

{% highlight javascript %}
//sum.js
var sum = function(x, y) {
  return x + y;
};

export { sum }

//multiplier.js
var multiplier = function(x, y) {
  return x * y;
};

export { multiplier }

//calculator.js
import { sum } from "./sum";
import { multiplier } from "./multiplier";

var result = sum(15,27);   // 42
result = multiplier(6,7);  // 42
{% endhighlight %}

Nada de mais certo? Já temos isso no Node, declaramos algo a ser exportado com `module.exports` e utilizamos `require` para utilizarmos em nossa app.

Ok, tudo muito legal...era isso que queriamos...um belo dia nativo para os browsers. Mas calma, ainda é possível brincar um pouco mais:

{% highlight javascript %}
//calculator.js
export function sum(x, y) {
  return x + y;
};

export function multiplier(x, y) {
  return x * y;
};

// --- OU ---

var sum = function (x, y) {
  return x + y;
},
  multiplier = function (x, y) {
    return x * y;
};

export { sum, multiplier };

//app.js
import { sum, multiplier } from 'calculator';
// Importar ambas as declarações de um mesmo arquivo

// --- OU ---

import { sum as somar, multiplier as multiplicar } from 'calculator';
// Utilizar alias para as declarações exportadas

// --- OU ---

import * from 'calculator';
// Importar todas as declarações exportadas
{% endhighlight %}

São algumas outras opções do que se pode fazer com módulos no ES6. Acredito que para alguns isso não será grande coisa, mas achei interessante ter isso nativo no lado cliente.

##Arrow Functions
Bom, muita gente que eu vi falar de ES6, estavam completamente apaixonados pela **arrow functions**, e não é pra menos, já que além de diminuir a quantidade de código também te da "de graça" o escopo pai, sem precisar de `.bind(this)` nem nada do tipo.

Vamos a um exemplo utilizando coisas que já fazemos no JavaScript.

{% highlight javascript %}
var products = [
    { name: 'Macbook Pro', val: 1999 },
    { name: 'Go Pro', val: 299 },
    { name: 'PlayStation 4', val: 599 }
];

console.log(products.map(prod => prod.val));
// [1999, 299, 599] // [1999, 299, 599]

var prices = products.map(prod => prod.val);
var sum = prices.reduce((a, b) => a + b);
// 2897

console.log(sum);

var productsWithTax = products.map(prod => {
    var val = prod.val;
    return val * 1.6;
});

console.log(productsWithTax);
// Nossos produtos com 60% de imposto
// Sem levar em consideração a conversão para o dolar =)
{% endhighlight %}

Bem simples este exemplo utilizando **.map** certo? Não sei mais o que podemos utilizar de exemplo, vamos com as funções simplistas utilizadas acima:

{% highlight javascript %}
var sum = (x, y) => {
  return x + y;
},
  multiplier = (x, y) => {
    return x * y;
};
{% endhighlight %}

Entendeu como funciona? Ainda assim temos passagem por block scope com nenhum ou mais argumentos, ou simplesmente a expressão sem necessidade de um bloco.

**Algo assim:**
{% highlight javascript %}
() => { … }   // Sem argumentos
x => { … }    // Um argumento

(x, y) => { … }         // N argumentos
x => { return x * x }   // Block scope
x => x * x              // Mesma expressão sem necessidade do block scope
{% endhighlight %}

Sabe **Promise**? Eu venho utilizando esta abordagem em meus projetos e estou bem satisfeito. Vamos a um exemplo simples:
{% highlight javascript %}
var promise = new Promise((resolve, reject) => {

  if (/* Condição */) {
    resolve("Promise + Arrow Functions = <3");
  }
  else {
    reject(Error("Oops!"));
  }
});

promise.then((result) => {
  console.log(result);  // "Promise + Arrow Functions = <3"
}, (err) => {
  console.log(err);     // Error: "Oops!"
});
{% endhighlight %}

Existem **N** partes que você pode utilizar Arrow Functions, basta ver se faz sentido e, utilizar em seu projeto.

##Classes
Agora vem a parte legal, eu particularmente conheço muita gente que fala que JavaScript não suporta Orientação a Objetos, que isso, que aquilo.

Certa vez, lendo o livro [Secrets of the JavaScript Ninja](https://www.manning.com/books/secrets-of-the-javascript-ninja) do [@jeresig](https://twitter.com/jeresig), ele cita algumas vezes no começo sobre **funções serem objetos de primeira classe** e uma parte sobre **funções construtoras**. Depois que li isso tive certeza quanto ao JavaScript supoartar OO mesmo sendo baseada no que é chamado de `prototype`.

Você pode nunca ter visto a palavra `class`, mas provavelmente já viu algo do tipo:

{% highlight javascript %}
function Todo () {
  var items = [];

  this.getItems = function () {
    return items;
  };

  this.addItem = function(item) {
    items.push(item);
  };
}

var todo = new Todo();
todo.addItem('Aprender ES6');
todo.addItem('Ir no BrazilJS');
console.log(todo.getItems());  // ["Aprender ES6", "Ir no BrazilJS"]
{% endhighlight %}

Bem, mesmo não aceitando você acabou de ver um pseudo código bem simples de como objetos funcionam no JS. Não vou prolongar este post explicando sobre isso, você pode entender o conceito neste [ótimo post](http://wbruno.com.br/javascript-puro/afinal-como-e-orientacao-a-objetos-em-javascript-exemplos/) do [@wbrunom](https://twitter.com/wbrunom).

Sem mais delongas... vamos nos benificiar das classes do ES6 utilizando exatamente o mesmo código acima:

{% highlight javascript %}
class Todo {
  constructor() {
    this.items = [];
  }

  getItems () {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
  }
}

var todo = new Todo();
todo.addItem('Aprender ES6');
todo.addItem('Ir no BrazilJS');
console.log(todo.getItems());  // ["Aprender ES6", "Ir no BrazilJS"]
{% endhighlight %}

Pronto! Ta ai seu `class`. Vamos analisar o código:

- Definimos no `constructor` que iremos criar uma propriedade `items` que nesse caso não esta recebendo nenhum argumento;
- Diferente da função construtora, a propriedade `items` não é privada;
- Definimos os mesmos métodos utilizando `name () { ... }`, o que funciona exatamente da mesma forma;
- Instanciamos o objeto exatamente da mesma forma que a função construtora.

Eu venho acompanhando o [blog do Dr. Axel Rauschmayer](http://www.2ality.com/) que esta atualmente escrevendo o livro [Exploring ES6](https://leanpub.com/exploring-es6/) e achei algumas referencias para deixar um atributo privado em uma classe. Não é muito elegante, mas funciona:

{% highlight javascript %}
var _items = [];

class Todo {
  constructor() {
  }

  getItems () {
    return _items;
  }

  addItem(item) {
    _items.push(item);
  }
}
{% endhighlight %}

Como disse, não é uma maneira muito elegante, mas se for necessário você provavelmente vai separa isso num módulo e vai exportar apenas a classe.

Também podemos ter o conceito de herança muito mais claro com ES6, vou utilizar um exempo ridiculo que vi na faculdade mas acho que serve nesse caso:

{% highlight javascript %}
class Conta {
  constructor(number, dono) {
    this.number = number;
    this.owner = dono;
    this.saldo = 0;
  }

  deposit(qnt) {
    if(qnt > 0) {
      return this.saldo += qnt;
    }
    throw new Error("Insira um valor valido");
  }

  withdraw(qnt) {
    if(qnt <= this.saldo) {
      return this.saldo -= qnt;
    }
    throw new Error("Você não tem saldo suficiente");
  }

  checkSaldo() {
    return this.saldo;
  }
}

class ContaCorrente extends Conta {
  constructor(number, dono){
    super(number, dono);
    this.type = 'Corrente';
  }
}

var cc = new ContaCorrente(10007,'Rafaell');
cc.deposit(1000);

console.log(cc.checkSaldo()); // 1000
{% endhighlight %}

- Criamos a **ContaCorrente** `ContaCorrente` e utilizamos `extends` que herda os métodos da classe pai;
- Perceba que no construtor, utilizamos a mesma assinatura, porem passamos como atributos para o método `super` que nada mais é do que o construtor da classe pai.

Esse conceito de herança já existe a algum tempo, mas o código serial algo assim:

{% highlight javascript %}
function Conta (number, dono) {
  // Code
};

function ContaCorrente (number, dono) {
  // Code
};
ContaCorrente.prototype = Object.create(Conta.prototype);
ContaCorrente.prototype.constructor = ContaCorrente;
ContaCorrente.parent = Conta.prototype;
{% endhighlight %}

Funciona, mas realmente é algo um pouco mais cansativo para se ler e/ou escrever.

## let & const
Uma coisa interessante que veio com ES6 mas me deixou confuso no inicio foi `let` e o **block scope**.

O `let` funciona parecido como o `var` porem ele corrige o problema que temos quanto ao escopo e [hoisting](http://loopinfinito.com.br/2014/10/29/hoisting-e-escopo-em-javascript/), ou seja, ela ira apenas existir quando definida em um bloco (`{}`) onde sera criado seu escopo.

{% highlight javascript %}
// ES5
var a = 1;

if (1 === a) {
 var b = 2;
}

console.log(b); // 2

// ES6
var a = 1;

if (1 === a) {
 let b = 2;
}

console.log(b); // Uncaught ReferenceError: b is not defined
{% endhighlight %}

Nesse caso utilizando `let`, podemos ver claramente que o valor de b não é declarado fora do bloco `if` na etapa de hoisting. Ao meu ver isso é até complicado de se explicar, mas vou utilizar um outro exemplo que talvez fara mais sentido:

{% highlight javascript %}
for (var i = 0; i < 3; i++) {
 // …
}

function someFunc() {
 var a = 'My Secret Value';
}

console.log(i); // 3
console.log(a); // Uncaught ReferenceError: a is not defined
{% endhighlight %}

Acho que agora vou conseguir explicar melhor. Se você não sabia, quando utiliza o `for`, a variavel que usa como **count** é definida globalmente no escopo durante o hoisting, enquanto a variável `a` esta presente apenas dentro da função `someFunc`. A função cria um novo contexto para a variável `a`, porem ela também pode enxergar a variável `i` do nosso loop. Uma forma de evitarmos isso durante o hoisting é utilizando `let`, que cria uma variável dentro de um escopo isolado definido por blocos (`{}`):

{% highlight javascript %}
for (let i = 0; i < 3; i++) {
 // …
}

function someFunc() {
 let a = 'My Secret Value';
}

console.log(i); // Uncaught ReferenceError: i is not defined
console.log(a); // Uncaught ReferenceError: a is not defined
{% endhighlight %}


Meh...**constantes**

Agora temos `const` funciona também respeitando o block scoping como `let`, porem se comporta da forma que uma constante deveria se comportar (ready only).

{% highlight javascript %}
const PI = 3.141593;

PI = 3.14; // throws “PI” is read-only
{% endhighlight %}

##Template strings
Depois de muito tempo, agora temos **template strings** nativo com ES6.

**WAT?!**

Melhor eu mostrar =)

{% highlight javascript %}
// Sem template String
let link = 'http://www.ecma-international.org/ecma-262/6.0/';
let cssClass = 'link-js';
let text = 'ECMAScript® 2015 Language Specification';
let elementTpl = '<a href="' + link + '" class="' + cssClass + '">' + text + '</a>';

console.log(elementTpl);
// <a href="http://..." class="link-js">ECMAScript® 2015...</a>

// Com template String
elementTpl = `<a href="${link}" class="${cssClass}">${text}</a>`;

console.log(elementTpl);
// <a href="http://..." class="link-js">ECMAScript® 2015...</a>
{% endhighlight %}

Não é lindo? Simples? Quase uma obra divina?

E o melhor, apenas utilizando <code>`</code>

##Conclusão
ES6 não é pra ser usado no futuro, etc... é pra ser aprendido e se possível utilizado hoje!

Você pode aprender lendo sobre isso em blogs ou vendo vídeos como eu fiz, ou procurar alguma documentação.

Algumas boas referencias para estudo e opções de transpilers:

- [ES6-Learning](https://github.com/ericdouglas/ES6-Learning) by [@ericdouglas_](https://twitter.com/ericdouglas_)
- [ECMAScript 6 Tools](https://github.com/addyosmani/es6-tools) by [addyosmani](https://twitter.com/addyosmani)


Como fazer isso? Bom, eu li num [post](http://jsrocks.org/pt-br/2015/05/how-i-m-using-es6-modules-in-production/) do [@jaydson](https://twitter.com/jaydson) sobre utilizar o [Babel](https://babeljs.io/) como transpiler e carregar os módulos com o [Browserify](http://browserify.org/). Isso tem funcionado bem nos meus projetos, ainda não consegui colocar isso aqui no [Tripda](https://www.tripda.com.br/), mas não vai demorar muito. =)
