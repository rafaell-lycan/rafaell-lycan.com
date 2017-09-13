---
layout: post
title:  "Porque você deveria dar uma chance ao Yarn?"
date:   2017-09-12
tags: javascript tools
image: assets/images/posts/yarn-1.0.png
description: >
  Seguro, rápido, confiável e offline. Yarn é um gerenciador de pacotes JavaScript criado pelo Facebook a menos de 1 ano que acaba de ter sua versão 1.0 publicada.
related:
  - title : Anuncio oficial da versão 1.0
    url: https://code.facebook.com/posts/274518539716230
    from: Facebook Code
  - title : Site Oficial
    url: https://yarnpkg.com/
    from: yarnpkg.com
  - title : Intro to Yarn Package Manager
    url: https://www.youtube.com/watch?v=7n467QmiANM
    from: Youtube
---

<p class="info-box info">
  **Eu comecei a utilizar Yarn no inicio deste ano, e tanto eu quanto a equipe tivemos uma melhoria em nossos builds e tempo de deploy.**
</p>

**[Yarn](https://yarnpkg.com/)** é um novo gerenciador de pacotes JavaScript criado pelo **Facebook**, simples de utilizar e de fácil adoção.
Tenho que adimitir que o **[NPM](https://www.npmjs.com/)** vem evoluindo muito nos ultimos meses, mas também percebi que muitas das implementações que implementa, em sua grande maioria já existe no Yarn a algum tempo.

Em um pequeno exemplo, eu vou tentar algumas coisas que simplesmente fazem o Yarn substituir o NPM e quem ganha com isso é você.

Você provavelmente já deve ter lido algo sobre ou até mesmo estar utilizando-o, mas por conta do enfim release de sua **versão 1.0**, que nós adotamos assim que vimos, tive que escrever sobre isso.

Yarn já não é algo tão novo, nasceu em 2016 e tem sido adotado rapidamente pelos desenvolvedores como substitudo ao NPM.
Por mais que eu tenha um certo carinho pelo NPM, tenho que admitir que por sua vez, o Yarn saiu na frente ao implementar algo muito engenhoso, o arquivo `yarn.lock`.

## O arquivo `yarn.lock`

Em uma rapida explicação, assim como o NPM, ele também utiliza o arquivo `package.json` e a pasta `node_modules` mantendo compatibilidade com projetos baseados em NPM, que caso você já esteja familiarizado, quer dizer que você também estará meio familiarizado com Yarn.

O arquivo `yarn.lock` bloqueia as dependências instaladas em uma versão especifica, o que assegura que uma mesma instalação em um ambiente totalmente diferente, a mesma estrutura de arquivos e dependencias funcione, algo semelhante ao `composer.lock` e o `Gemfile.lock`.

Vamos dizer que você esta trabalhando em um projeto **XPTO**, e um companheiro de equipe modificou uma dependência no `package.json` e faça **commit** para o repositório git.

*Normalmente uma branch base para desenvolvimento (master/develop)*.

Mais tarde, você precisa fazer um pull das mudanças do projeto antes de abrir seu **pull request**, para garantir que tudo esta OK e rodar seu CI ou até mesmo fazer deploy em ambiente de dev. Com isso você roda o comando `yarn install`, onde o arquivo `yarn.lock` é atualizado, o que você é possível ver em um simples `git diff yarn.lock`.

Através disso, yarn mostra a validação do pacote através de **#hashes** entre ambientes e dependencias diferentes.

## Apenas um pouco mais

Em questões de performance, yarn paraleliza as instalações o que maximiza a utilização dos recursos e torna o processo mais rápido.

Algumas outras caracteristicas legais do yarn é que ele cria um cache das dependencias instaladas anteriormente, o que evita precisar baixar o mesmo pacote da internet novamente. **Sim, ele funciona offline**. :heart:

Além é claro de ser compatível com os registros do NPM e Bower.

## E o que mais?

Depois de quase um ano de sua divulgação publica, finalmente sua **versão 1.0** esta disponível para uso com alguns brinquedos novos.

- Yarn Workspaces
- Auto-merge dos arquivos `.lock`
- Resoluções de versões melhores

A parte do **workspace** ainda esta um pouco turva pra mim entender. Eu recomendo a você [ler mais sobre workspaces neste artigo](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) para entender melhor.

A nova versão inclui muitas melhorias, que graças a comunidade esta fazendo o projeto crescer rápido em muito pouco tempo.
Yarn tornou-se um projeto ativo dentro da comunidade open-source, com mais de [195.000 projetos no Github](https://github.com/search?utf8=%E2%9C%93&q=filename%3Ayarn.lock+path%3A%2F&type=Code) utilizando o arquivo `yarn.lock` e até agora tem quase 3 bilhões de downloads por mês.

## Migração

**TL;DR**

Você pode verificar a instalação para o seu tipo de ambiente diretamente no [site oficial](https://yarnpkg.com/en/docs/install).

Após instalarmos o Yarn, para fazermos a migração podemos simplesmente utilizar o comando `yarn install` caso você já tenha um projeto rodando com o NPM, se não utilize o comando `yarn init`, que ira gerar nosso arquivo `package.json` assim como o NPM faz.

**Alguns comandos:**

- `yarn` === `npm install` 
- `yarn init` === `npm init`
- `yarn add <package_name>` === `npm install <package_name> --save` 
- `yarn remove <package_name>` === `npm uninstall <package_name> --save` 
- `yarn add <package_name> --dev` === `npm install <package_name> --save-dev` 
- `yarn global add <package_name> --dev` === `npm install <package_name>  --global` 

Você pode verificar a lista através da própria documentação, ou checar [esta versão de comandos](https://infinite.red/files/yarn.pdf) feita pelo [@justinhuskey](https://twitter.com/justinhuskey).

## O NPM vai morrer?

A resposta quanto a isso é **não**, ao menos eu gosto de pensar que não.

O NPM esta tentando acompanhar a corrida, e em sua [versão 5.0](http://blog.npmjs.org/post/161081169345/v500) lançada em Maio deste ano, incliui algumas funcionalidades notáveis, tais como um lock file *(package-lock.json)* e o **auto install** sem a necessidade da flag `--save`, além é claro de uma melhoria de performance comparado as versões anteriores. Ele continua sendo amplamente utilizado dentro da comunidade **Node.js**, e eu espero que ambos os dois continuem com a competição para termos melhorias constantes.

Mesmo que você você esteja bem utilizando o NPM 5, eu pessoalmente acho que você notaria a direferença de performance utilizando yarn no seu processo de **build** e **deploy**, eu sei porque eu notei. Um ponto interessante é que você pode continuar utilizando NPM juntamente com o Yarn, você pode experimentar ambos por um periodo e dizer-me se você adotou ou não (embora eu saiba que você vai gostar).

Isso é tudo pessoal.


