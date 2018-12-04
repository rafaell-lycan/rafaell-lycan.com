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

## 2 - Mantenha seus componentes pequenos.
## 3 - Entenda como lidar com `this`
## 4 - Use uma função para `setState` ao invés de um objeto.
## 5 - Use Prop-Types sempre que possível.
## 6 - Utilize "React Developer Tools".
