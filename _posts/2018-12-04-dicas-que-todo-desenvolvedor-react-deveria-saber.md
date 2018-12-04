---
title: 7 Dicas que todo desenvolvedor React deveria saber
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

Lembra da dica 1? Componente funcionais não precisam de `bind(this)` o que nos permite utilizar-los sempre que possível, mas no caso de classes, precisamos realizar o binding manualmente uma vez que o React não faz isso para nós automaticamente. A mais de uma forma de realizar o binding, um deles é fazer bind diretamente na função `render`:

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
  }

  logMessage() {
    console.log(this.state.message);
  }

  render() {
    return <input type="button" value="Log" onClick={this.logMessage.bind(this)} />
  }
}
```

Isso definitivamente funciona, mas o problema aqui é que uma nova função é chamada a cada vez que este componente é renderizado, o que pode te causar alguns pequenos problemas de performance dependendo de quantos componentes você possui na mesma view e quantas vezes esses componentes são atualizados.

Uma outra maneira é utilizar [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) no método `render`, o que também é funciona.

```javascript
class MyComponent extends Component {
  ...

  render() {
    return <input type="button" value="Log" onClick={() => this.logMessage()} />
  }
}
```

Aqui temos o mesmo problema, pois mesmo que não seja necessário realizar o `bind(this)` manualmente, estamos criando uma nova função para cada vez o componente for renderizado, logo é apenas uma questão de preferência, uma vez que ambos terão pequenos problemas de performance.

Acredito que a maioria de vocês já esteja familiarizado com o método mais comum, onde realizamos o **bind** diretamente no **construtor**:

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
    this.logMessage.bind(this);
  }

  logMessage() {
    console.log(this.state.message);
  }

  render() {
    return <input type="button" value="Log" onClick={this.logMessage} />
  }
}
```

Desta maneira não criamos o problema de performance como nos métodos anteriores, o que é perfeito para qualquer aplicação. O único problema para mim é a repetição, e com isso eu preciso dizer que amo **ES6**, em especial **arrow functions**, onde de maneira simples podemos utilizar diretamente no método da classe e evitar tanto o problema de performance quanto a repetição do binding no construtor. 

```javascript
class MyComponent extends Component {
  static state = { message: 'Hi' };

  logMessage = () => {
    console.log(this.state.message);
  }

  render() {
    return <input type="button" value="Log" onClick={this.logMessage} />
  }
}
```

Apenas tenha em mente que esta é uma feature em experimento e ainda não esta disponível oficialmente na especificação do ES6, mas você pode utilizar isso hoje utilizando [Babel](https://babeljs.io/) ou simplesmente utilizando [Create React App](/2016/entendendo-create-react-app/) que já possui várias features habilitadas.

## 4 - Use uma função para `setState` ao invés de um objeto.

De acordo com o a [documentação oficial](https://reactjs.org/docs/react-component.html#setstate), o React não garante que as mudanças são aplicadas imediatamente, uma vez que o processo é assíncrono, onde se você precisa ler uma propriedade de `state` logo após utilizar `setState()` pode gerar alguns efeitos colaterais uma vez que o dado pode ainda não ter sido atualizado.

```javascript
// Ao invés disso
this.setState({showPagination: !this.state.showPagination})

// Faça isso
this.setState((state, props) => {
  return { showPagination: !state.showPagination };
))
```

Você pode utilizar uma função que recebe dois parâmetros `state` anterior e as `props` do seu componente, onde todo este processo ocorre de maneira síncrona, o que pode evitar potenciais bugs na sua aplicação.

## 5 - Use Prop Types e Default Props sempre que possível.

Durante o desenvolvimento da sua aplicação, você provavelmente compartilha valores via propriedades entre seus componentes, logo se um de seus componentes recebe um texto, este texto deveria ser uma `string` correto. Digamos que você tem um componente que recebe um texto como parâmetro obrigatório e que você utiliza o método `toLocaleUpperCase()` o qual é exclusivo para strings, porem você se depara com um valor do tipo `number`? E quanto a `undefined`?

**Prop-Types** é uma biblioteca para nos ajudar a previnir bugs garantindo que estamos informando o tipo certo de dado para um componente.

```javascript
import PropTypes from 'prop-types'

class MyComponent extends Component {
  render() {
    return <h1>Hello {this.props.name.toLocaleUpperCase()}</h1>
  }
}

MyComponent.propTypes = {
  name: PropTypes.string.isRequired
}
```

De maneira similar, mesmo garantindo que aceitamos um certo tipo de dado, talvez nossa API não retorne um valor que não é obrigatório em nossa aplicação, e sendo assim devemos adicionar `defaultProps` uma vez que nosso `propType` não é mais obrigatório o que vai garantir que você e seus companheiros desenvolvedores não esqueçam de fornecer algum dado para um componente ou simplesmente para previnir algum bug inesperado.

```javascript
import PropTypes from 'prop-types'

class MyComponent extends Component {
  render() {
    return <h1>Hello {this.props.name.toLocaleUpperCase()}</h1>
  }
}

MyComponent.defaultProps = {
  name: 'World'
}

MyComponent.propTypes = {
  name: PropTypes.string
}
```

## 6 - Utilize React Fragments.

Você recebeu ou criou um layout todo em HTML, com as melhores práticas de web semântica e tudo parece lindo. Agora tudo o que você precisa é implementa-lo em React, começando pela **header** até ficar perfeita... logo então o **bloco de conteúdo**... perfeito... oops... esquecemos que precisamos criar um **wrap** para isso... ah não... react... merda! 😢

Isso é um problema bem comum na verdade, onde por um longo tempo, onde tínhamos que criar um **wrap** para tudo:

```javascript
class MyComponent extends Component {
  render() {
    return (
      <div>
        <header>Header 😐</header>
        <main>Main Content 😢</main>
      </div>
    )
  }
}
```

E por conta disso sempre adicionávamos um novo elemento ao nosso DOM por conta disso, mas felizmente existe algo chamado "[React Fragments](https://reactjs.org/docs/fragments.html)" desde a versão 16, o que nos permite construir uma aplicação sem ter que adicionar um **wrap** para agrupar elementos no nosso DOM. A utilização é a mesma, porem ao invés de utilizarmos uma `div` nós usamos um `<React.Fragment></React.Fragment>` ou o shorthand `<></>`

```javascript
class MyComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <header>Header 😎</header>
        <main>Main Content 😝</main>
      </React.Fragment>
    )
  }
}
```

Ou simplesmente...

```javascript
class MyComponent extends Component {
  render() {
    return (
      <>
        <header>Header 😎</header>
        <main>Main Content 😝</main>
      </>
    )
  }
}
```

Se você ainda não sabia disso, seu dia acaba de ficar mais bonito. De nada 😎

## 7 - Utilize "React Developer Tools"

Acho que essa dica todos já sabem e utilizam, mas por via das dúvidas, para você que chegou neste artigo e ainda não tem conhecimento sobre isso, [React Developer Tools](https://github.com/facebook/react-devtools) é uma extensão disponível para [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) e [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/) que nos permite inspecionar a hierarquia dos componentes em nossa aplicação bem como as `props` e o `state` de cada um dos seus componentes, que é sem dúvida uma ferramenta muito útil e valiosa para debugar e analisar o código da sua aplicação.

## Conclusão

Acredito que muitos destes 7 pontos já são de conhecimento comum, mas também acho importante compartilhar o que aprendi nestes últimos anos trabalhando com React em diferentes aplicações e como manter um padrão de código limpo e de fácil manutenção, sem contar que estes fazem parte de um conjunto de boas práticas adotadas por mim e pelo meu time.

Sinta-se a vontade para comentar e compartilhar qualquer outra dica que você considera importante, uma vez que estes 7 pontos são apenas algumas coisas que julguei importante resaltar para aqueles que estão começando a trilhar seu caminho neste mundo. Não achei tão importante falar sobre **conditional rendering**, **absolute imports** ou **estrutura de projetos** pois acredito que isso varia muito de cada projeto e da mentalidade de cada time, mas tão pouco tiro a importância de cada um. Talvez vire um futuro artigo.
