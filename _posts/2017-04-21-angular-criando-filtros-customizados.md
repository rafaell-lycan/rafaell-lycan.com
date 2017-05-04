---
title: 'AngularJS: Criando filtros customizados e além'
tags: angular
resumo: >
  Filtros são mal compreendidos no universo AngularJS, mas no geral eles são insanamente poderosos para transformar dados, e vão te ajudar muito no seu workflow de trabalho.
---

Fala pessoal, tudo bem com vocês?

Eu estava lendo meus emails e esbarrei com 3 emails sobre dúvidas sobre algumas coisas no Angular, algumas perguntas mais avançadas onde até eu tive que dar uma olhada no StackOverflow para entender como solucionar e outras mais simples, onde creio que posso ajudar em um curto artigo.

## O que são Filtros, onde vivem e o que comem?

Sei que muitos de vocês já sabem a respeito de filtros em um aplicação [AngularJS](https://angularjs.org/). Apesar deste tópico não ser avançado, acho que vale a leitura, mesmo que superficialmente.

Sabe quando você precisa formatar algum dado para exibí-lo ao usuário? O Angular já possui alguns filtros built-in como `currency`, `date` e outros. São muito úteis em uma aplicação. Vamos a uma breve descrição

> Transformam o resultado de uma expressão, realizando operações como formato de data, conversão de moeda e ordenação de arrays.
- Rodrigo Branas

## Anatomia de Filtros em AngularJS

Segundo a [API para criação de filtros customizados](https://docs.angularjs.org/guide/filter#creating-custom-filters), não tem nada diferente do que já fazemos com um controller ou serviço, por exemplo.

Utilizamos `app.filter(filterName, function(){})`, o que é um padrão que utilizamos em todas as APIs até o momento.

Um filtro tem uma declaração bem próxima de um `.factory()` por exemplo mas com a vantagem de possuir um **escopo global** quando criado.

Vamos a um exemplo de código:

{% highlight javascript %}
angular
  .module('myAwesomeApp', [])
  .filter('customFilter', function () {
    return function(input, param1, param2) {
      var newValue;
      // Funcionalidade do filtro
      return newValue;
    }
});
{% endhighlight %}

Vamos analisar alguns pontos:

1. Fizemos un `get` no módulo `myAwesomeApp` e depois utilizamos o serviço `filter()` para declarar um novo filtro customizado.
2. O primeiro parâmetro é o nome do filtro, que no nosso caso é  `'customFilter'`, e depois uma função que retorna uma função, que na verdade é o funcionamento do nosso filtro.
3. A função de retorno recebe por padrão o `input` que é o dado a ser filtrado e pode também receber parâmetros opcionais que retorna o output desejado seja ele uma string, um array com uma nova ordenação, um cálculo, etc.

 Para utilizarmos este filtro, seria preciso invoca-lo como `{{ value | customFilter: arg1:arg2...}}`.
 
 Legal? Não, né? Até agora de fato não estamos vendo nada útil.
 
 Antes de falarmos de coisas legais sobre filtros, vamos fazer um exemplo que realmente funcione:
 
{% highlight javascript %}
angular
  .module('myAwesomeApp', [])
  .filter('reverse', function () {
    return function(input) {
      // Retorna o valor reverso basedo em uma string
      return input.split('').reverse().join('');
    }
});
{% endhighlight %}

Agora podemos utilizar este filtro facilmente através de `{% raw %}{{ 'Rafaell' | reverse}}{% endraw %}` e o output renderizado na expressão será **lleafaR**.

Vamos utilizar algumas boas práticas para deixar o mesmo código melhor, levando em conta que o módulo foi declarado em um outro arquivo e estamos criando nosso `reverse.filter.js`:

{% highlight javascript %}
// file reverse.filter.js
(function() {
  'use strict';
  
  angular
    .module('myAwesomeApp') // get module
    .filter('reverse', reverseFilter);
  
  function reverseFilter() {
    return function(input) {
      // Retorna o valor reverso basedo em uma string
      return input.split('').reverse().join('');
    }
  }
})();
{% endhighlight %}

Apenas isolamos o código em uma closure, fizemos o `get` no módulo `myAwesomeApp` declarado em algum arquivo anterior e passamos a função `reverseFilter` como segundo parâmetro para nosso filtro.

Caso você esteja utilizando ES6 (Babel/TypeScript) o mesmo código poderia ser escrito da seguinte maneira:

{% highlight javascript %}
// file reverse.filter.js
const reverseFilter = () => 
  (input) => input.split('').reverse().join('');
  
  angular
    .module('myAwesomeApp') // get module
    .filter('reverse', reverseFilter);
{% endhighlight %}

Lembrando que é possível injetar o serviço `$filter` em um controller ou service, é interessante analisar que com um simples filtro podemos por exemplo validar se uma palavra é um [palíndromo](https://en.wikipedia.org/wiki/Palindrome) ou não.

Quanto aos parâmetros opcionais, poderiamos criar um filtro `'ellipsis'` que adiciona um texto com mais de **x** caracteres onde podemos informar através de um parâmetro opcional o tamanho máximo do texto.

{% highlight javascript %}
// file ellipsis.filter.js
(function() {
  'use strict';
  
  angular
    .module('myAwesomeApp') // get module
    .filter('ellipsis', ellipsisFilter);
  
  function ellipsisFilter() {
    return function(input, size) {
      size = size || 10;
      if (input.length <= size) return input;
      return input.substring(0, size)} + '...';
    }
  }
})();
{% endhighlight %}

O mesmo código com ES6:

{% highlight javascript %}
// file ellipsis.filter.js
const ellipsisFilter = () =>
  (input, size = 10) => {
    if (input.length <= size) return input;
    return `${input.substring(0, size)}...`;
  }
  
angular
  .module('myAwesomeApp') // get module
  .filter('ellipsis', ellipsisFilter);
{% endhighlight %}

Este filtro pode ser utilizado com ou sem o parâmetro opcional, já que o informamos um valor default de **10** caso nada seja informado.

Filtro: `{% raw %}{{ 'Lorem ipsum dolor sit amet' | ellipsis }}{% endraw %}`
Output: `Lorem ipsu...`

Filtro: `{% raw %}{{ 'Lorem ipsum dolor sit amet' | ellipsis : 20 }}{% endraw %}`
Output: `Lorem ipsum dolor si...`

## Filtros Aninhados

Uma nota adicional sobre filtros é que você pode utilizá-los aninhados de maneira muito simples com nossos pipes (`|`), sempre lembrando que são utilizados da esquerda para direita.

`{% raw %}{{ 'Rafaell' | lowercase | reverse | ellipsis }}{% endraw %}`

Nesse caso o texto é transformado em **lowercase**, depois o valor será revertido com **reverse** e por fim será aplicado **ellipsis**.

## Filtros Stateful

Desde a versão 1.3 todos os filtros são **stateless** por padrão, assim se o **input** não foi modificado, então o resultado será o mesmo, isso faz que o **$digest cycle** não seja execute o filtro toda vez que algo mude no escopo da sua aplicação.

Na própria documentação é sugerido evitar a escrita de filtros **stateful** justamente por questões de performance que não podem ser otimizadas, e para fazer isso funcionar, o Angular assume que se a expressão informada para o filtro não seja modificada, o valor do filtro também permanecerá o mesmo. Isso é **statelesss**. Pensando que em alguns casos onde nossos filtros dependem de serviços para formatar o **output**.

Pensando em um cenário real, vamos dar uma olhada no filtro `translate` que pertence ao módulo [angular-translate](https://angular-translate.github.io/). Ele funciona através de **chaves** informados para procura-los em uma tabela de tradução carregada junto a aplicação, e caso nada seja encontrado, retorna a mesma chave utilizando o serviço `$translate`.

**Isso é stateful.**

Vejamos o uso deste filtro:

{% highlight html %}
{% raw %}{{ 'TRANSLATION_KEY' | translate }}{% endraw %}
{% endhighlight %}

Pensando neste contexto, Angular cria um cache sobre o valor da expressão e não modifica o valor do output a não seja que a chave `'TRANSLATION_KEY'` seja alterada.

E este é o problema, porque `'TRANSLATION_KEY'` nunca irá ser modificado. Imagine que o usuário modifica o idioma da página, utilizando a mesma **chave** que deveria checar na tebela de traduções, etc... porém, o valor gerado irá permanecer o mesmo justamente pelo fato dos filtros serem **stateless**.

Então como informamos ao Angular que as expressões passadas para nossos filtros devem ser recalculadas?

Tudo o que precisamos fazer é adicionar uma propriedade `$stateful` em nossa função antes de retorna-la.

{% highlight javascript %}
(function() {
  'use strict';
  
  angular
    .module('myAwesomeApp') // get module
    .filter('customFilter', customFilter);
  
  // Inject customService on the filter
  customFilter.$inject = ['customService'];
  function customFilter(customService) {
    function filter(input) {
      // Change input with some value from customService
      return input += customService.getData();
    }
    
    filter.$stateful = true;
    
    return filter;
  }
})();
{% endhighlight %}

Isso é tudo.

Claro que isso não acontece com o módulo **angular-translate**, já que ele possui uma flag `statefulFilter = true` que força o filtro a ser **stateful** por padrão.

## Resposta ao leitor:

Recebi um email do William Silveira com uma dúvida sobre como criar um filtro que calcula há quanto tempo uma mensagem foi enviada. Esse cálculo pode ser feito utilizando  bibliotecas como [moment.js](https://momentjs.com/).

Um simples exemplo de como resolver este problema seria:

{% highlight javascript %}
(function() {
  'use strict';
  
  angular
    .module('myAwesomeApp') // get module
    .filter('timeAgo', timeAgo);
  
  function timeAgo() {
    return function(input) {
      return moment(input).fromNow();
    }
  }
})();
{% endhighlight %}

A mesma implementação em ES6:

{% highlight javascript %}
import moment from 'moment';

const timeAgo = () => 
  (input) => moment(input).fromNow();
  
angular
  .module('myAwesomeApp') // get module
  .filter('timeAgo', timeAgo);
{% endhighlight %}

E a utilização seria assim: `{% raw %}{{ date | timeAgo }}{% endraw %}`.

## Conclusão

É importante sabermos que os filtros pode ser ferramentas poderosas para extender a apresentação de nossas aplicações e facilitar nosso trabalho. Tenha em mente que é uma recomendação evitar a criação de filtros **stateful**, justamente por conta de performance da sua aplicação. Uma melhor abordagem é sempre manter seus filtros **stateless** que recebem parâmetros.

Você pode ver todos os exemplos desenvolvidos no [CodePen](http://codepen.io/rafaell-lycan/full/GWVQOq/).

Sei que para quem já esta trabalhando com AngularJS a algum tempo, talvez este post não seja tão útil, mas espero poder ajudar pessoas com esse tipo de conteúdo.

Também gostaria de agradecer a [@marinalimeira_](https://twitter.com/marinalimeira_) pela revisão :)

Até mais.
