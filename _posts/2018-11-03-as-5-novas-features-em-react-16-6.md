---
title: As 5 novas features em React 16.6
description: >-
  Por mais que tenha a aparência de um minor release, a versão 16.6 do React
  lançada na última semana, nos traz novos recursos, como o tão esperado
  **Suspense API**, e também o novo HoC **memo** e a função **lazy**. Veremos um
  pouco mais sobre os 5 novos recursos desta versão ✨
tags: react
---
Por mais que tenha a aparência de um minor release, a versão 16.6 do React lançada na última semana, nos traz novos recursos, como o tão esperado **Suspense API**, e também o novo HoC **memo** e a função **lazy**. Veremos um pouco mais sobre os 5 novos recursos desta versão ✨

## 1 - Memoização com `memo`

Lembrando que existem várias maneiras de criar um componente com React:

#### Com classes extendendo `Component`

Neste exemplo, podemos utilizar métodos para controlar o estado e ciclo de vida do componente. Por padrão, ele é renderizado novamente a cada mudança (é possível otimizar com `shouldComponentUpdate`).

```js
class Button extends Component {
  render() {
    return <button />;
  }
}
```

#### Com classes extendendo `PureComponent`

Neste exemplo assim como no anterior, nos permite controlar o estado e ciclo de vida do componente através de métodos, porem, ele só será renderizado novamente se uma de suas **props** forem alteradas.

```js
class Button extends PureComponent {
  render() {
    return <button />;
  }
}
```

#### Com funções (stateless)

Neste exemplo mais recente, podemos criar um componente sem a necessidade de controle estado ou ciclo de vida, e como Como um `class Component`, esse tipo de componente é renderizado novamente a cada mudança.

```js
const Button = () => <button />;
```

Um componente *stateless* (ou componente funcional), será renderizado novamente sempre que houver uma mudança no componente pai. Esse comportamento pode causar problemas de desempenho.

### ✨ Introduzindo `memo` ✨

Para evitar isso, agora podemos usar o HoC `memo`, que adota o mesmo comportamento que o `PureComponent`, prevenindo assim renderizações desnecessárias:

```js
const Button = React.memo(() => <button />);
```

💡Assim como o `PureComponent`, `memo` compara apenas as propriedades no primeiro nível do objeto, ou seja, se suas propriedades contém objetos, a verificação será baseada no ponteiro de memória desse objeto (equal), e não no conteúdo em si (deep equal). Você pode passar um segundo argumento com a sua própria função de comparação:

```js
React.memo(CustomComponent, _.isEqual);
```

## 2 - Code-Splitting com `lazy`

*Code-splitting* torna possível reduzir o tamanho/bundle da nossa aplicação criando assim sub-bundles. O usuário não precisa/deveria baixar todo o código da nossa aplicação se ele não for utilizado.

Hoje Webpack gerencia muito bem essa divisão através de code-splitting, desde que você faça o necessário ao importar seus componentes. Agora ficou ainda mais fácil com a função `lazy`, que permite importar dinamicamente outros módulos/componentes em tempo de execução:

```js
const Admin = React.lazy(() => import('./routes/Admin'));

const App = () {
  return (
    <div>
      <Admin />
    </div>
  );
}
```

Neste exemplo, todas as dependências do componente `Admin` serão colocadas em um *bundle* diferente. Isso permite um ganho considerável na inicialização da sua aplicação. 

#### ⚠️ Alguns pontos importantes

Vale lembrar que a função `lazy` ainda não é suportada em SSR, neste caso existem bibliotecas como [react-loadable](https://github.com/jamiebuilds/react-loadable) para nos ajudar.

A função `lazy` recebe uma função para realizar a importação dinamica `import()`. Isso retorna uma `Promise` que espera um módulo com exportação `default` que contém um componente, isso significa que em nosso exemplo `Admin` teria de ser exportado como `export default Admin;`. Caso você não possa/queira utilizar `export default`, existe uma solução para mapear o módulo:

```js
React.lazy(() => import('./routes/Admin')
  .then(component => ({ default: component.Admin }))
)
```

## 3 - Suspense API

Outra novidade deste lançamento e acredito que a mais aguardada é a **Suspense API**. Ainda que experimental *(ainda não está pronta em relação à parte de recuperação/cache de dados)* porem, você já pode usá-lo com code-splitting e com a função `lazy`. Com ambos combinados, poderíamos exibir um feedback para o usuário durante o carregamento do módulo:

```js
const Admin = React.lazy(() => import('./routes/Admin'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Admin />
      </Suspense>
    </div>
  );
};
```

Nós teremos que esperar um pouco para utilizar totalmente essa API sem os problemas conhecidos, mas ela funciona perfeitamente com rotas, utilizando por exemplo a biblioteca [react-router-dom](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting), que carrega assim o bundle de diferentes páginas apenas quando necessário.

## 4 - Mais facilidade com `contextType`

Introduzido anteriormente na versão 16.3, a nova *Context API* generalizou o uso desse padrão em nossas aplicações. Lembrando que esta API permite que nossos componentes se inscrevam em um contexto para ler os dados e evitar a necessidade de transmissão de **props** de um componente a outro.

Na prática, este é um exemplo antes de `contextType`:

```js
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="light">
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />
      </ThemeContext.Consumer>
    );
  }
}

const Toolbar = () => (
  <div>
    <ThemedButton />
  </div>
);
```

Com o novo método estático `contextType`, podemos nos livrar do componente `ThemeContext.Consumer`:

```js
class ThemedButton extends Component {
  static contextType = ThemeContext;

  render() {
    return <Button theme={this.context} />;
  }
}
```

Aqui o `contextType` injeta automaticamente o `ThemeContext` e assim temos acesso ao `this.context` ✌️.

## 5 - Gerenciando erros com `getDerivedStateFromError`

A versão 16 do React foi introduzido o conceito de ["Error Boundaries"](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries) através do método `componentDidCatch` no ciclo de vida dos nossos componentes, mas mesmo assim existem alguns problemas em alguns cenários além de não ter suporte para SSR.

A nova função `getDerivedStateFromError` permite a interceptação antes da nova renderização do componente *(a função render pode retorna `null` com o `componentDidCatch`)*.

Até a próxima! 💪⚛️
