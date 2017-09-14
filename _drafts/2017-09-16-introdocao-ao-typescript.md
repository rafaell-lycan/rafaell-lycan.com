---
title:  "Uma introdução ao TypeScript"
date:   2017-09-16
tags: javascript
image: assets/images/posts/intro-typescript.png
description: >
  Aprenda como usar TypeScript para escrever aplicações melhores, mais seguras e mais escalaveis. Veremos os benefícios de tipagem e interfaces nesta pequena introdoção ao TypeScript.
related:
  - title : "TypeScript in 5 minutes"
    url: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
    from: "TypeScript"
  - title : "Documentação Oficial"
    url: https://www.typescriptlang.org/docs/
    from: "TypeScript"
  - title : "TypeScript, WTF?!"
    url: https://davidwalsh.name/typescript
    from: "David Walsh Blog"
  - title : "Diga olá ao TypeScript e adeus ao JavaScript"
    url: https://tableless.com.br/diga-ola-ao-typescript-e-adeus-ao-javascript/
    from: "Tableless"
---

No passado achava que o TypeScript implicava na flexibilidade que temos com o JavaScript, por adicionar coisas que temos em linguagens como Java e C#, e talvez por eu não gostar de ambas as linguagens e ser mais a favor de outras coisas como Python e PHP por exemplo, eu simplesmente não gostava da ideia.

A primeira vez que vi TypeScript foi em **2015** enquanto ainda trabalhava na Rocket Internet, onde um colega (wender) começou um projeto com Angular 1.x, TypeScript e Webpack. Na época estavamos acostumados a trabalhar com Angular + Gulp tasks e tudo era ótimo e confesso que não me agradou a ideia, por adicionar mais burocracia ao projeto, mas hoje, no meu dia-a-dia trabalhando com Angular é algo que confesso fazer todo sentido.

Algumas empresas como o AirBnb, [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d) e muitas outras já adotaram o TypeScript em seus produtos.

Além disso, no [StackOverflow Survey](https://insights.stackoverflow.com/survey/2017), TypeScript foi eleito a 3ª "Most Loved Languages" deste ano.

*Tão querido quanto Python* :heart:

## Mas o que é TypeScript?

> TypeScript is a typed "superset" of JavaScript that compiles to plain JavaScript.

**Super... WAT?**

Superset basicamente é disponibilizar todas as funcionalidades do JavaScript ES5/Es6 com algumas funcionalidades adicionais que são exclusivas do TypeScript em si.

Inclusive eles dizem que o **C#** é um superset da **linguagem C**. **Whatever...** :unamused:

Ele compila ou "transpila" arquivos typescript `.ts` para JavaScript através do TypeScript Compiler (TSC), já que os browsers não suportam um arquivo typescript, além de poder ser facilmente integrado em projetos JavaScript.

Em TypeScript além de contar com todo o suporte do ES6 (Classes, Modularização, etc), também nos oferece alguns adicionais como:

- **Static Type Checking**: Como linguagens como Java, é possível declarar o "tipo" de uma propriedade/variavel.
- **Interfaces**: Podemos definir a interface de uma classe como quais metodos ela é obrigada a implementar, além de poder passar uma interface como tipo em um parâmetro de metodo/função.
- **Generics**: ...

Em um breve resumo a syntaxe é parecida linguagens de alto nível com Java e outras.

## Instalação e Compilação

Para instalarmos TypeScript, podemos fazer isso facilmente com **NPM** ou **Yarn**.

```bash
// Yarn :heart:
yarn global add typescript

// NPM
npm install -g typescript
```

Feito isso, teremos disponível o comando `tsc`, o qual nos permite compilar arquivos typescript `.ts` facilmente, utilize o comando `tsc -v` para verificar se a instalação foi feita corretamente.

```bash
tsc -v
Version 2.5.2
```

Feito isso podemos utilizar o comando `tsc` para compilar arquivos `.ts` (ou `.tsx` para JSX) para javascript puro `.js`, e podemos fazer isso com um único arquivo, ou multiplos arquivos:

```bash
tsc app.ts

tsc app.ts main.ts

tsc *.ts
```

Além disso, podemos adicionar a flag `--watch` para compilar automaticamente arquivos que forem modificados, mas é claro que não vamos fazer tudo isso via terminal.

Quanto a tooling, diversos editores de texto e IDE's já suportam TypeScript, além de adicionar suporte a **auto complete**, **informações sobre tipos e assinatura de  métodos**, e muito mais através do  **IntelliSense**.

[Veja aqui a lista oficial dos editores](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

## Static Typing e Classes

**Tipos básicos**:

- String
- Number: Inteiros ou Flutuantes
- Boolean: True ou False
- Array
- object

**Tipos Anything (N Types)**:

- Any: Qualquer tipo
- Void: Retorno sem tipo
- Null: Retorno do tipo null ou undefined
- Tuple: Um array com um número fixo de elementos
- Enum: Valores enumerados
- Generics

Vamos brincar com um pouco no [playground.](https://www.typescriptlang.org/play/)

```javascript
class Product {
    title: string;
    quantity: number;

    constructor(title: string, quantity: number) {
        this.title = title;
        this.quantity = quantity;
    }
}

let product = new Product();
// Expected 2 arguments, but got 0.
// constructor Product(title: string, quantity: number): Product

```

Como definimos em nosso construtor que para criarmos a classe `Product` é necessário `title` e `quantity`, o compilador acusa um erro simplesmente por não existir tais parâmetros, logo é necessário informar todos os parâmetros ou definir parâmetros **default** em nosso construtor.

```javascript
...

let product = new Product("JavaScript: Good Parts", "5");
// Argument of type '"5"' is not assignable to parameter of type 'number'.
```

Novamente um erro na compilção, já que o nosso segundo atributo necessita ser um tipo `number` e estamos informando um tipo `string`.

```javascript
class Product {
    constructor(public title: string, private quantity: number) {}
}

let product = new Product("JavaScript: Good Parts", 5);
person.title; // JavaScript: Good Parts
person.quantity;
// Property 'quantity' is private and only accessible within class 'Product'.
```

Uma outra forma de definirmos as propriedades de nossa classe, é passando diretamente em nosso construtor `public` ou `private` para os atributos da classe, o que ajuda bastante quando precisamos trabalhar com injeção de dependencias em projetos. Em uma aplicação Angular, isso facilita muito no desenvolvimento:

```javascript
// Bad
export default class MyCustomComponent implements OnInit {
  service;
  storage;

  constructor(ProductService, LocalStorageService) {
    this.service = ProductService;
    this.storage = LocalStorageService;
  }
  ...
}

// Poor
export default class MyCustomComponent implements OnInit {
  service: ProductService;
  storage: LocalStorageService;

  constructor(service: ProductService, storage: LocalStorageService) {
    this.service = service;
    this.storage = storage;
  }
  ...
}

// Better
export default class MyCustomComponent implements OnInit {
  constructor(private service: ProductService, private storage: LocalStorageService) {}
  ...
}
```

Não é preciso muito esforço para ver qual das opções deixa nosso código mais limpo e fácil para ler, até porque o ES6 não conhece atributos privados de uma classe, para fazer isso temos que adicionar uma **pequena gambiarra** no escopo, inclusive [falei em um post sobre isso](/2015/comecando-com-es6/).

Uma questão interessante é a seguinte:

```javascript
let product: Product;
...

product = {};
// Type '{}' is not assignable to type 'Product'.
// Property 'title' is missing in type '{}'.
```

Neste exemplo, o compilador mostra uma mensagem onde o `{}` não é do tipo `Product`, porem, também informa esta faltando a propriedade `title` no objeto. **Curioso não?**

```javascript
product = {title: "NBA League Pass Subscription", quantity: 1}; // No error
```

A variável `product` precisa conter os mesmos atributos e métodos que a class `Product` **mesmo que não seja uma instancia da classe**, ou seja, já conseguimos burlar o compilador, e mesmo que a classe tivesse um método especifico `describe()`, poderiamos escrever uma simples implementação que seguisse a mesma **assinatura** da nossa classe `Product` que tudo ficaria bem.

```javascript
class Product {
...
  describe() : string {
    return `You have ${this.quantity} of ${this.title} left`;
  }
...
product = { title: "NBA League Pass Subscription", quantity: 1, describe: () => 'string'}; // No error
```

Bom, seguindo a linha de pensamento isso não poderia ser permitido, mas na verdade não quebramos nosso código, pois mantemos a assinatura igual ao esperado pela variável `product`, e para mantermos um bom design em nossa aplicação, deveriamos começar a pensar em **interfaces**, afim declarar assinaturas reais dos objetos em nossa aplicação.

## Interfaces

Um dos recursos adicionais que temos em TypeScript são as **interfaces**.

Se você é desenvolvedor backend e que segue a risca a orientação a objetos, Design Patterns e o SOLID, sabe que interfaces é uma das caracteristicas fundamentais para definirmos a assinatura de nossas classes para garantir a especificação de métodos e também propriedades.

Vamos então utilizar interfaces para garantir a assinatura de nossas classes.

```javascript
interface IProduct {
    title: string;
    quantity: number;
    describe(): string;
}

let product: IProduct;

class Product implements IProduct {

    constructor(public title: string, public quantity: number) {}

    describe() :string {
        return `You have ${this.quantity} of ${this.title} left`;
    }

    notify() : void {
      // Your code here
    }
}

product = new Product("Nvidia GTX 1080", 10);
product = { title: "Nvidia GTX 1080", quantity: 10, describe: () => 'string'}; // No error
```

Vamos entender alguns pontos importantes:

**1 -** Definimos em nossa interface o método `describe()`, que deve retornar uma `string`, o que obriga o retorno do método ser de um tipo especifico.

**2 -** Além disso também declaramos que teremos as propriedades `title` e `quantity`, o que obriga a implementação em nosso construtor ser publica por estar exposto em nossa interface. Caso você queira seguir com os parâmetros privados, evite declaralos em suas interfaces.

Ainda podemos adicionar algumas coisas como uma propriedade ou método opcional a ser implementado, ou até mesmo que suporte diferentes **tipos**:

```javascript
interface IProduct {
    title: string;
    quantity?: number;
    images?: string[] | string;
}

let product: IProduct;

class Product implements IProduct {

    constructor(public title:string, public quantity?: number) {}
}

product = new Product("Nvidia GTX 1080");
product.quantity = 10;
product.images  = 'img1.jpg';
product.images  = ['img1.jpg', 'img2.jpg'];
product = { title: "Nvidia GTX 1080", quantity: 10, images: ['img1.jpg'] };
```

Tanto `quantity` quanto `images` são opcionais, dessa forma nosso construtor apenas exigirá que `title`, já que utilizamos `?` para `quantity`. Além disso podemos adicionar `images` tanto como `string` quanto um `array` de strings.

## Generics

Algo que muitos desenvolvedores que vem de Java e C# já estão confortáveis em usar são **Generics**.

Eu nunca utilizei, até porque PHP não suporta Generics, mas em 30 minutos entendi a ideia de utilizar templates que nos proporcionam criar componentes reutilizáveis de diferentes tipos, o que seria melhor que `any`. Em um pequeno exemplo, podemos brincar com coleções:

```javascript
class List<T> {
    items: T[];
    constructor(items: T[] = []) {
        this.items = items;
    }
    add(item: T) {
        return this.items.push(item);
    }
}

let cart = new List<IProduct>();

cart.add(new Product("Franziskaner Hefe Weissbier"));
cart.add(new Product("Vedett Extra White"));
cart.add({title: "Hoegaarden Wit"});

cart.add("Skoll"); // Error
// Argument of type '"Skoll"' is not assignable to parameter of type 'IProduct'.
```

Criamos uma lista `List` genérica, e depois criamos uma lista que implemente a interface `IProduct`, claro que por ser genérico, poderiamos criar uma lista de qualquer coisa, **classes**, **números**, etc... pois é reutilizável.

**Mas então Generics só funciona com Arrays?**

```javascript
class Product {
  title: string;
}

function getAsync<T>(url: string): Promise<T[]> {
  return fetch(url)
        .then((response: Response) => response.json());
}

getAsync<Product>("/products")
  .then(products => {
    products.forEach(product => {
      console.log(product.title);
    });
  })
```

## Conclusão

Eu espero que você tenha gostado desse artigo, typescript é uma tecnologia interessante, especialmente por trazer algumas implementações que não temos em JavaScript até o presente momento.

Talvez a parte mais importante é ter sido adotado pelo time do Angular, e estar sendo adotado em diferentes projetos como o [Glimmer.js](https://glimmerjs.com/), e na minha opinião, acredito que serviu como insentivo ao surgimento de ferramentas similares como o [Flow](https://flow.org/) que possue algumas caracteristicas bem similares.

Você se sente inspirado a utilizar TypeScript? Que **tipagem, interfaces e generics** serão promissores em JavaScript, ou simplesmente é algo momentâneo? Coloque seu comentário abaixo, eu adoraria ler sobre teorias.