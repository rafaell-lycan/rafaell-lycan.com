---
title: Como eu uso Git!
description: >-
  Depois de algumas pessoas me verem utilizar Git e como eu o configuro para
  facilitar a minha vida, eu achei interessante compartilhar como eu utilizo no
  meu dia a dia, incluindo assim algumas praticas que você pode utilizar também.
tags: 'git, productivity, development, tools'
keywords: git
---
Depois de algumas pessoas me verem utilizar Git e como eu o configuro para facilitar a minha vida, eu achei interessante compartilhar como eu utilizo no meu dia a dia, incluindo assim algumas praticas que você pode utilizar também.

_Se você não esta familiarizado ou não conhece Git, eu escrevi [um artigo básico](/2012/git-github/) sobre Git e Github no passado, mas você também pode aprender com [este exemplo do Tableless](https://tableless.com.br/tudo-que-voce-queria-saber-sobre-git-e-github-mas-tinha-vergonha-de-perguntar/) que também esta bem completo._

## Obtendo Informação

E percebi a pouco tempo que não consigo estar contente com terminal/git tendo o tema padrão que vem no sistema operacional. No meu MacOSX eu recomendo utilizar o [iTerm2](https://www.iterm2.com/) junto ao [ZSH](https://ohmyz.sh/) o que me habilita o nome da branch e também cores. Quer dizer, fica é legal:

![Meu terminal](/assets/images/posts/como-eu-uso-git/terminal-with-git-branch-name.png)

Um dos comando que eu mais utilizo é o `git status`, e convenhamos que é um pouco chato escrever isso todo o tempo, então eu criei um atalho/alias para `git st` para deixa-lo um pouco menor. Uma outra coisa importante, especialmente quando se utiliza `rebase` é ver como o histórico esta.

Para isso utilizamos o `git log`, mas ainda assim é um comando que nos trás muita informação que as vezes não precisamos, sem contar que não é tão fácil de fazer uma rápida leitura. Para isso eu uso `git lg` que é um pequeno atalho para `git log --pretty=oneline --abbrev-commit --graph --decorate`. Eu realmente não vou digitar isso.

Ele vai criar uma espécie de gráfico contendo apenas ID do commit, a mensagem, o nome da branch, etc. Algo assim:

![Commit Log](/assets/images/posts/como-eu-uso-git/terminal-with-git-log-alias.png)

Mas se por algum motivo você ainda achar que precisa de toda aquela informação, você poderia simplesmente utilizar algo como `git log --graph --abbrev-commit --decorate --date=relative` que seria algo assim:

![Commit Log 2](/assets/images/posts/como-eu-uso-git/terminal-with-git-changes-alias.png)

## Trabalhando com Branches

Para mudar rapidamente de branches, eu criei alguns atalhos. Como na maioria das empresas que trabalhei até hoje, utilizamos algo parecido com o _**git-flow**_, onde a branch `master` que contem nossa versão de release, e a `develop` como principal, onde ambas são protegidas contra commits. Tudo é adicionado através de **pull-requests** em nossa branch principal.

Eu criei atalhos como `git co` para `git checkout`  e `git br` para `git branch`:

```bash
$ git br -D feature/feature-a
$ git co -b feature/feature-b
```

Para tornar tudo ainda mais fácil entre as branches (o que acontece bastante especialmente mudando para `develop`), eu criei `git com` e `git cod` respectivamente para ter atalhos diretos.

## Trabalhando com Git

Além do que já vimos, também não podemos fugir do fluxo de **adicionar** novos arquivos e finalmente criar nossos **commits** e fazer **push** para o repositório.

Eu não criei um atalho específico para `add` porque não acredito que iria me trazer alguma melhor muito grande, mas quando você pode adicionar vários arquivos de uma vez, eu criei `git all` para `git add .` que hoje é algo automático que faço algumas vezes por dia. Também criei um atalho para `git commit -m` usando `git cm`

```bash
$ git all
$ git cm "Adicionando módulo XYZ junto ao main da aplicação"
$ git push
```

Quando falamos em enviar nossos commits para o repositório, eu normalmente prefiro evitar de adicionar o nome da minha origem (normalmente `origin`) seguido pela branch por diversos motivos:

1. Git Push deveria enviar sempre utilizar o comando `push` sem precisar de parâmetros, enviando assim para sua branch atual ou cria-la caso a mesma não exista.
2. Acredito que este valor `default` que pode ser modificado na configuração provavelmente possui algo relacionado a segurança, uma vez que não vem habilitado o valor `current` por padrão, por isso eu atualizo meu `.gitconfig` e convenci o pessoal do meu trabalho a fazer o mesmo para simplificar nossas vidas:

```bash
# https://git-scm.com/docs/git-config#git-config-pushdefault
[push]
  default = current
```

## Desfazendo seus commits

Particularmente eu não gosto dos comandos a cada vez que quero voltar a a um certo ponto, um exemplo é `git reset --soft HEAD^`, o que isso realmente faz? Eu resolvi esse problema com poucos atalhos.

Para desfazer meu ultimo commit, eu criei `git undo` (atalho para `git reset --soft HEAD^`) o qual deleta o meu ultimo commit do histórico mas mantem minhas mudanças indexadas no caso que eu queira modificar algo. Para tirar as coisas do meu index (o contrário de `git add`) eu criei `git wait` (para `git reset HEAD`). E para remover os arquivos totalmente do meu index, eu criei um atalho para `git checkout .` em `git abort`, o qual venho utilizando algumas vezes quando quero remover mudanças inúteis depois de adicionar linhas para debugar um certo arquivo.

```bash
$ git undo  # Desfaz meu último commit
$ git wait  # Remove os arquivos em "staged" fora do index
$ git abort # Remove qualquer alteração nos arquivos indexados
```

## Rescrevendo seu Histórico

Quando trabalhamos com branches, eu particularmente muitas vezes reescrevo meus commits (especialmente o ultimo), com o objetivo que quando minha feature esta completa, o histórico da sua branch deveria ser limpo e auto explicativo a cada commit, para que quem esteja revisando minha PR tenha uma ideia do que ocorreu a cada commit antes mesmo de olhar o código.

```bash
$ git lg

* 849094a SQ3-309 Add new Redux Actions for Content module
* eb6d23d SQ3-309 Refactor ContentLibrary Columns
* 3249ed6 SQ3-309 Change API Base URL for the API
* eab0563 SQ3-309 Change Server mock impl for pagination feat
* cd6acfb SQ3-309 Add dropdown with actions
* 27c5f98 SQ3-309 Fix ContentLibrary styles
* b8fe782 SQ3-309 Add Redux Thunk and Axios to use the API instead Backbone Model/Collections
* 2e5b44a SQ3-309 Add content API mock endpoint
* 04e548e SQ3-309 Add SASS for ContentLibrary module
* 34b9b43 SQ3-309 Add ContentLibrary module to the project
```

Para chegar a este pequeno exemplo, eu reescrevi a mensagem de commit e utilizei `rebase` para garantir que as mensagens faziam sentido. Eu sinceramente acho que as pessoas não gostam de `rebase`. **Rebase** é uma ferramenta muito útil para corrigir seu histórico e faze-lo ter algum sentido. Você não é obrigado a fazer isso, é apenas algo que aprendi e me acostumei depois de algum tempo trabalhando com **Git**, e eu gosto de utiliza-lo para limpar minhas branches antes de abrir uma PR, e trabalhando assim, e até conheci alguns desenvolvedores que seguem a mesma linha de pensamento.

Eu realmente faço muitos rebases interativos, meu workflow normalmente se resume em: fazer o `commit`; perceber que esqueci alguma informação na descrição do commit ou ter editado algum arquivo relacionado ao commit; atualizar o commit; Fazer `push` para o repositório remoto.

Se você precisa atualizar o ultimo commit com alguma outra informação, tenho aqui uma solução simples: `git amend` (para `git commit --amend --no-edit`). Este atalho simplesmente adiciona o que estiver no meu index ao meu ultimo commit, sem mesmo me perguntar se quero modificar a mensagem.

```bash
$ git add path/file/new_script.js
$ git amend
```

Se o commit esta além do meu ultimo commit, eu preciso fazer algo mais especifico, o que normalmente eu volto **N** vezes através do comando `rebase`. Git então abrirá diretamente no meu [Vim](https://www.vim.org/) para me perguntar o que fazer com essa lista de commits. Normalmente edito minhas mensagens de commit e sigo com o rebase até finalizar.

A forma para se fazer `rebase` em **n** commits é `git rebase -i HEAD~n`, mas quem tem tempo para escrever isso? Eu criei um atalho simples `git rb` que aceita um número como argumento.

```bash
rb = "!sh -c \"git rebase -i HEAD~$1\" -"
```

Que me permite utiliza-lo assim:

```bash
$ git rb 5
```

Sim, eu utilizo Vim como editor especialmente para coisas pequenas, mas você pode configurar para usar seu editor de escolha como Sublime ou Visual Studio Code sem muitos problemas. Basta editar o arquivo `.gitconfig` com algo assim:

```bash
[core]
  # Para o Sublime
  editor = subl -n -w

  # Para o VSCode
  editor = code -w
```

Depois de utilizar o comando `git rb`, o Vim abrirá com um conteúdo similar a este:

```bash
pick 07c5abd Introduce OpenPGP and teach basic usage
pick de9b1eb Fix PostChecker::Post#urls
pick 3e7ee36 Hey kids, stop all the highlighting
pick fa20af3 git interactive rebase, squash, amend

# Rebase 8db7e8b..fa20af3 onto 8db7e8b
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
```

Aqui você pode utilizar tanto `reword` quanto `edit` (ou qualquer outra opção), e quando você salvar suas mudanças (`:wq`), o rebase vai começar a aplicar as ações em cada commit da lista, e apenas parar naqueles que você modificou a ação. Nesses você pode simplesmente utilizar `git rc` (para `git rebase --continue`), até o rebase terminar. Eu também uso atalhos para `git rebase --abort` com `git ra` e `git rebase --skip` com `git rs`.

A esse ponto, pode ser que você precise atualizar sua branch remota com o novo histórico atualizado, e para isso eu uso o `git force` que é um atalho para `git push --force-with-lease`. O argumento `--force-with-lease` é uma flag muito útil que protege todas as referências remotas que serão atualizadas exigindo que seu valor seja o mesmo que a branch que ja temos armazenados anteriormente. Você pode entender melhor na [documentação oficial](https://git-scm.com/docs/git-push#git-push---no-force-with-lease).

Recaptulando:

```bash
$ git rb 5
# Modifique os commits para edição em seu editor;
$ git add path/file/new_script.js
$ git rc
$ git force
```

## Conclusão

Ao longo do tempo que criei vários atalhos que estão me ajudando no meu workflow diário, mas isso poderia virar outro artigo. Para ver todos os que utilizo atualmente, dê uma olhada no [meu repositório dotfiles](https://github.com/rafaell-lycan/dotfiles/blob/master/configs/git/gitconfig.symlink).

E você, quais são os seus truques com Git?
