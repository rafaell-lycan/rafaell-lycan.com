---
title: Criando um simples <Tabs/> component em React
description: >-
  Vamos ver na prática como criar um simples componente que e utilizar
  subcomponentes em sua composição.
tags: react javascript
keywords: >-
  javascript, react, react components, tab component, react composition,
  functional component
---
Já faz algum tempo que não falo nada sobre React, e por conta que venho trabalhando tanto com React quanto Angular nos ultimos meses, acho que seria interessante ver como podemos criar composição de componentes utilizando uma estrutura simples a qual ira nos permitir reutilizar-los de maneira simples.

A minha motivação para escrever este artigo foi que em 2 meses, minha equipe e eu reescrevemos nossos componentes que utilizamos em várias aplicações, afim de diminuir a duplicação de código e também para revisarmos as dependências de terceiros de vários projetos que utilizamos atualmente.

Inicialmente utilizávamos muitas dependências do Bootstrap o qual provavelmente foi muito útil no início do projeto. Com o tempo, além de nos custar um pouco de trabalho sobrescrever os estilos dos componentes do Bootstrap, também criávamos outros componentes a partir dos elementos que já existiam.

Além disso, tínhamos (ainda temos) muitos componentes open-source para coisas que não queríamos criar do zero, mas hoje com uma maior maturidade decidimos reescrever algumas partes do software para termos mais controle sobre aquilo que desenvolvemos.

## Mantendo a simplicidade

Com objetivo de mostrar como algo simples pode ser feito, vou criar um componente para `<Tabs/>` que seja flexível para renderizar qualquer `jsx` como conteúdo da `<Tab/>, e também algo simples que nos proporcionará facilidade para modificação no futuro.

Vamos então desenvolver algo assim:

```javascript
<Tabs>
    <Tab label={'Tab #1'} className={'tab-custom-class'}>
        <p>content 0</p>
    </Tab>
    <Tab label={'Tab #2'} className={'tab-custom-class'}>
        <CustomComponent propA={'foo'} propB={'bar'} propC={this.handleEvent}/>
    </Tab>
</Tabs>
```

Como podemos ver, `<Tab/>` deve renderizar qualquer `jsx` válido. Isso nos traz a flexibilidade de utilizar propriedades customizadas para outras funcionalidades que sejam úteis no futuro.

## O componente <Tabs/>

O componente `<Tabs/>` gerencia seu próprio **state** e sabe qual conteúdo renderizar baseado na `<Tab/>` selecionada, sendo assim, ele é quem irá mostrar ou esconder conteúdo. Isso também nos traz a capacidade de renderizar uma **tab** por padrão quando nenhuma for selecionada através do **state** interno.

> Obs: Você pode encontrar o link com o código e o demo no final deste artigo.

```javascript
class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: props.defaultActiveIndex || 0 };
  }

  handleTabClick = (tabIndex) => {
    if (tabIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: tabIndex });
    }
  }

  cloneTabElement = (tab, index = 0) => {
    const { activeIndex } = this.state;

    return (
      cloneElement(tab, {
        onClick: () => this.handleTabClick(index),
        tabIndex: index,
        isActive: index === activeIndex,
      })
    );
  }

  renderChildrenTabs = () => {
    const { children } = this.props;

    if (!Array.isArray(children)) {
      return this.cloneTabElement(children);
    }

    return children.map(this.cloneTabElement);
  }

  renderChildrenTabs = () => {
    const { children } = this.props;
    const { activeIndex } = this.state;

    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }

    return children.props.children;
  }

  render() {
    const { className } = this.props;
   
    return (
      <section className={`tabs ${className}`}>
        <ul className={'tabs__list'}>
          {this.renderChildrenTabs()}
        </ul>
        <div className={'tabs__content'}>
          {this.renderActiveTabContent()}
        </div>
      </section>
    );
  }
};
```

## O componente <Tab/>

O componente `<Tab/>` é **stateless** (o que nos permite utilizar um componente funcional), ou seja, o que além de não possuir `state`, possui o único objetivo de renderizar a tab, permitindo que o desenvolvedor especifique o estilo, e executar uma ação `onClick` relacionada ao escopo pai (o componente `<Tabs/>`) quando o evento ocorre.

```javascript
const Tab = (props) => {

  const { className, label, isActive, onClick } = props;

  const tabClass = `tabs__tab ${className}`;
  const linkClass = isActive ? 'tabs__tab-link--active' : 'tabs__tab-link';

  return (
    <li className={tabClass}>
      <a className={linkClass} onClick={onClick}>{label}</a>
    </li>
  );
};
```

## Conclusão

Com apenas um pouco de código e ainda sim flexibilidade, criamos um componente `<Tabs/>` simples, o qual nos permite evoluir-lo se necessário. O código fonte necessário para implementar os componentes podem ser encontrados [neste gist](https://gist.github.com/rafaell-lycan/fa4afbe3e4a1d94c4a5b5609afd017ed), e o pequeno [exemplo aqui](https://codepen.io/rafaell-lycan/full/qymvEm/).

Já implementou algo similar? Você faria algo diferente? Deixe um comentário e vamos aprender juntos :)
