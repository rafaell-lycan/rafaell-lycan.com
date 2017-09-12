---
layout: post
title:  "Entendendo Flux"
date:   2015-11-28
tags: react javascript
image: assets/images/posts/entendendo-flux.jpg
keywords:
description: >
   Conheça o Flux, a arquitetura do Facebook para o desenvolvimento Front-End.
related:
  - title : Flux Docs - Overview
    url: https://facebook.github.io/flux/docs/overview.html#content
  - title : Getting Started with Flux
    url: http://reactjsnews.com/getting-started-with-flux/
  - title : Flux TodoMVC Tutorial
    url: https://facebook.github.io/flux/docs/todo-list.html
  - title :  Rethinking Web App Development at Facebook (Youtube)
    url: https://www.youtube.com/watch?v=nYkdrAPrdcw
---
No [post anterior](/2015/comecando-com-react/), dei uma breve introdução sobre [React.js](https://facebook.github.io/react/), mas chega a hora de deixar a brincadeira mais interessante ;)

Vamos falar sobre [Flux](https://facebook.github.io/flux/), um **padrão de arquitetura** criado/inventado pelo Facebook para lidar com um problema na construção de aplicações front-end baseadas em componentes. Sim, isso é meio confuso (e muito) a primeira vista, mas vamos a algumas explicações.

Você pode ler toda a parte técnica a seguir<del>(aka blablabla)</del>, ou ir direto para a [parte do código](#estruturando-nossa-aplicao).

## O que é?
Atualmente está surgindo um novo paradigma no mundo de desenvolvimento de web apps. Esses aplicativos são **quebrados** em **componentes reutilizáveis** e **combináveis/agregáveis** e como consequência desse conceito é que os aplicativos seguem hierarquias baseadas em componentes. A grande vantagem de se utilizar componentes é que eles são desacoplados e isolados, o que não só facilita a manutenção, mas também pode impactar positivamente na sua produtividade ou a do seu time.

Para aqueles que estão acostumados com o **data-binding** convencional como eu, vão sem dúvidas ter **"problemas"** com o fluxo de dados nesse padrão de arquitetura.

Quando os desenvolvedores do Faceboook começaram a utilizar **React** dentro de sua plataforma, provavelmente sofreram com esses mesmos problemas e acabaram por definir esse **novo padrão de arquitetura** utilizando um método de **transporte de dados unidirecional**.

Porem, **Flux** esta mais para um novo **conjunto de padrões** do que um framework, e você pode utilizar em seus projetos sem ter que escrever/reescrever muito código.

## Conceitos arquitetônicos
Não vamos pensar em **React** por hora, porque agora que começa a parte legal, já que Flux é um pattern que não deve ser confundido com *MVC*, pois os conceitos que são necessários para entender o funcionamento das coisas é um paradigma diferente do que estamos acostumados:

#### Actions
São os métodos para auxiliar o envio de informações ao *dispatcher*.

#### Dispatcher
É o **ponto central da arquitetura**, responsável por gerenciar/transmitir todo o fluxo de dados para todos os que devem receber aquela informação.

O Dispatcher é um [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern), porem foi baseado no padrão [Publish Subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) e é um ponto de **registro de callbacks** para as *stores*. Cada *store* se registra e fornece um callback, e quando o *dispatcher* responder a uma ação, todas as *stores* registradas recebem os dados fornecidos pela ação.

**Utilizamos apenas um *dispatcher*** na aplicação justamente pelo fato dele ser o pilar da aplicação, logo **sua aplicação deve ter apenas um único *dispatcher*.**

#### Stores
É o lugar onde fica armazenada toda a lógica e o estado de sua aplicação e a implementação dos callbacks registrados para o *dispatcher*.

*Stores* tem o papel pouco semelhante a um *model* no **MVC** tradicional, mas além disso elas gerenciam o **estado** de muitos objetos e não instâncias de um único objeto.

#### Views
São os componentes em React que trazem os estados das *stores* e passam para os componentes filhos através de suas **"props"**, onde temos um ou mais componentes **root** que escutam eventos de suas próprias *stores*. Podemos chamar isso de uma **view-controller** ainda que um pouco diferente de *controller* no modelo *MVC*, já que uma vez que obtem os dados das *stores*, atualiza seus componentes dependentes seguindo a estrutura **top-down**, podendo assim controlar qualquer parte significativa da página.

## Flux !== MVC
Como disse anteriormente, Flux não deve ser confundido com *MVC*, pois suas actions são acionadas diretamente de suas respectivas *stores* através do *dispatcher*. Mas para isso não ficar uma completa bagunça, imagine que *stores* são proximas a camada *model*, mas é muito complicado comparar a camada *view* pois ela é também o próprio controller de uma aplicação Flux.

## Fluxo
Já que ele não segue o modelo *MVC*, o flow também é diferente por ser unidirecional seguindo: <br>
**Actions -> Dispatcher -> Stores -> React Views.**


<img src="http://i.stack.imgur.com/mpqFt.png" alt="Flux Flow">

Sempre será esse o fluxo da sua aplicação, caso um componente React (View-Controller) realizar alguma ação, uma nova action será executada enviando informações ao *dispatcher* que irá atualizar as *stores* registradas que atualizará todas as views que precisarem ser afetadas.

## Estruturando nossa aplicação
Nossa aplicação será um simples **Shopping Cart**, onde temos duas principais áreas, sendo a **vitrine** de produtos, e nosso **carrinho** em sí.

Você pode dar uma olhada neste [Tutorial](https://facebook.github.io/flux/docs/todo-list.html) oficial do Facebook fazendo um Todo List.

Como eu acho que tenho bom gosto, nossa loja irá vender cervejas, porque apreciar cervejas é vida <3

{% highlight html %}
  <!-- Basic flux structure -->
  - /js
  ---- /actions
  -------- CartActions.js
  ---- /components
  ---- /constants
  -------- CartConstants.js
  ---- /dispatcher
  -------- AppDispatcher.js
  ---- /stores
  -------- CartStore.js
  -------- ProductsStore.js
  ---- /utils
  -------- Products.js
  ---- app.js
  - index.html
  - package.json
{% endhighlight %}

Feito, vamos atualizar nosso `package.json` com os seguintes modulos:

- Browserify
- Reactify
- React
- Flux

{% highlight json %}
{
  "name": "react-flux",
  "version": "1.0.0",
  "description": "Simple Shopping Cart using React and Flux",
  "author": "Rafaell Lycan",
  "main": "js/app.js",
  "dependencies": {
    "flux": "^2.1.1",
    "react": "^0.14.2"
  },
  "devDependencies": {
    "browserify": "^12.0.1",
    "reactify": "^1.1.1",
    "watchify": "^3.6.1"
  },
  "scripts": {
    "start": "watchify -o js/bundle.js -v -d .",
    "build": "browserify . -cm > js/bundle.min.js"
  },
  "browserify": {
    "transform": [
      "reactify"
    ]
  }
}
{% endhighlight %}

## HTML
Sim, utilizei o [Bootstrap](http://getbootstrap.com/) porque não estava com saco pra fazer algo do zero, e não estou nem ai se as classes dele não fazem o menor sentido.

Mas por favor, adicione também [este arquivo CSS](https://github.com/rafaell-lycan/estudos-react/blob/master/shopping-cart/css/style.css). Sua loja vai ficar mais *cool*. É sério, adiciona!

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Flux - Shopping Cart</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main id="main"></main>

  <script src="js/bundle.js"></script>
</body>
</html>
{% endhighlight %}

## Mock
Como não temos um servidor para solicitar os produtos com chamadas AJAX, vamos criar [objeto mock](https://en.wikipedia.org/wiki/Mock_object) de retorno com alguns produtos.

{% highlight javascript %}
'use strict';

module.exports = {
  // Load Mock Product Data Into localStorage
  load: function() {
    return [
      {
        id : '00001',
        sku: 123456,
        name: 'Brooklyn Lager',
        image: 'http://images.meredith.com/rrmag/images/2012/05/ss_BK-Lager.jpg',
        price: 10.99,
        inventory: 6
      },
      {
        id : '00002',
        sku: 123234,
        name: 'Abita Purple Haze',
        image: 'http://images.meredith.com/rrmag/images/2012/05/ss_Abita-Purple-Haze.jpg',
        price: 7.99,
        inventory: 2
      },
      {
        id : '00003',
        sku: 1236789,
        name: 'Miller High Life',
        image: 'http://images.meredith.com/rrmag/images/2012/05/ss_Miller.jpg',
        price: 4.89,
        inventory: 12
      },
      {
        id : '00004',
        sku: 2346430,
        name: 'Samuel Adams Boston Lager',
        image: 'http://images.meredith.com/rrmag/images/2012/05/ss_Sam-Adams.jpg',
        price: 6.99,
        inventory: 4
      },
    ]
  }
};
{% endhighlight %}

Ridiculo não?

Pense que em **/utils** você ira jogar toda e qualquer parte do seu sistema que não faça parte da estrutura flux.

Claro que você pode utilizar outros nomes, mas normalmente **utils** e **helpers** são mais genéricos <del>as vezes até de mais</del>.

## Actions & Constants
Actions são coleções de métodos que são chamadas pelas nossas **"views"** que enviam ações para o *dispatcher* contendo **payloads** que serão entregues as *stores*.

Um ponto interessante é que o Facebook as usa em conjunto com as *constantes* da aplicação, passando via payload o `actionType` usando assim as *constants*.

De uma olhada no arquivo `CartConstants.js`:

{% highlight javascript %}
module.exports = {
  CART_ADD : "CART_ADD",
  CART_REMOVE : "CART_REMOVE",
  CART_VISIBLE : "CART_VISIBLE",
  LOAD_PRODUCTS : "LOAD_PRODUCTS"
};
{% endhighlight %}

Uma outra abordagem para criar nossas *constants* é utilizando a lib [keyMirror](https://www.npmjs.com/package/keymirror), que simplesmente duplica o valor da chave para uma string, sem a necessidade de escrever novamente.

{% highlight javascript %}
let keyMirror = require('keyMirror');
// Versões anteriores do React contem o pacote em
// 'react/lib/keyMirror'

module.exports = keyMirror({
  CART_ADD : null,
  CART_REMOVE : null,
  CART_VISIBLE : null,
  LOAD_PRODUCTS : null
});
{% endhighlight %}

Eu não acho necessário, mas pode ser interessante para a sua aplicação.

Agora nosso arquivo `CartActions.js`:

{% highlight javascript %}
let AppDispatcher = require('../dispatcher/AppDispatcher');
let CartConstants = require('../constants/CartConstants');

let CartActionsActions = {

  // Load initial products
  loadProducts: function (data) {
    AppDispatcher.handleViewAction({
      actionType: CartConstants.LOAD_PRODUCTS,
      data: data
    })
  },

  // Add item to cart
  addToCart: function (productId) {
    AppDispatcher.handleViewAction({
      actionType: CartConstants.CART_ADD,
      product: productId
    })
  }

  // Remove item from cart
  removeFromCart: function (productId) {
    AppDispatcher.handleViewAction({
      actionType: CartConstants.CART_REMOVE,
      product: productId
    })
  }

  toggleCaartVisible: function (isVisible) {
    AppDispatcher.handleViewAction({
      actionType: CartConstants.CART_VISIBLE,
      isVisible: isVisible
    })
  }

}

module.exports = CartActionsActions;
{% endhighlight %}

Perceba que nossas *actions* são bem simples. Nós **carregamos os produtos**, **adicionamos** e **removemos** produtos dos carrinho e manipulamos a **visibilidade** do carrinho.

Utilizamos o método `handleViewAction` que iremos implementar em nosso *dispatcher* que recebe um objeto como parametro onde por default adicionamos a propriedade `actionType` que utiliza nossas *constants* como recurso.

## O Dispatcher
Falamos muito sobre o *Dispatcher*, mas vamos ver na prática como utilizar esse cara.

O Dispatcher é o cara que gerencia basicamente todo o processo da nossa aplicação, e a grande mágica que o faz ser o ponto central são os métodos `register` e `dispatch`, que são nossos **triggers** de eventos a entre a ação que disparou o evento e as *stores* registradas. Ele simplesmente recebe a **action** e propaga para as *stores* que ira identifica-la e disparar um evento caso registrado.

***Meh... então é um Pub/Sub mesmo?***

Mais ou menos isso, já que conceito do *dispatcher* é transmitir **payloads** para todas as *stores* registradas e seus respectivos callbacks.

Nosso arquivo `AppDispatcher.js` vai ficar assim:

{% highlight javascript %}
var Dispatcher = require('flux').Dispatcher,
    AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source : 'VIEW_ACTION',
    action : action
  });
}

module.exports = AppDispatcher;
{% endhighlight %}

Note que criei uma instancia do Dispatcher e também o método `handleViewAction` com a simples finalidade de abstrair entre nossas actions das **Views** e nossas actions vindas de uma **API/Servidor**.

O método utiliza o método `dispatch` que faz toda a mágica de emitir o evento contendo em nossa propriedade `action` o payload com a ação/action e nosso dados.

#### Gotchas / Tricks
Sua aplicação pode depender da execução/atualização de alguma outra *store* antes de renderizar novamente um componente, etc. Isso é possível utilizando o método `waitFor` que me foi muito útil quando passei por isso.

**Exemplo:**
{% highlight javascript %}
/* ProductsStore.js */
let ProductsStore = ...
ProductsStore.dispatcherIndex = AppDispatcher.register(function(payload) {});

/* CartStore.js */
AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case 'PURSHASE_ITEMS':
      AppDispatcher.waitFor([
        ProductsStore.dispatcherIndex
      ], function() {
        CartStore.checkout(_onCartProducts);
      });
      break;
  }
});
{% endhighlight %}

Quando o *dispatcher* transmitir a *action* `PURSHASE_ITEMS` no `CartStore`, antes de executar o método `checkout`, ele deve aguardar a execução dos eventos em `ProductsStore`.

## Stores
Falamos muito sobre **stores**, e agora que temos nossas actions definidas, chegou a hora de criar nossas *stores*.

Cada *Store* gerencia o estado de um dominio especifico da aplicação, nesse caso vamos criar nossa primeira *store* que sera responsável por gerenciar os produtos da loja, a `ProductStore.js`.

{% highlight javascript %}
'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let CartConstants = require('../constants/CartConstants');

// Initial data points
let _products = [];

// Will load products from some API
function loadProducts (data) {
  _products = data;
}

class ProductStoreFactory extends EventEmitter{

  // Return Product list
  getProducts () {
    return _products;
  }

  // Emit Change event
  emitChange () {
    this.emit('change');
  }

  // Add change listener
  addChangeListener (callback) {
    this.on('change', callback);
  }

  // Remove change listener
  removeChangeListener (callback) {
    this.removeListener('change', callback);
  }

}

let ProductStore = new ProductStoreFactory();

AppDispatcher.register(function (payload) {
  let action = payload.action;

  switch (action.actionType) {
    case CartConstants.LOAD_PRODUCTS:
      loadProducts(action.data);
      break;
    default:
      return;
  }

  ProductStore.emitChange();
});

module.exports = ProductStore;
{% endhighlight %}

Utilizei a notação `class` do ES6 apenas para facilitar a criação da classe `ProductStoreFactory`, que por sua vez estende os métodos do `EventEmitter` onde adicionamos os métodos `emitChange`, `addChangeListener` e `removeChangeListener`.

Definimos os métodos o método privado `loadProducts` fora da nossa classe que adiciona a lista de produtos em nosso Array `_products`. Também deixamos o método `getProduct` exposto que nos retorna a lista de produtos.

Por fim, adicionamos um callback em nosso `AppDispatcher` através do método **register** que determina se o payload transmitido bate com alguma combinação em nosso bloco `switch` e então emitimos uma mudança em `ProductStore`.

O próximo passo é criar nosso `CartStore`:

{% highlight javascript %}
'use strict';

let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let CartConstants =  require('../constants/CartConstants');

let _products = {}, _cartVisible = false;

function ProductCartModel(product) {
  this.id = product.id;
  this.name = product.name;
  this.price = product.price;
  this.sku = product.sku;
  this.amount = 1;
}

function _addItem (product) {
  if(!_products[product.id]) {
    return _products[product.id] = new ProductCartModel(product);
  }

  _products[product.id].amount += 1;
}

function _removeItem (product) {
  delete _products[product.id];
}

function _setVisibility (visibility) {
  _cartVisible = visibility;
}

class CartStoreFactory extends EventEmitter{

  // Return cart items
  getCartItems () {
    return _products;
  }

  // Return amount of items in cart
  getCartAmount () {
    return Object.keys(_products).length;
  }

  // Return cart total cost
  getCartTotal () {
    let total = 0;

    for (let prod in _products) {
      total += _products[prod].price * _products[prod].amount;
    }

    return parseFloat(total.toFixed(2));
  }

  // Return cart visibility state
  getCartVisible () {
    return _cartVisible;
  }

  // Emit Change event
  emitChange () {
    this.emit('change');
  }

  // Add change listener
  addChangeListener (callback) {
    this.on('change', callback)
  }

  // Remove change listener
  removeChangeListener (callback) {
    this.removeListener('change', callback)
  }
}

let CartStore = new CartStoreFactory();

AppDispatcher.register(function (payload) {
  let action = payload.action;

  switch(action.actionType) {
    case CartConstants.CART_ADD:
      _addItem(action.product)
      break;
    case CartConstants.CART_REMOVE:
      _removeItem(action.product)
      break;
    case CartConstants.CART_VISIBLE:
      _setVisibility(action.isVisible)
      break;
    default:
      return;
  }

  CartStore.emitChange();
});

module.exports = CartStore;
{% endhighlight %}

Basicamente o mesmo que a *store* anterior, temos nossa lista de produtos armazenada em `_products` que por sua vez é um objeto para facilitar a localização dos produtos através de sua **'key'** e `_cartVisible` para definir o status do nosso cart.

Também adicionamos alguns métodos publicos que serão utilizados pelo **View-Controller** para definir o *state* da aplicação:

- `getCartItems` : Retorna os itens em nosso carrinho;
- `getCartAmount` : Retorna o total de itens em nosso carrinho;
- `getCartTotal` : Retorna o valor total dos itens em nosso carrinho;
- `getCartVisible` : Retorna um boolean que irá omitir ou mostrar o carrinho em nosso layout.

Você deve ter percebido que nessa *store* temos alguns métodos que são privados como `_addItem`, `_removeItem` e `_setVisibility` que serão utilizados a cada vez que um action vindo do **payload** bater com a condição em nosso **register**.

O legal é que em `_addItem`, ao invés de simplesmente jogar o produto dentro do carrinho, eu preferi fazer um mapper com a função ProductCartModel <del>poderia ter usando ES6, mas...</del> para me retornar um objeto apenas com o que realmente é necessário para o meu carrinho.

A cada vez que um produto é adicionado, nosso método verifica se o mesmo **id** encontra-se em nossa lista de produtos; Se sim, simplesmente **incrementamos** a quantidade; Do contrário criamos um novo produto mapeado e inserimos em nossa lista.

Agora que temos nossas *stores* criadas, vamos criar nossos Views e os respectivos componentes.

## View Controller
Apenas recaptulando que **"view-controller"** não tem nada haver com o padrão *MVC*, são apenas componentes que irão  escutar por mudanças baseadas no **estado* da aplicação vindas de nossas *stores*.

Vamos começar pelo simples, o `app.js`.

{% highlight javascript %}
'use strict';

let React = require('react');
let ShoppingCartApp = require('./components/Application');

React.render(<ShoppingCartApp />, document.getElementById('main'));
{% endhighlight %}

Agora que já temos um norte para seguir, nesse caso o componente `Application.js`, responsável por ser o **root** da nossa aplicação.

Vamos dar uma olhada:

{% highlight javascript %}
'use strict';

let React = require('react');
var ProductsStore = require('../stores/ProductsStore');
var CartStore = require('../stores/CartStore');
var ProductsComponent = require('./Products');
var CartComponent = require('./Cart');

function getApplicationState () {
  return {
    products: ProductsStore.getProducts(),
    cart: {
      items: CartStore.getCartItems(),
      amount: CartStore.getCartAmount(),
      total: CartStore.getCartTotal(),
      isVisible: CartStore.getCartVisible()
    }
  };
}

// Create main View Controller
let Application = React.createClass({

  // Set initial state from Stores
  getInitialState: function () {
    return getApplicationState();
  },

  // Add change listener to store
  componentDidMount: function () {
    ProductsStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Remove change listener from store
  componentWillUnmount: function () {
    ProductsStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  },

  // Update state when store change
  _onChange: function () {
    this.setState(getApplicationState());
  },

  renderCartComponent: function () {
    return <CartComponent cart={this.state.cart} />;
  },

  renderProductsComponent: function () {
    return <ProductsComponent products={this.state.products} />;
  },

  // Render the main component and childs, passing state via props
  render: function () {
    return (<div className="container">
        <h1 className="text-center">Beer Shopping App</h1>
        {this.renderCartComponent()}
        {this.renderProductsComponent()}
      </div>
    );
  }
});

module.exports = Application;
{% endhighlight %}

Sim, esse cara faz muitas coisas <del>coisa pra caralho...</del>, carrega nossas *stores*, adiciona os listeners nos eventos `componentDidMount` e `componentWillUnmount` no **lifecycle** do componente, renderiza os componentes `CartComponent` e `ProductsComponent` e ainda seta um estado/state inicial do componente que ira ser passado como referência para os demais componentes filhos através do método `getInitialState`.

Vejamos... cada componente, esta sendo renderizado através de uma função, isso eu descobri sendo uma boa prática ao invés de renderizar todos os **N** componentes direto no método `render` e depois simplesmente chamar executando o mesmo como por exemplo `{this.renderCartComponent()}`.

Agora vamos ao componente de produtos:

{% highlight javascript %}
'use strict';

let React = require('react');
let CartActions = require('../actions/CartActions');
let ProductsMock = require('../utils/Products');
let Product = require('./Product');

let Products = React.createClass({

  // Request products from somewhere
  _loadProducts: function () {
    setTimeout(CartActions.loadProducts.bind(null, ProductsMock.load()));
  },

  // Load products when the component render
  componentDidMount: function () {
    this._loadProducts();
  },

  // Parse our product list in Product component
  renderProducts : function () {
    return this.props.products.map( (product, i) => {
      return (
        <Product
          key={product.id}
          product={product}
          addProduct={this.addProduct}
        />
        )
    });
  },

  // Add Product action
  addProduct: function (product) {
    CartActions.addToCart(product);
  },

  // Render product view
  render: function () {
    return (
      <div className="row">
        {this.renderProducts()}
      </div>
    );
  }
});

module.exports = Products;
{% endhighlight %}

O código acima esta bem auto-explicativo, mas vou dar alguns **highlights**:

Ao carregar o componente, o método `_loadProducts` é executado, o qual irá carregar os nossos produtos de algum lugar (nesse caso nosso Products**Mock**). Utilizei `setTimeout` apenas para garantir um processo assíncrono;

Renderizamos o componente `<Product />` para cada produto que tivermos em nossa *store* utilizando **Array.map()** passando uma key para que cada componente seja único, o produto em sí e o método addProduct que irá fazer o **trigger** `addToCart` em nossas **actions** definidas anteriormente.

Antes de passarmos ao carrinho, vamos dar uma olhada em como ficou nosso `<Product />`:

{% highlight javascript %}
'use strict';

let React = require('react');
let Product = React.createClass({

  // Render product view
  render: function () {
    return (
      <div className='col-md-3'>
        <h4 className='text-center'>{this.props.product.name}</h4>
        <img src={this.props.product.image} alt={this.props.product.name} className='img-responsive img-thumbnail' />
        <p><b>Price:</b> {this.props.product.price} </p>
        <p><b>Quantity:</b> {this.props.product.inventory} </p>

        <button className='btn btn-lg btn-block btn-danger' onClick={this.props.addProduct.bind(null, this.props.product)}>Add to Cart</button>
      </div>
    );
  }
});

module.exports = Product;
{% endhighlight %}

Esse sem dúvidas é o componente mais simples da aplicação, quase um componente **burro**, já que o único evento que ele tem é nosso **click**, que irá disparar o método `addProduct` passado como propriedade.

Enfim, vamos ao `<CartComponent />`:

{% highlight javascript %}
'use strict';

let React = require('react');
let CartActions = require('../actions/CartActions');

let Cart = React.createClass({

  // Control display/hide of the cart
  toggleCartDisplay: function (e) {
    e.preventDefault();
    CartActions.toggleCaartVisible(!this.props.cart.isVisible);
  },

  // Parse our cart produts in a list
  removeProduct: function (productId) {
    CartActions.removeFromCart(productId);
  },

  renderProductsList: function () {
    let products = this.props.cart.items;

    return Object.keys(products).map(product => {
      return (
        <li key={products[product].id}>
          <p className="beer-name">{products[product].name}</p>
          <p>{products[product].amount} x $ {products[product].price}</p>
          <button className="btn btn-danger btn-block" onClick={this.removeProduct.bind(null, products[product])}>Remove</button>
        </li>
      )
    });
  },

  // Render cart view
  render: function () {
    return (
      <div className="row cart-component">
        <div className="text-center">
          <a href="#" className="btn btn-lg btn-danger" onClick={this.toggleCartDisplay}>Show Cart ({this.props.cart.amount})</a>
        </div>

        <div className={this.props.cart.isVisible? 'cart-container' : 'cart-container hidden'}>

          <a href="#" className="glyphicon glyphicon-remove close-btn" onClick={this.toggleCartDisplay}></a>

          <ul>
            {this.renderProductsList()}
          </ul>

          <div className="total">Total: {this.props.cart.total}</div>
        </div>
      </div>
    );
  }
});

module.exports = Cart;
{% endhighlight %}

Também bem auto-explicativo, com pequenas diferença devido a função exercida, mas nada de mais:

- **toggleCartDisplay** é o responsável por mostrar/esconder o carrinho em sí;
- **removeProduct** faz o **trigger** `removeFromCart` em nossas **actions**;
- **renderProductsList** renderiza a lista de produtos dentro do carrinho, fazendo essa gambiarra que você esta vendo, já que estamos utilizando um **objeto** como lista.

E é isso, só rodar e ser feliz. LoL

## Conclusão

Eu deveria ter escrito este post logo na sequência, mas tive alguns imprevistos e acabei deixando-o de lado por algumas semanas.

Entenda que **React + Flux** é sem sombra de dúvidas uma **combinação poderosa**, mas você deve ter em mente a necessidade de utiliza-la e como aplica-la em seu projeto, **se não tudo pode vira uma completa salada**, nada fica claro e alguem vai **ter pesadelos** sempre que for manter a aplicação.

Atualmente venho fazendo coisas legais com *React*, inclusive peguei alguns freelas para o exterior, onde dois projetos estavam utilizando essa mesma arquitetura com outros patterns como o [Reflux](https://github.com/reflux/refluxjs), que tem uma leve mudança quando ao *Flux*, mas nada muito complexo.

Você pode [baixar este exemplo aqui](https://github.com/rafaell-lycan/estudos-react/tree/master/shopping-cart).
