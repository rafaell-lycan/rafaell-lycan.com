---
title: 5 Métodos de Arrays que você deveria estar usando
description: >-
  Veremos como utilizar 5 métodos nativos do JavaScript para você utilizar no seu dia a dia e deixar seu código ainda mais limpo e otimizado.
keywords: >-
  javascript, métodos, arrays, array methods, indexOf, filter,
---
Se você esta começando com JavaScript ou ainda não tem muita idea de como otimizar seu código quando se é necessário trabalhar com Arrays, é hora de darmos um upgrade com uma pequena lista de métodos que vai fazer toda a direfença no seu dia a dia.

## Prólogo

Desde a publicação do ES5 em 2009, temos disponível um novo conjunto de métodos do objeto Array e também uma melhoria significativa nos que já existiam.

Ninguém duvidou da usabilidade para estes métodos, mas para escrever polyfills para eles para suportar em navegadores antigos não era fácil.

> *R.I.P IE6 - Saudades UOL* ❤️

Na época se tornou um **"good-to-have"** ao invés de **"must-have"** para incluir um pequeno polyfill de 6kb que resolvia tudo porque na época reduzir o page load e escrever todo o código possível em VanillaJS era definido pela empresa. *(Só quem passou por isso sabe o que estou falando.)*

Mas graças a diversas mudanças, entre drop de suporte ou até mesmo mudança de empresa em sí --meu caso--, você provavelmente tirou proveito do potencial de se utilizar essas pequenas libs que nos permitiam utilizar coisas novas que hoje seria algo parecido com o que o Babel faz por nós quando precisamos converter um código ES6 por exemplo.

Mas é hora de falarmos do agora, eu pessoalmente vou dar uma leve explicação em alguns métodos que provavelmente você já conheça pela simples natureza de ter se tornado comum entre os desenvolvedores.

## 1. indexOf()

*O método `indexOf()` retorna o primeiro índice em que o elemento pode ser encontrado no array, retorna **-1** caso o mesmo não esteja presente.*

**Use case:** Verificar se a palavra 'morango' existe no array.

Exemplo sem `indexOf()`:
```javascript
var frutas = ['banana', 'morango', 'abacaxi'];
var found = false;

for(var i= 0, l = frutas.length; i< l; i++) {
  if (frutas[i] === 'morango') {
    found = true;
  }
}

console.log('Encontrado?:', found);
```

Com `indexOf()`:
```javascript
var frutas = ['banana', 'morango', 'abacaxi'];

console.log("Encontrado?:", frutas.indexOf('morango') != -1);
```

Mas e se eu quiser retornar todos os resultados que sejam validos dado uma condição?

## 2. filter()

*O método `filter()` cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.*

**Use case:** Encontrar items que a quantidade seja menor que 5.

Exemplo sem `filter()`:
```javascript
var frutas = [
  {name:'banana', count: 2},
  {name:'morango', count: 5},
  {name:'abacaxi', count: 3},
  {name:'laranja', count: 8}
];

var found = [];

for(var i= 0, l = frutas.length; i< l; i++){
  if (frutas[i].count < 5 ) {
    found.push(frutas[i]);
  }
}

console.log('Encontrado?:', found);
```

Com `filter()`:
```javascript
var frutas = [
  {name:'banana', count: 2},
  {name:'morango', count: 5},
  {name:'abacaxi', count: 3},
  {name:'laranja', count: 8}
];

var found = frutas.filter(function(item){
    return item.count < 5;
});

console.log('Encontrado?:', found);
```

Assim como `indexof()`, você esta escrevendo um código mais conciso.

## forEach()

*O método `forEach()` executa uma dada função em cada elemento de um array.*

**Use Case:** Contar elementos de um array.

```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];

// Utilizando o "for loop" para iterar
for(var i= 0, l = arr.length; i< l; i++) {
  console.log(arr[i]);
}

console.log('========================');

// Utilizando o método "forEach" para iterar
arr.forEach(function(number,index) {
  console.log(number);
});
```

Utilizar o método `forEach()` é uma melhora importante sobre o "`for` loop". Eu acredito que você já deva estar utilizando o método `forEach()`, mas em todo caso se você ainda não conhece, por favor use-o!

Um dos problemas comuns que são ignorados a se utilizar o "`for` loop" são as variáveis declaradas ao se utilizar que não são locais, é claro que hoje em dia você já pode utilizar o `let` o que torna possível que estas variáveis sejam acessíveis apenas dentro do mesmo escopo no qual o "`for` loop" irá sobrescrever a cada iteração.

> No [jsperf](https://jsperf.com/for-vs-foreach/75), o "`for` loop" mostra um desempenho melhor que  o `forEach()`.

Na minha opinião, eu prefiro utilizar o `forEach()` a não ser que eu esteja iterando em uma lista de dados muito grande (> 1 milhão por examplo). Nem sempre salvar alguns milissegundos devem ser prioridade sobre produtividade.

## map()

*O método `map()` usa uma função passada por argumento para cada elemento do Array e devolve um novo Array como resultado.*

**Use Case:** Retornar um array de objetos que deve conter uma nova propriedade `fullName`.

Exemplo sem `map()`:
```javascript
var names = [
  {firstName:"Morgan",lastName:"Freeman"},
  {firstName:"Bradley",lastName:"Cooper"},
  {firstName:"Matt",lastName:"Damon"}
];

var newNames = [];

for(var i= 0, l = names.length; i< l; i++) {
  var name = names[i];
  name.fullName = name.firstName + ' ' + name.lastName;
  newNames[i] = name;
}


console.log('Nomes:', newNames);
```

Com `map()`:
```javascript
var names = [
  {firstName:"Morgan",lastName:"Freeman"},
  {firstName:"Bradley",lastName:"Cooper"},
  {firstName:"Matt",lastName:"Damon"}
];

var newNames = names.map(function(name, index) {
  name.fullName = name.firstName + ' ' + name.lastName;
});

console.log('Nomes:', newNames);
```

`map()` é agora meu método favorito para lidar com listas de dados que precisam ser transformadas em algo diferente que precisam ser enviados ao servidor ou para trabalhar com algum framework/lib como [React](https://reactjs.org/).

## reduce()

*O método `reduce()` executa uma função **reducer** (provida por você) para cada membro do array, resultando num único valor de retorno.*

Honestamente eu demorei um pouco antes de utilizar `reduce()` como se não houvesse o amanhã. O conceito em sí era um pouco abstrato para mim e a palavra **accumulator** fazia ainda menos sentido, até que comecei a ver uma exelente série sobre JavaScript Funcional da [nodeschool](https://nodeschool.io/), que me fez entender o conceito, mas ainda não tinha visto muito uso para isso até que comecei a utilizar o `reduce()` em grandes aplicações com [AngularJS](https://angularjs.org/) e [React](https://reactjs.org/) e admito que seu foi incrível.

**Use Case:** Retornar um objeto com o número de vezes que uma string apareceu em um array.

Exemplo sem `reduce()`:
```javascript
var frutas = ['banana', 'morango', 'laranja', 'abacaxi', 'laranja', 'manga', 'banana', 'laranja'];

var count = [];

for(var i= 0, l = frutas.length; i< l; i++) {
  var item = frutas[i];
  count[item] = (count[item] +1 ) || 1;
}

console.log('Ocorrências:', count);
```

Com `reduce()`:
```javascript
var frutas = ['banana', 'morango', 'laranja', 'abacaxi', 'laranja', 'manga', 'banana', 'laranja'];

var count = return arr.reduce(function(acc, item) {
  acc[item] = (acc[item] + 1) || 1;
  return acc;
}, {});

console.log('Ocorrências:', count);
```

Permita-me explicar como o `reduce()` funciona ao meu ver. `reduce(callback, initialValue)` recebe dois parâmetros que são uma função e um valor inicial que será nosso **accumulator** dentro da função. a Função callback por receber quatro parâmetros, `acc`, `cur`, `index` e `array`. Você normalmente vai utilizar os 2 primeiros e talvez o terceiro caso esteja iterando sob objetos com `Object.keys({})`, mas isso é outra história.

```javascript
array.reduce( function( acc, cur, index, array ) {
    ...
}, initialValue );
```

- **acc:** Valor do Acumulador retornado em cada iteração
- **cur:** Valor atual do array
- **index:** Index Atual do array
- **array:** Array original
- **initialValue:** (opcional) Objeto a ser usado como o primeiro argumento da primeira chamada da função callback.

Tome nota que se você não definir `initialValue`, ele será definido pelo primeiro valor do array.

## Conclusão

Se você ainda não esta confiante em utilizar esses métodos no seu dia a dia, mas tente refatorizar aos poucos seus projetos, acredito que utilizando principalmente `map()` e `filter()` no inicio será algo fantástico, e com o tempo quando precisar fazer coisas mais complexas como utilizar vários métodos ao mesmo tempo talvez seja hora de olhar de novo para o `reduce()`. Você aprenderá a ama-lo. Aconteceu comigo.

Até mais!
