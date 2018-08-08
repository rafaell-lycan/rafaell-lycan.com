---
title: Dicas que todo desenvolvedor React deveria saber
description: Lorem Ipsum
date: '2018-08-08'
tags: react javascript
---


1. Use componentes funcionais.
2. Mantenha seus componentes pequenos.
3. Entenda como lidar com `this`
4. Use uma função para `setState` ao invés de um objeto.
5. Use Prop-Types sempre que possível.
6. Use a extensão "React Developer Tools" para debugar sua app.
7. Coding Style

- - -

* Property naming
* isXXX for isDisabled, isEnabled, ...
* canXXX for available actions, canSelect (avoid if possible)
* hasXXX for visual states, hasPagination, hasBackButton
* showXXX and hideXXX for visual states, showPagination, showBackButton
* event handlers onXXX and handled in the component as handleXXX
* passing handlers can activate a function: onAdd, onSelect. this removes the - need for another prop like canAdd (avoid if possible)

- - -

* https://www.youtube.com/watch?v=xa-_FIy2NgE
* https://engineering.opsgenie.com/i-wish-i-knew-these-before-diving-into-react-301e0ee2e488
* https://codeburst.io/whats-new-in-es6-or-es2015-480edf104489
* https://hackernoon.com/tips-on-react-for-large-scale-projects-3f9ece85983d
* https://techblog.commercetools.com/testing-in-react-best-practices-tips-and-tricks-577bb98845cd
