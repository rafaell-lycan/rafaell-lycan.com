---
layout: post
title:  "Começando com React.js"
date:   2015-10-27
categories: javascript
tags: javascript react
keywords:
resumo: >
   Vamos entender qual é a proposta do React, pra que serve e como começar a utilizar.
related:
  - title : React Docs - Getting Started
    url: http://facebook.github.io/react/docs/getting-started.html
  - title : The React Quick Start Guide
    url: http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html
  - title : React.js Conf 2015 - Hype!
    url: https://www.youtube.com/watch?v=z5e7kWSHWTg
  - title : Intro to the React Framework
    url: http://code.tutsplus.com/tutorials/intro-to-the-react-framework--net-35660
  - title : 5 Practical Examples For Learning The React Framework
    url: http://tutorialzine.com/2014/07/5-practical
---

Neste post eu vou abordar um overview do que consegui absorver nas ultimas semanas lendo sobre [React.js](https://facebook.github.io/react/) <del>(embora que tenha lido sobre [Flux](https://facebook.github.io/flux/), [Router](https://github.com/rackt/react-router) e outras drogas também)</del>, veremos como desenvolver interfaces e components com [React](https://facebook.github.io/react/).

Se você esta tentando entender o que é? Para que serve? O que come? E outros deverivados, esse post pode ser para você.

##Mais um framework Hype?
Antes de tudo gostaria de deixar bem claro que sempre fui um tanto crítico sobre frameworks JS, principalmente pelo simples de ter começado com [Backbone.js](http://backbonejs.org/), e por mais de um ano criando coisas legais com [Angular.js](https://angularjs.org/).

**React.js** é uma **biblioteca** de UI desenvolvida pelo **Facebook** para facilitar a criação de componentes interativos e reusáveis. Hoje é utilizada em produção no Facebook, e o **Instragram** foi desenvolvido inteiramente com ele.

O legal é que nos traz um conceito diferente sobre o que é, pois além de não ser um framework e sim uma lib, não vá se enganando sobre frameworks MV*, um framework é um conjunto de ferramentas que resolve diversos problemas, o React é uma biblioteca que tem o proposito de abstrair a complexidade do DOM e renderizar componentes.

Não isso não é uma coisa ruim, acredite.

<div class="center">
  <script type="text/javascript" src="//www.google.com.br/trends/embed.js?hl=pt-BR&q=ReactJS&date=1/2012+37m&cmpt=q&tz=Etc/GMT%2B3&tz=Etc/GMT%2B3&tz=Etc/GMT%2B3&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=700&h=330"></script>
</div>

A biblioteca é relativamente nova, tendo como criador o Facebook e uma comunidade fora do normal, ele vem ganhando força e crescendo a cada dia. Não posso falar nada quanto a isso, mas não acho que será apenas uma moda passageira. Na verdade acho que coisas muito boas como o [Vue.js](http://vuejs.org/) criado pelo [@youyuxi](https://twitter.com/youyuxi) que é do core team do [Meteor.js](https://www.meteor.com/), e outros frameworks/libs que estão por vim, vão se inspirar cada vez mais em novos conceitos e em como isso pode se aplicar a necessidade dos desenvolvedores.

A primeira vez que olhei mais de perto o código de uma aplicação em React, foi o no final de 2014 com o [GithubPulse](https://github.com/tadeuzagallo/GithubPulse), desenvolvido pelo meu colega [@tadeuzagallo](https://twitter.com/tadeuzagallo).

Eu era apenas <del>(e continuo me julgando)</del> um simples desenvolvedor, que conhecia apenas Backbone e Angular, e toda a ideia do React me parecia um tanto turva.

No inicio de 2015 por conta de algumas coisas que estavam acontecendo na [Rocket](https://www.rocket-internet.com/), comecei a estudar mais sobre [Node.js](http://nodejs.org/), JavaScript e outras coisas, incluindo React.

Logo, quero deixar claro que vou passar boa parte do conhecimento que adquiri, mas estou longe, muito longe mesmo de ser um expert.

Nas ultimas semanas eu desenvolvi um player utilizando React e a [API do SoundCloud](https://developers.soundcloud.com/) que você pode ver [funcionando aqui](http://player-rafaell18.rhcloud.com/), ou simplesmente ver o código <del>(o qual preciso melhorar)</del> no meu [Github](https://github.com/rafaell-lycan/estudos-react/tree/master/mini-player-webpack).

##Uma jornada inesperada
Depois de ler boa parte da documentação, e fazer uma analogia com os frameworks que já vinha utilizando, finalmente consegui entender o conceito da coisa, seus benefícios e também que ele não é bala de prata como todos os outros. <del>Sim, quero ver sangue e ameaças nos comentários :)</del>

A primeira parte que foi complicada entender foi o **conceito**, já que ele **não segue o modelo MVC**, de fato React na verdade é uma **biblioteca para criar interfaces baseadas em componentes**, onde basicamente **abstrai o DOM API** quanto a **eventos** a serem disparados *(onClick, onBlur, onChange, etc)* e também sobre os **elementos** em si *(createElement, createTextNode, appendChild, etc)*.

Além disso, React usa um conceito chamado de **Virtual DOM**, que é a camada que renderiza nossos componentes na [DOM Tree](https://en.wikipedia.org/wiki/Document_Object_Model) baseado em mudanças de estados (states), com o minimo de mudanças possíveis. Não entendeu? Se você entendeu meus parabéns, eu levei algumas horas pra processar essa informação e resumir neste parágrafo.

Ainda segundo a documentação, podemos também renderizar a partir do servidor, não testei ainda, mas pelo que li deve ser algo bem interessante, principalmente tratando-se de escala.

##Meh...Conceitos:

- **React Elements:** são basicamente objetos JavaScript que representam os elementos HTML, tais como `h1`, `div`, `span`, etc.
- **Componentes:** Esses sim são os caras legais, basicamente é todo componente que desenvolvemos utilizando os *React elements*, e normalmente são construidos contendo tanto estrutura (markup, classes), quanto funcionalidades (aquela parte de eventos/comportamentos que falamos acima).
- **JSX:** É uma tecnologia para criar nossos elementos e componentes, que basicamente abstrai a forma com que escrevemos nossos componentes e depois compilamos para JavaScript normal, mas não tem nada haver com o React em sí, mas ajuda muito.

**Vamos a um exemplo para que isso não vire uma confusão:**

{% highlight javascript %}
/* Sem JSX */
var Hello = React.createClass({
  displayName: "Hello",
  render: function () {
    return React.createElement(
      "h1",
      null,
      "Hello ",
      this.props.name
    );
  }
});

ReactDOM.render(React.createElement(Hello, { name: "World" }), document.body);

/* Com JSX */

/** @jsx React.DOM */
var Hello = React.createClass({
  displayName: "Hello",
  render: function () {
    return <h1>Hello {this.props.name}</h1>
  }
});

ReactDOM.render(<Hello name="World" />, document.body);
{% endhighlight %}

Ai vai de você, mas imagina se você escrever tudo com JS puro, e tiver N componentes aninhados? Ai fica legal a brincadeira né? Imagina debugar? Ou achar onde tem que mexer? Uhull \o/

Percebeu também a parte da notação `/** @jsx React.DOM */`?

- Você vai precisar importar seus arquivos JSX seguindo esse padrão: <br> `<script src="app.jsx" type="text/jsx">`;
- Adicionar a notação `/** @jsx React.DOM */`;
- E por fim adicionar o **JSXTransformer** que é o compiler de JSX. [Babel](https://babeljs.io/) também funciona ;)

Uma boa solução que tenho adotado é utilizar [Browserify](http://browserify.org/) com [Babelify](https://github.com/babel/babelify), que além de dar suporte a ES6, resolve bem os meu problemas com pacotes do [NPM](https://www.npmjs.com/).

##Ok, tudo muito explicativo, legal, mas porque usar?

- React não é um framework, ele é só o cara que renderiza componentes na sua UI, e manipula o DOM o minimo possível para você ter performance em sua aplicação;
- É estupidamente flexível, abstrato e pode ser utilizado com outros frameworks;
- Ideal para componentes reusáveis, pequenos, extensíveis e fáceis de manter;
- Utiliza **Virtual DOM**, que é bem mais rápido e inteligente do que a API nátiva do DOM;
- É possível renderizar do lado servidor, o que permite ainda mais performance e melhora do SEO (apenas li sobre isso, não usei).

Se você não se convenceu veja os links abaixo:

- [Why did we build React?](http://facebook.github.io/react/blog/2013/06/05/why-react.html)
- [10 reasons to use React in your next project](http://www.htmlxprs.com/post/17/10-reasons-to-use-react-in-your-next-project)
- [React: Convincing the Boss](https://www.quora.com/profile/Pete-Hunt/Posts/React-Convincing-the-Boss)

##Componentes

Componentes são o coração e alma de uma aplicação React, eles são elementos customizados (tipo diretivas customizadas do Angular) e normalmente seguem uma estrutura como essa:

{% highlight javascript %}
var Photo = React.createClass({

  render: function() {
    return <img className='picture' src='http://lorempixel.com/200/200/' />
  }
});

React.render(<Photo />, document.body);
{% endhighlight %}

A função `createClass` recebe um objeto que implementa `render` como função, constroi um novo componente chamado `<Photo />`, que nada mais é do que uma imagem com um `src` e uma classe `picture` e por fim renderiza em nosso `body`.

O que acontece por baixo dos panos é mais ou menos isso aqui:

{% highlight javascript %}
var Photo = document.createElement('img');
Photo.src = 'http://lorempixel.com/200/200/';
Photo.className = 'picture';

document.body.appendChild(Photo);
{% endhighlight %}

##Virtual DOM
Esse cara foi sem dúvidas o achado que faz o React ganhar campo a cada dia.

O Virtual DOM faz a mágica através do método `render`, gerando assim uma representação do elemento onde ele for utilizado (view, outros componentes, etc). O Markup é injetado no documento de uma única vez, e quando temos alguma mudança no componente e o método é chamado novamente, o React prevê o que foi mudado (old, new) com o que já esta em memória para fazer a menor alteração possível e altera no DOM apenas essas pequenas mudanças, ao invés de todo o componente. <del>Sim, você pode chorar</del>

##Propriedades
Propriedades ou simplesmente **Props** podem ser passadas para nosso componente como atributos, exatamente como no HTML.

{% highlight javascript %}
var Photo = React.createClass({

  render: function() {
    return (
      <figure className='picture'>
        <img src={this.props.src} />
        <figcaption>{this.props.caption}</figcaption>
      </figure>
    );
  }
});

React.render(<Photo src='http://lorempixel.com/200/200/' caption='Random Image' />, document.body);
{% endhighlight %}

Neste exemplo passamos dois argumentos na criação de nosso componente, sendo `src` que sera adicionado como propriedade source da imagem e `caption`, que recebera apenas um texto dentro da tag `figcaption`.

Um ponto importante a dizer é que propriedades de um componentes são imutáveis, ou seja, eles nunca mudam.

Perceba também que antes de renderizar o componente, foi adicionado a tag `figure`, que serve de container para os demais elementos. Isso porque o React renderiza apenas um elemento pai (ParentNode), ou seja, você não vai conseguir criar 2 ou mais elementos sem primeiro definir um container.

##Estado e Especificações
Estado ou **State** é um objeto interno do componente que por sua vez é mutável e atualiza os dados do componente toda vez que suas informações mudarem.

Todo componente possui um objeto `state` e outro `props` mesmo que não declarados. Podemos adicionar **states** utilizando o método `setState` que irá disparar uma ação e atualizar nosso componente em todos os lugares que estivermos utilizando `this.state`.

Também podemos especificar na criação de nosso componente estados e propriedades iniciais através dos métodos `getInitialState` e `getDefaultProps` que acredito ter nomes bem explicativos. Ambos retornam um objeto com as propriedades ou estados iniciais do objeto.

{% highlight javascript %}
var Count = React.createClass({
  getInitialState: function(){
    return {
      count: 0
    }
  },
  increment: function() {
    this.setState({
      count: this.state.count + 1
    });
  },
  render: function() {
    return (
      <div className='counter'>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
});

React.render(<Count/>, document.body);
{% endhighlight %}

Quando falamos sobre estado de um componente adicionamos mais complexidade ao mesmo.

Criamos um componente simples, que incrementa um valor a cada vez que clicamos no botão certo? Mas o que acontece no DOM?

- A cada vez que clicamos no botão o método `increment` é chamado através de um listener;
- O estado `count` muda e é renderizado novamente dentro do elemento h1;
- O React renderiza novamente utilizando o Virutal DOM;
- O React compara o novo DOM virtual com o DOM que ele possui em nossa view;
- O React isola o que mudou e atualiza apenas essas mudanças diretamente em nosso DOM.

[Veja este exemplo aqui](https://jsbin.com/bekuyuyupa/edit?html,js,output)

##Eventos
React foi desenvolvido para trabalhar com os eventos nativos dos navegadores, como vimos no exemplo acima, podemos associar um evento a um método facilmente.

##Ciclo de vida de um componente
Bem, essa foi uma das partes complexas de se entender. Acredite, eu demorei um pouco e você também vai.

Quando o método `render` é chamado, esta acontecendo N coisas para carregar o componente, verificar se esta tudo OK e ai sim, finalmente renderiza-lo.

Vamos dar uma olhada rápida no Lifecycle de um componente e seus métodos:

- **componentWillMount:** Chamado apenas uma vez antes da chamada `render`;
- **componentDidMount:** Chamado apenas uma vez depois da chamada `render`;
- **componentWillUnmount:** Chamado quando o componente é destruido;
- **shouldComponentUpdate:** Chamado antes do componente setar seus estados e propriedades, e retorna um valor (boolean) que determina se o componente deve se atualizar ou não;

Para mais informações, você pode [olhar aqui.](https://facebook.github.io/react/docs/component-specs.html)

##Composição: Yeah!
Composição é a parte mais legal da coisa. É quando criamos um novo componente a partir de componentes menores;

O que precisamos ter cuidado é com a direção do Flow, pois o mesmo é unidirecional, totalmente diferente do two-way data biding do Angular, ou seja, com a base de componentes definida, o normal é sempre os componentes pais cuidarem de como gerenciar seus componentes filhos via propriedades/props. Isso também é chamado de **top-down**.

Vamos a um exemplo que fiz bem simples, primeiro vamos criar nosso arquivo `App.jsx`:

{% highlight javascript %}
/** @jsx React.DOM */

var APP = React.createClass({

  render: function() {
    return (
      <div className="container">
        <TodoList />
      </div>
    );
  }

});

React.render(<APP />, document.getElementById('main'));
{% endhighlight %}

Este cara tem a unica responsabilidade de renderizar um componente que possui um componente filho dentro de um elemento com id **main**.

Vamos ao nosso arquivo index.html, e sim, vou usar o Bootstrap só pra não ter que ficar fazendo todo CSS na mão:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TodoList React</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
</head>
<body>
  <div id="main"></div>
  <script src="//fb.me/react-0.13.3.js"></script>
  <!-- Arquivos JSX -->
  <script type="text/jsx" src="app.jsx"></script>
</body>
</html>
{% endhighlight %}

Pronto, agora todos os arquivos JSX nós vamos inserir ali na área comentada.

Bem, o comportamento default de uma TodoList é:

- Apresentar a lista de Todos/Tasks;
- Você pode marcar uma task como completa ou simplesmente deleta-la de sua lista;
- Você pode adicionar novas tasks;

Agora vamos imaginar a arquitetura dos componentes como **top-down**. Se o nosso `App` esta carregando apenas o componente `TodoList` tanto `App` quanto `TodoList` podem ser o componente pai da aplicação, ou seja, onde a lógica é armazenada. Vamos utilizar o `TodoList` e manter o `App` o mais limpo possível.

A primeira coisa a se fazer é definir nosso componente, então vou criar uma `div` para ser o wrapper do componente e também vou criar dois métodos: `loadTasks` que retorna um array com as tasks da aplicação e `renderTasks`, que irá servir para parsear nossas tasks para um componente `Task` utilizando o [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

{% highlight javascript %}
/** @jsx React.DOM */

var TodoList = React.createClass({
  loadTasks: function () {
    return [
        {value : 'Learn JavaScript', done: false },
        {value : 'Buy Milk', done: true },
        {value : 'Learn React', done: false }
      ]
  },

  renderTasks: function () {
    var todos = this.loadTasks().map(function (task, index) {
      return(
        <Task
        key={index}
        value={task.value}
        done={task.done}
      /> )
    });

    return todos;
  },

  render: function() {
    return (
      <div className="col-xs-6 col-xs-offset-3 todo-list">
        <h1 className="title">My Awesome TodoList</h1>
        {this.renderTasks()}
      </div>
    );
  }

});
{% endhighlight %}

Um ponto interessante sobre o React, é que todo componente filho na composição (aquele que ira se repetir N vezes) deve receber uma chave **key** que seja única e fácil de identificar.

Você pode ler mais sobre isso [aqui](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children).

Também vale resaltar que utilizei um método do componente para renderizar a lista de tasks usando `{this.renderTasks()}`.

Por fim vamos criar nosso componente `Task`:
{% highlight javascript %}
/** @jsx React.DOM */

var Task = React.createClass({

  updateTodoClass : function () {
    return (this.props.done) ? 'task task-success' : 'task task-info';
  },

  render: function() {
    return (
      <div className={this.updateTodoClass()}>
        <i className="fa fa-check mark-done"></i>
        <span>{this.props.value}</span>
        <i className="fa fa-times close"></i>
      </div>
    );
  }

});
{% endhighlight %}


Perceba que inserimos a classe CSS do componente com o método `updateTodoClass` baseado na propriedade `done` que passamos como parametro, mas a titulo de curiosidade isso também poderia ser passado como propriedade vindo do componente pai.

Ok, tudo bonito, funciona e tudo mais. Mas e quanto aos eventos?

Perceba que temos dois icones em nosso componente `Task`, sendo um `mark-done` que ira alterar o estado da task e `close` que ira remover a task da nossa lista.

Como disse anteriormente, a regra dos componentes seguem **top-down**, logo um componente não tem que ter essa lógica, ele precisa fazer uma coisa e fazer bem feita, que é renderizar o componente, logo vamos passar como argumentos para nosso componente os métodos `markTaskDone` e `removeTask` que serão criamos posteriormente no componente pai.

{% highlight javascript %}
/** @jsx React.DOM */

var Task = React.createClass({
  /* ... */
  render: function() {
    return (
      <div className={this.updateTodoClass()}>
        <i className="fa fa-check mark-done" onClick={this.props.markTaskDone}></i>
        <span>{this.props.value}</span>
        <i className="fa fa-times close" onClick={this.props.removeTask}></i>
      </div>
    );
  }

  /* ... */
{% endhighlight %}

Agora a implementação dos métodos no `TodoList`, mas agora utilizando **state** para armazenar nossos **todos**:

{% highlight javascript %}
/** @jsx React.DOM */

var TodoList = React.createClass({
  /* ... */
  getInitialState: function () {
    return{
      todos: this.loadTasks()
    };
  },

  markTaskDone: function (index) {
    var todos = this.state.todos;
    var task = todos[index];

    todos.splice(index,1);
    task.done = !task.done;

    task.done ? todos.push(task) : todos.unshift(task);

    this.setState({
      todos: todos
    });
  },

  removeTask: function (index) {
    this.state.todos.splice(index, 1);

    this.setState({
      todos: this.state.todos
    });
  },

  renderTasks: function () {
    var todos = this.loadTasks().map(function (task, index) {
      return(
        <Task
        key={index}
        value={task.value}
        done={task.done}
        markTaskDone={this.markTaskDone.bind(this, index)}
        removeTask={this.removeTask.bind(this, index)}
      /> )
    }.bind(this));

    return todos;
  },

  /* ... */
{% endhighlight %}

Pronto, agora todos os elementos funcionam, já que além de passarmos como parametro para o elemento `Task`, também fizemos `.bind()` da chave/index do elemento para nossa função. Agora ta fácil ;)

Por fim precisamos adicionar uma nova task certo? Nada mais justo do que criarmos um componente que é especializado em fazer apenas isso. Vamos chama-lo de `TaskInput`:

{% highlight javascript %}
/** @jsx React.DOM */

var TaskInput = React.createClass({

  render: function() {
    return (
      <form className="form-group col-xs-8 col-xs-offset-2 task-input" onSubmit={this.props.addTask}>
        <div className="input-group">
          <input type="text" name="task" value={this.props.inputValue} className="form-control" placeholder="Todo..." autocomplete="off" onChange={this.props.triggerChange} />
          <span className='input-group-btn'>
            <button className='btn btn-primary'>Add</button>
          </span>
        </div>
      </form>
    );
  }

});
{% endhighlight %}

Pronto, nosso elemento `TaskInput` recebe como propriedades:

- `inputValue`: Que é o valor default do nosso input;
- `addTask`: Que é disparado no evento `onSubmit` de nosso formulário;
- `triggerChange`: Que é disparado toda vez que o valor do nosso input muda.

Por fim, vamos criar esses médotos em nosso componente `TodoList` e também adicionar no `render` o nosso `TaskInput`:

{% highlight javascript %}
/** @jsx React.DOM */

var TaskInput = React.createClass({
  /* ... */
  getInitialState: function () {
    return{
      todos: this.loadTasks(),
      inputValue: ''
    };
  },

  triggerChange: function (e) {
    this.setState({
      inputValue: e.target.value
    });
  },

  addTask : function (e) {
    e.preventDefault();

    var todos = this.state.todos;

    todos.push({
      value: this.state.inputValue,
      done: false
    });

    this.setState({
      todos: todos,
      inputValue: ''
    })
  },

  render: function() {
    return (
      <div className="col-xs-6 col-xs-offset-3 todo-list">
        <h1 className="title">My Awesome TodoList</h1>
        {this.renderTasks()}
        <TaskInput
        inputValue={this.state.inputValue}
        addTask={this.addTask}
        triggerChange={this.triggerChange}
        />
      </div>
    );
  }
  /* ... */
{% endhighlight %}

É isso, `triggerChange` atualiza o **state** `inputValue` e `addTask` além de interromper a ação default do formulário, também adiciona uma nova task a lista de **todos** e por fim atualiza o **state**.

[Veja este exemplo aqui](https://jsbin.com/xiyuxaqege/edit?output).

##Conclusão
Agora que apresentei o básico do funcionamento do React, você pode começar a estudar mais a fundo e fazer pequenos projetos pra colocar a mão na massa. Tudo dando certo vou postar um pouco mais sobre React, mas não vou parar de falar sobre Angular, podem ficar tranquilos =)

Você também pode dar uma olhada no [meu repositório](https://github.com/rafaell-lycan/estudos-react) do que fiz enquanto estudava React e outras drogas.
