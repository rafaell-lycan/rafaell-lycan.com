---
layout: post
title:  "Trabalhando com Web Storage no HTML5"
date:   2014-03-12
tags: html5
image: assets/images/posts/web-storage-html5.jpg
keywords: html5 api, web storage, html5 sql, html5 tags
description: >
  Web Storage com HTML5, como utilizar LocalStorage e SessionStorage.

related:
  - title : Using the Web Storage API
    url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  - title : Local Storage - Dive Into HTML5
    url: http://diveintohtml5.info/storage.html
  - title : HTML5 - Local Storage
    url: http://zenorocha.com/html5-local-storage/
---
Uma das razões que os programadores favorecem aplicações nativas é a sua capacidade de armazenar dados localmente no cliente como por exemplo um carrinho de compras de um ecommerce qualquer.

Antes quando precisávamos armazenar dados no agente de usuário que persistissem entre as páginas, usávamos [Cookies](http://en.wikipedia.org/wiki/HTTP_cookie).

Embora os cookies estejam disponíveis para armazenar dados em todos os navegadores, existem certas desvantagens que foram tratadas com a invenção do ***HTML5 Web Storage***.

Com o aumento da complexidade das aplicações baseadas em web, duas ***grandes limitações dos cookies nos incomodam:***

- O limite de armazenamento de cookies em navegadores web é limitado a cerca de 4KB.
- Os cookies são enviados a cada solicitação HTTP, atrasando assim o desempenho da aplicações.

Além é claro de uma interface mais complexa e outros limites.

## O que é Web Storage
É um banco de dados simples do lado cliente baseado em chave/valor.

Possui uma [API](http://dev.w3.org/html5/webstorage/) bastante simples para escrever ou recuperar dados no armazenamento local e pode armazenar até 10MB de dados por domínio. Ao contrario dos cookies, os dados armazenados não são incluidos a cada solicitação HTTP.

Ainda sim, nem tudo é um mar de rosas. Ainda esbarramos no problema do suporte como IE7 browsers antigos. Todos os outros navegadores como o Chrome, Firefox, Safari, Opera e IE8+ dão suporte a esta nova API.

A API de Web Storage se divide em ***dois tipos de objetos***, que estão disponíveis no escopo global (window):

- **Local storage:** que armazena dados sem data de validade, que ficam disponíveis mesmo quando a aba de navegação/navegador é fechado ou reaberto;
- **Session storage:** que armazena dados para uma sessão, que serão apagados assim que o usuário fechar o navegador.

#### Métodos disponíveis em um objeto Storage:
- **getItem(key):** obtém um valor armazenado no Storage;
- **setItem(key,value):** guarda um valor no Storage;
- **removeItem(key):** exclui um valor do Storage;
- **clear():** limpa o Storage;

#### Exemplos
{% highlight javascript %}
localStorage.setItem('user','rafaell');
localStorage.getItem('user'); // rafaell
localStorage.removeItem('user');

sessionStorage.setItem('sessionID','81dc9bdb52');
sessionStorage.getItem('sessionID'); // 81dc9bdb52
sessionStorage.clear();
{% endhighlight %}

## Conclusão
Agora você pode começar a usar a API de Web Storage do HTML5 para armazenar por exemplo as preferencias do usuário, informações sobre a sessão, etc. Você também pode tentar criar aplicativos que podem ser utilizados off-line e seus dados off-line serem enviados ao servidor como uma atualização quando o usuário se conectar novamente. Apenas lembre-se de nunca colocar dados senssíveis em storage ou cookies.