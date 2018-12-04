---
title: Dicas que todo desenvolvedor React deveria saber
description: >-
  Se você é novo em React, você pode se beneficiar de algumas dicas valiosas de
  outras pessoas que aprenderam boas práticas entre acertos e erros.
tags: react javascript
---
Muitos de nós, devs front-end, devs JavaScript e também devs React ~~hype do momento~~ trabalhamos em equipes com vários outros desenvolvedores com diferentes níveis. Um dos melhores métodos para melhorar seu código é através do **"Code Review"**, porem, nós não só verificamos como tudo funciona, mas também vemos como nossos companheiros chegaram a tal resultado afim de garantir um **código limpo e claro**.

Mas por que? Bom, é até bem simples, uma vez que você trabalhe em uma equipe de 5 desenvolvedores no mesmo projeto, fica fácil perguntar diretamente como as coisas funcionam e porque das decisões. Mas se você trabalha em uma equipe grande, com vários times em projetos diferentes onde tudo muda muito rápido, manter esse **"padrão"/"código limpo"** simples e entendível, vai nos ajudar e também a outros desenvolvedores a entender melhor o que seu código faz e se tudo esta de acordo com as melhores práticas.

Eu escolhi 7 boas práticas que ajudaram a mim e ao meu time a melhorar o padrão dos nossos projetos em React. Então deem uma boa olhada e sintam-se livre para utiliza-los também.

## 1 - Use componentes funcionais.

Todos nós estamos muitos felizes e gratos que ES6 trouxe o suporte a classes e provavelmente você também ama isso. Em React nós podemos criar um componente apenas extendendo `React.Component`, onde podemos ter um **state**, **ciclo de vida**, **event handlers**, etc. Mas nem sempre precisamos de tudo isso, mas como sabemos que podemos utilizar.

```javascript
class MyComponent extends Component {
  render() {
    return <h1>Hello {this.props.name}</h1>
  }
}
```

Mas as vezes, muitos desenvolvedores se esquecem que talvez esse componente seja **dummy**, ou seja, não necessite de um **state** interno** ou **ciclo de vida**. Um componente funcional como o nome sugere, é uma função que recebe `props` como parâmetro e retorna um `React.Element`.

```javascript
const MyComponent = (props) => {
    return <h1>Hello {props.name}</h1>
};

// Ou simplesmente 

const MyComponent = (props) => <h1>Hello {props.name}</h1>;
```

Ok, mas por que eu deveria utilizar um componente funcional? Simples, eles são muito mais simples pois não precisam extender uma `classe`, alem de **facilidade para entender e testar** além de escrever **menos código** e garantir que seu componente será sempre **stateless** e não precisará lidar com `this` **binding** para métodos internos, o que ajuda na refatoração para componentes menores quando precise.

Ok, então quando eu preciso extender componentes ou criar componentes funcionais? **A regra é clara**, quando você precisar de algo que um componente funcional não tem *(state interno, lifecycle, event handlers)* use uma classe para extender um componente!

O que me leva ao seguinte tópico...

## 2 - Mantenha seus componentes pequenos.

Componentes pequenos são mais fáceis de ler e testar além de reutilizar e manter. Aqui temos um simples exemplo de `Comments` onde exibimos as informações de um comentário bem como seu criador.

```javascript
class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="user-info">
          <img className="avatar"
            src={this.props.user.avatarUrl}
            alt={this.props.user.name}
          />
          <h4 className="user-info__name">
            {this.props.user.name}
          </h4>
        </div>
        <div className="comment__text">
          {this.props.text}
        </div>
        <div className="comment__date">
          {this.formatDate(this.props.date)}
        </div>
      </div>
    );
  }
}
```

A primeira coisa que já percebemos é que os dados do usuário poderiam ser extraídos em um novo componente `UserInfo`, o qual receberia apenas as propriedades necessárias para renderizar e assim garantir um componente mais **simples**, **testavel** e **manutenivel**.

Como o componente apenas renderiza os dados informados em `props` vamos utilizar um **componente funcional** como exemplo:

```javascript
const UserInfo = (props) => {
  return (
    <div className="user-info">
      <img className="avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
      <h4 className="user-info__name">
        {props.user.name}
      </h4>
    </div>
  );
}
```

Pronto! E podemos substituir todo o bloco em `Comment` por nada mais que `<UserInfo user={this.props.user} />`. Muito bem! Mas ainda poderíamos ainda extrair a imagem para um componente `Avatar` para deixa-lo ainda menor e reutiliza-lo onde for necessário:

```javascript
const Avatar = (props) => {
  return (
    <img
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

E com isso você simplesmente utiliza `<Avatar user={props.user} />` em seu componente `UserInfo`, o que novamente vai te garantir **simplicidade**, **testabilidade** e **manutenibilidade**. Melhor? Bom, sim e não, este foi apenas um exemplo, mas muitas vezes você vai se deparar com casos como esse onde você não vai precisar dar muita importância, tudo vai depender da complexidade que você tem.

## 3 - Entenda como lidar com `this`

Eu preciso dizer que amo ES6, em especial [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), de maneira simples, **arrow functions** e sempre utilizam o **escopo pai**, o que evita `bind(this)`. 

## 4 - Use uma função para `setState` ao invés de um objeto.
## 5 - Use Prop-Types sempre que possível.
## 6 - Utilize "React Developer Tools".
