---
title: 'AngularJS: Explorando component() method e Life Cycle Hooks'
description: >-
  Um conjunto de boas praticas sobre como escrever seus componentes com
  AngularJS e o novo método componente. Adeus diretivas :D
tags: angularjs javascript development
keywords: >-
  angularjs, component method, angular next, criando componentes com angular,
  angularjs component
---
Fala pessoal, tudo bem?

Atualmente estou fazendo algumas coisas legais com [AngularJS](https://angularjs.org/), [TypeScript](https://www.typescriptlang.org/) e [Webpack](https://webpack.github.io/), e não sei como vocês estão sobre o cenário atual, a eterna escolha entre [Angular 2/4](https://angular.io/) (agora apenas Angular), [React](https://reactjs.org/), [Vue](https://vuejs.org/) e [Ember](https://www.emberjs.com/) (talvez?).

Eu continuo trabalhando basicamente com AngularJS (1.x) e [Ionic](https://ionicframework.com/) (Angular) então sou suspeito para falar qualquer coisa.

## Qual o problema com AngularJS?

AngularJS possui pequenos problemas que temos que conviver desde o principio, principalmente por questões arquiteturais. Acho que o maior problema é com a sopa de escopos que temos (arquitetura baseada em escopo).

Se você não sabe do que estou falando, vou tentar esclarecer as coisas de maneira simples.

A 3 anos atrás quando comecei a trabalhar com Angularjs isso era uma coisa comum, afinal é muito fácil  adicionar porcarias em nosso escopo *($rootScope)* para facilitar a implementação de algumas funcionalidades, porem, fazendo isso perdemos o mapa de relacionamento 1-1 entre nossos **templates** e **controllers**, e se torna difícil de manter.

Isso acontece quando estamos desenvolvendo a nossa aplicação, temos o escopo corrente da página relacionado a um estado *(state)* que normalmente são geridos ações e dados via **controllers** e **services**, mas também quando não sabemos onde colocar as coisas, normalmente adicionamos as coisas no escopo pai para compartilhar a informação, e ***voila!*** :poop:

Mas existe uma maneira melhor...

## Componentes, componentes e componentes!

> Components are the future of web apps
- Pete Bacon Darwin - Angular 1 Lead

Hoje em dia os frameworks terem adotado uma **arquitetura baseada em componentes** *(component-based)*, o Angular 2/4 (ou Angular), lançado em setembro de 2016, React e outros seguem este exemplo e estão mudando a maneira de se desenvolver aplicações, e isso é uma coisa boa, já que cada componente é (ou ao menos deveria) ter uma relação 1-1 com seus **controllers/presenters**, e toda vez que vocês lerem **"componente(s)"** se lembrem disso.

Mas o **AngularJS 1.x não é um framework componente-based**, ou ao menos não da forma que escrevemos nossas aplicações hoje, mas isso não quer dizer que você tenha simplesmente parar no tempo ou então aprender o novo Angular e mudar a sua aplicação do dia para a noite, pois ele tem evoluído também, e desde a **versão 1.5** nos introduziu o método `.component()` para nos ajudar nessa transição para nos ajudar a escrever nossas aplicações baseadas em componentes. E isso não é uma coisa tão nova, o release foi feito em **Fevereiro de 2016** e por algum motivo continuamos utilizando diretivas. Mas porque?

Em linhas gerais, **componentes** são como helpers para **diretivas** com algumas diferenças:

- Possuem escopo isolado por padrão;
- Possuem **one-way data binding**;
- Utilizam controllers por padrão (esqueça a função link/compile);
- Automaticamente utilizam a syntax controllerAs como `$ctrl` em nossos templates, o que significa que `$scope` nunca mais!;
- Possuem um ciclo de vida (assim como React/Angular) o que impacta na performance.

Vamos a uma pequena comparação entre as reais diferenças entre `.component()` e `.directive()`.

## Diferenças e vantagens

```javascript
// directive
module.directive('name', function(){
  return {
    // Definition
  }
})

// component
module.component('name', {
  // Definition
})
```

Primeiramente existe uma mudança clara de syntax, ao invés do nosso segundo parâmetro ser uma função que nos retorna um objeto, passamos como argumento o próprio objeto, mas não só isso, vamos lembrar de alguns atributos que tornam nossas vidas com diretivas mais confusas:

```javascript
// directive
module.directive('name', function(){
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {},
    bindToController: {},
    compile: function(){},
    link: function(){},
    controller: function(){},
    controllerAs: 'alias',
    template: `I'm a directive!`
  }
})
```

Já com componentes o cenário já é um pouco mais limpo:

```javascript
// component
module.component('name', {
  transclude: true, 
  bindings: {},
  controller: function(){},
  template: `I'm a componente!`
})
```

Aparentemente não temos tantas diferenças, apenas coisas definidas por padrão, tendo em mente que isso é um **syntax sugar** para diretivas, porem, desenvolvido para nos ajudar a escrever aplicações "component-based" com escopo isolado e a opção de ter **one-way data binding**, algo que visa simplificar eventualmente um upgrade para o Angular 2/4 (Angular).

Você pode chegar o código fonte para entender o que realmente acontece por de baixo dos panos.

## One-way Data Binding

Você se lembra do **one-time binding** inserido no Angular 1.3? Sem necessidade de biblioteca de terceiros, etc?

Se você não sabe do que estou falando, no final de 2014 foi inserido nativamente (antes você teria que utilizar um [modulo](https://github.com/Pasvaz/bindonce)) para fazer **"bind-once"**, ou seja, parar de atualizar valores a cada vez que o ciclo `$digest` fosse executado.

Para você pode ~~e deve~~ utilizar o **one-way binding** através da expressão `{{ ::value }}`.

Sim apenas adicionando `::` na frente dos seus valores você tem o poder de dizer para o AngularJS que aquele valor não deve mais escutar as atualizações do escopo pai, ou seja, será realizado um unbind do escopo onde qualquer atualização do valor/model não causará alterações na view.

Para saber mais veja dê uma olhada [neste post](https://toddmotto.com/angular-one-time-binding-syntax/) do [@toddmotto](https://twitter.com/toddmotto).

Voltando ao assunto de **one-way binding** utilizando componentes, acredito que também nos recordamos dos possíveis tipos de escopos como `=`, `@` e `&` em nossas diretivas.

Com componentes existe a propriedade `bindings`, que seria algo similar a `scope` ou `bindToController` de uma diretiva, mas não só isso, não senhor.

Agora também temos o novo tipo de escopo `<` que nos permite utilizar **one-way binding**, e com isso nos permitindo criar componentes **stateless** e que não estão ligados ao ciclo `$digest`.

Isso quer dizer que quando passamos um dado para um componente através de **one-way data binding**, o elemento pode acesso para a leitura do dado em sí, porém, não pode alterar o escopo destes dados do escopo pai. Seria uma interação **"top-down"**.

Um simples exemplo de utilização:

```javascript
{
  ...
  bindings: {
    // Pode alterar o valor do "parent scope"
    twoWay: '=', 
    // Possui apenas leitura do valor do "parent scope" não refletindo qualquer alteração
    oneWay: '<'
  },
  ...
}
```

Dessa forma podemos ter uma aplicação seguindo conceito de componentes o que nos dará mais performance e facilidade para desenvolver aplicações onde não iremos gerir tudo através do **parent scope** e muito menos ter nós em nosso ciclo `$digest` que nunca serão utilizados.

## Ciclo de vida de um Angular component

Assim como Angular 2/4, React e outros, junto ao método `.component()` também foi adicionado alguns métodos internos que podemos utilizar através de métodos em seu controlador conhecidos como **component lifecycle hooks**.

### $onInit()

Como o nome já diz, ele é executado na inicialização do controller do seu componente, ou seja, antes mesmo de renderizar os dados do componente, este médoto pode transformar dados através de filtros, carregar dados de serviços, disparar eventos, etc, além é claro de te dar acesso aos dados sendo passados para seu componente através dos `bindings`.

```javascript
const trackingComponent = {
  bindings: {},
  controller: function () {
    this.$onInit = ($analytics) => {
      "ngInject"
      $analytics.eventTrack('eventName');
    };
  }
};

angular
  .module('app')
  .component('trackingComponent', trackingComponent);
```

Acredito que este exemplo não é muito complexo, mas passa uma ideia do que é possível fazer, básicamente enviamos um evento `eventName` a nosso serviço `$analytics` assim que o componente é carregado na página.

Utilizei também o [ng-annotate](https://github.com/olov/ng-annotate) para evitar qualquer sintaxe que seja estranha para quem não esta acostumado a utilizar arrays com as dependências.

### $onDestroy()

Assim como o exemplo anterior, acredito que também é bem autoexplicativo, que será executado quando o o componente for destruido, seja através de um `ng-if`, uma atualização do componente pai que alterou a estrutura dos seus componentes filhos, etc.

Um exemplo razoável para se utilizar este método seria a opção de remover dados que foram carregados pelo componente e foram alocados em algum serviço, remover possiveis eventos que foram associados ao componente, além de dispararmos eventos como no exemplo anterior.

```javascript
const trackingComponent = {
  bindings: {},
  controller: function () {
    this.$onDestroy = () => {
      // Onde o escopo do componente é destruido
    };
  }
};

angular
  .module('app')
  .component('trackingComponent', trackingComponent);
```

### $onChanges()

Definitivamente uma das melhores features, onde utilizando uma **arquitetura baseada em componentes** e **one-way binding** você precisa saber que, quando `$onChanges()` é chamado, você precisa saber de onde vem a modificação em si, uma vez que você pode ter feito bind do escopo dos valores para um componente filho, logo, precisamos ter controle para saber se a modificação foi feita no escopo local, no escopo de um componente pai ou até mesmo alguma modificação do escopo local realizado por um componente filho.

Lembre-se que quando falo escopo local/pai/filho estou me referindo ao dados e eventos que existem em seus controllers, logo, vamos tentar deixar isso o mais claro possível.

O  método `$onChanges(changes)` pore ser executado por todas as ações acima, a **primeira** pode ocorrer na inicialização de um componente que recebe a primeira modificação através dos dados que recebe; A **segunda** que pode ocorrer através das mudanças dos dados recebidas através dos `bindings`, o que executa o método passando como atributo as mudanças como um objeto que podemos entender melhor neste exemplo:

```javascript
const appComponent = {
  template: `
    <div>
      <button ng-click="$ctrl.changeInfo();">
        Change Info
      </button>
      <user-card user="$ctrl.user"></user-card>
    </div>
  `,
  controller: function () {
    this.$onInit = () => {
      this.user = {
        name: 'Luke',
        surname: 'Skywalker',
        homeworld: 'Tatooine'
      };
    };

    this.changeInfo = () => {
      this.user = {
        name: 'Obi-Wan',
        surname: 'Kenobi',
        homeworld: 'Stewjon'
      };
    };
  }
};

angular
  .module('app')
  .component('AppComponent', appComponent);
```

Como podemos ver, estamos utilizando `$onInit()` em nosso nosso `AppComponent` para definirmos alguns dados em `this.user`, também adicionamos um método `changeInfo()` que basicamente atualiza os dados em `this.user`. Essa modificação estará sendo executada em nosso escopo pai, porem agora vamos ver como poderiamos utilizar o `$onChanges` a nosso favor:

```javascript
const UserCardComponent = {
  bindings: { user: '<' },
  template: `
    <div>
      <pre>{{ $ctrl.user | json }}</pre>
    </div>
  `,
  controller: function () {
    this.$onChanges = (changes) => {
      this.user = changes.user;
      // `changes` is a special instance of a constructor Object,
      // it contains a hash of a change Object and
      // also contains a function called `isFirstChange()`
      // it's implemented in the source code using a constructor Object
      // and prototype method to create the function `isFirstChange()`
    };
  }
};

angular
  .module('app')
  .component('UserCard', UserCardComponent);
```

Agora em `UserCard` estamos fazendo **bind** das informações em `{ user: '<' }`, o qual recebe os dados via **one-way binding** e por fim renderizamos a informação e convertemos em um JSON.

Perceba que `changes` é um **objeto especial** que contém a hash para cada um dos atributos/binds/objeto do seu componente e também possui o método `isFirstChange()`, o qual detectamos podemos utilizar para analisar se a mudança foi feita somente no momento de criação do componente, além do valor atual e anterior do atributo em questão através das propriedades `previousValue` e `currentValue`.

***Como assim? Não entendi.***

Como disse anteriormente até mesmo quando carregamos nosso componente, o `$onChanges` é executado, logo, temos um retorno parecido com isso:

```json
{
  "user": {
    "previousValue": {},
    "currentValue": {
      "name": "Luke",
      "surname": "Skywalker",
      "homeworld": "Stewjon"
    }
  }
}
```

Ou seja, já estamos disparando um evento sempre que algo é modificado em nosso componente, seja na criação, modificação de dados ou até mesmo quando o mesmo é deletado. Já quando 

$onChanges(changes), $postLink

## Tipos de componentes

No cenário atual, nós temos 3 tipos de componentes não importando o framework que você utiliza, e esses tipos vão definir a nossa arquitetura baseada em componentes de uma forma mais fácil do que se pode imaginar.

Vamos utilizar um widget comum como uma todo list como exemplo:

```html
<App>
  <AddTodo/>
  <TodoList>
    <Todo/>
  </TodoList>
</App>
```

São eles **stateful**, **stateless**, **root**

#### Componentes Stateless

São componentes de apresentação, onde temos a entrada de dados através de `bindings` (input) e a saída dos mesmos através de eventos (output). Temos em nosso exemplo `<TodoList/>`, que recebe uma lista de tarefas e passa para seus componentes filhos serem renderizados. 

Também podemos pensar em `<Todo/>` como **stateless**, porem quando precisamos marcar um componente como "feito", ao invés de acionarmos um serviço e começar a fazer requisições AJAX e toda aquela bagunça, nós enviamos um evento de volta para o componente pai dizendo que queremos atualizar o valor daquela tarefa em especifico, exatamente o mesmo que fazemos em React por exemplo.

**Stateless (dumb/pure)**

#### Componentes Stateful

Mesmo que sejam similares aos **stateless**, estes podem se comunicar com **services** e outros **escopos** para gerenciar seu próprio **state**, ou seja, ele lida com o estado da aplicação e passa os dados seus componentes filhos. Neste caso, poderiamos assumir o `<App/>` como **stateful** neste exemplo, pois ele irá gerenciar as tarefas, bem como será o container para `<Todo/>` e `<AddTodo/>`.

**Stateful (smart/impure/container)**

#### Componentes Root ou de Views

Estes são componentes do tipo **stateful**, porem, também são os encarregados pelas definições de rotas e e construir nossas views (a partir de uma URL). É o responsável por criar componentes dinamicamente, ou seja, ele pode ser considerado nosso **root/router** ou uma **view** da aplicação.

**Root (smart/router)**

Uma dica, não utilize `$routeConfig` como ilustrado no video de referência, pois o mesmo foi descontinuado pelo time do Angular alguns meses depois. Continue sempre utilizando [UI Router](https://github.com/angular-ui/ui-router) ou até mesmo o [ngRoute](https://docs.angularjs.org/api/ngRoute).

Em uma aplicação real temos como base um **componente root**, que deve ser o único do tipo, e todos os outros níveis de componentes são essencialmente **componentes filhos**, e cada um destes componentes pode ter um tipo diferente

#### .componente() -> @Component

Quando começamos a utilizar `.componente()` e aplicar este novo conceito a arquitetura de nossa aplicação é possível aplica-los em Angular 2 facilmente.

```javascript
// app.componente.ts
import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <div class="main">
    {{ message }}
  </div>
  `
})

export class AppComponent {
  constructor() {
    this.message = 'Hello World!';
  }
  
  ngOnInit() {
    console.log('AppComponent Loaded!')
  }
}
```

Agora vejamos o mesmo componente em AngularJS:

```javascript
// app.component.js

var angularComponent = {
  template: `
  <div class="main">
    {{ $ctrl.message }}
  </div>
  `,
  controller: function(){
    this.message = 'Hello World!';
    
    this.$onInit = function() {
      console.log('AppComponent Loaded!');
    }
  }
}

angular
  .module('app')
  .component('app', angularComponent);
```

Se você prestar atenção, `.componente()` combina a anotação `@Component` com a **classe** em ES6, o que provavelmente muito provavelmente levará poucos minutos para ser refatorado para Angular 2, ainda mais se estivermos utilizando ES6 <3.

## Conclusão

Esse post foi escrito para mostrar um pouco sobre a arquitetura baseada em componentes e como você pode utilizar isso com AngularJS 1x hoje.

Tenha em mente que diretivas ainda são úteis, sempre que necessitamos fazer uma manipulação no DOM, elas continuarão disponíveis no framework. Porém, se você vai criar um componente que possui um template, um controller com `bindToController` e `controllerAs`, comece a utilizar `.component()` hoje.
