---
layout: post
title:  "Git e Github - Porque FTP é coisa do passado!"
date:   2012-09-29
categories: outros
tags: git github
image: assets/img/posts/git-github.jpg
keywords:
related:
  - title: Git - Documentação oficial
    url: http://git-scm.com/doc
  - title: Try Github (by Codeshool)
    url: https://try.github.io/
  - title: The Perfect Work-flow with Git, GitHub, and SSH (by Net Tuts+)
    url: http://net.tutsplus.com/tutorials/other/the-perfect-workflow-with-git-github-and-ssh/
resumo: >
   Este artigo visa apresentar os conceito de uso básico sobre Git e Github para iniciantes.
---
Primeiramente, **porque falar sobre versionamento?**

Na agencia onde trabalho atualmente, utilizamos FTP para enviar as coisas para o servidor e também para obter os arquivos mais atuais.

Você deve estar se perguntando, mas eu trabalho assim, ou as vezes já usa Git ou SVN e sua vida deve ser bem melhor que a minha.

Pois bem, através de algumas palestras que andei atrás nos ultimos meses normalmente voltadas para o **"mundo front-end"** eu percebi que <del>quase</del> ninguem utilizava mais FTP, todos falaram sobre controle de versão e mais especificamente sobre Git, e francamente na minha cabeça só se focava naquele momento em absorver aquele conteúdo sobre JavaScript e HTML5.

Por outro lado também fiquei pensando sobre versionamento e como minha vida poderia ser melhor utilizando isso, dai cheguei a fazer uma conta no [Github](https://github.com/rafaell-lycan) e estudei por um link que me indicaram da [CodeSchool](https://try.github.io).

A primeira coisa que não me entrava na cabeça era: Como convencer a minha equipe a trabalhar utilizando versionamento de código, e não ficar fazendo merda no FTP e ter que restaurar backup a cada vez que merda acontecer?

A segunda foi: Como eu vou convencer que Git é bom e fácil de usar?

E por ultimo e a mais complicada de todos <del>que por ventura deveria ter sido a primeira a ser pensado</del>: Eu preciso disso? Porque devo aprender?

Para cada uma dessas questões a ultima foi a mais complicada sem dúvidas, mas consegui entender depois de algum tempo vendo outras vagas de emprego que a maioria delas pedia como requisito "SVN/GIT", o que me deu um UP! no quesito de querer aprender. O meu maior problema realmente foi convencer a minha equipe a utilizar controle de versão.

Quando se está trabalhando em uma empresa pequena, onde as pessoas não veem ou não querem ver como o mundo é bem mais do que PHP e Ajax, fica complicado mostrar ***como o mundo é lindo lá fora***, e o porque você deveria ***pensar fora da caixa*** ou até mesmo ***onde a mágica acontece***. <del>Roubei do Zeno</del>.

Isso foi meio frustante, mas eu não estou aqui para falar de coisas chatas e sim de como é simples você não passar pelo mesmo que eu.

## Um pouco sobre Git
O git foi desenvolvido inicialmente por [Linus Torvalds](http://pt.wikipedia.org/wiki/Linus_Torvalds) (Criador do Linux), pela necessidade de ter um software capaz de controlar a versão do kernel linux.

## Alguns termos usados no Git
- **Repository:** Local onde fica todos os arquivos do projeto, inclusive os históricos e versões;
- **Commit:** Coleção de alterações realizadas, é como se fosse um "checkpoint" do seu projeto. Sempre que necessário, você pode retroceder até algum commit especifico.
- **Branch:** É uma ramificação do seu projeto, cada branch representa uma versão do seu projeto ou uma feature criada isoladamente. Podemos seguir o desenvolvimento a partir de um branch. (Default: master)
- **Fork:** Basicamente é uma bifurcação, uma cópia de um projeto existente para o seu dominio em cima de do determinado projeto ou nova feature.
- **Merge:** É a capacidade de incorporar alterações do git, onde acontece uma junção de branchs.

O Git também tem uma coisa muito louca chamado estado de arquivos, que são: Não rastreado (untracked), selecionado (staged), inalterado (unmodified) e modificado (modified).

Talvez isso não seja tão útil agora, mas foi o que consegui entender até o presente momento.

## Mão na massa
1. Primeiro vamos no [site do git](http://git-scm.com/download) para fazer download do software. No meu caso fiz download para Linux utilizando `sudo apt-get install git`, mas no trabalho uso Windows <del>vida cruel</del>.

2. Depois de termos instalado o Git no nosso computador, existe um setup inicial para você definir o utilizador do controle de versão disponível [neste link](http://help.github.com/win-set-up-git/).

3. Crie uma conta no [Github](http://github.com/), é muito fácil.

4. Agora em sua conta no Github, crie um repositório (diretório) com um nome a sua escolha. Ex: teste-git.

5. Agora vamos iniciar nosso projeto indo até uma pasta onde desejamos desenvolver. No meu caso criei uma pasta em `/home/rafaell/projetos/teste-git`. <br>Necesse caso eu criei uma pasta com o mesmo nome do repositório do Github, mas ela poderia ter qualquer outro nome.

6. Abra seu terminal; Navegue até dentro da pasta do projeto e digite `git init`. Isso especifica que você trasformou a pasta atual em um repositório git.

7. Vamos clonar aquele nosso repositório do Github com o comando `git clone git@github.com:rafaell-lycan/teste-git.git`. Este endereço esta localizado na parte superior nas opções SSH e HTTPS. O meu caso estou utilizando SSH.

8. Vamos criar um arquivo ainda não rastreado chamado `index.html`. Quando utilizamos o comando `git add index.html` estamos tornando-o um arquivo selecionado. Caso tivessemos mais de um arquivo, poderiamos utilizar `git add .`.

9. Então fazemos um **commit** utilizando `git commit -m <mensagem commit>`. Tente sempre utilizar mensagens coesas sobre o que esta fazendo como `git commit -m "Adicionado página inicial"`. Pode não parecer nada demais, mas no log ajuda muito a saber onde estão as coisas. O parametro `-m` serve para adicionar uma mensagem diretamente na linha de comando, mas se você prefere utilizar o Vim, pode apenas digitar `git commit`. <del>Se bem que se você utiliza Vim, provavelmente também já conhece/sabe usar Git.</del>

10. Depois disso e outras possíveis modificações e alterações de arquivos, podemos listar os logs através de `git log`, visualizar arquivos criados, alterados ou até mesmo deletados através de `git status` e claro, visualizar as alterações feitas no ultimo commit com `git show`.

11. Depois de tudo feito, podemos utilizar o comando `git push` para submeter as nossas modificações para o repositório do Github, e `git pull` para baixar as modificações feitas neste repositório.

## Conclusão
Eu estou utilizando Git e o Github a pouco tempo, mas provavelmente vou trazer mais coisas sobre isso pra vocês. O mais importante é: Livre-se da bagunça de utilizar FTP. Hoje mesmo depois de provar por A+B que seria muito melhor utilizar isso na agencia, ainda não veem necessidade. A questão é, eu estou correndo atrás do que o mercado quer e o que pode ajudar na minha produtividade. Dou o conselho a quem quiser ouvir (no seu caso ler). Atualmente estou utilizando para guardar coisas que faço na faculdade, criar um portfólio de código, etc.

Se serve de dica, dois lugares que mandei meu me entrevistaram pediram meu perfil do Github por email, que passei com o maior prazer.

Acredito que em um futuro não muito distante <del>agora mesmo</del> o Github vai se tornar algo mais importante do que o proprio CV.
