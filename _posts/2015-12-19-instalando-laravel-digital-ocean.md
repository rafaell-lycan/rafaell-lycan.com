---
layout: post
title:  "Instalando Laravel 5 na DigitalOcean"
date:   2015-12-19
tags: laravel php
keywords: laravel, instalar laravel, laravel cloud, digital ocean
description: >
  Saiba como instalar Laravel 5 na DigitalOcean utilizando Nginx em um server Ubuntu.
related:
  - title: How To Install Laravel with Nginx on an Ubuntu 12.04 LTS VPS
    url: https://www.digitalocean.com/community/tutorials/how-to-install-laravel-with-nginx-on-an-ubuntu-12-04-lts-vps
  - title: How To Install Linux, nginx, MySQL, PHP (LEMP) stack on Ubuntu 12.04
    url: https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-12-04
---
Fala pessoal, este post é mais para tirar dúvidas de algumas pessoas que tem me procurado com problemas na instalação do [Laravel](http://laravel.com/) em Web Hosts que são bem limitados quanto a recursos e versão do PHP.

Alguns pontos sobre os pré-requisitos do Laravel (Até versão 5.1):

- PHP >= 5.4
- MCrypt PHP Extension

Não irei passar por nenhuma parte de segurança, (Firewall, acesso, etc), apenas o básico de configuração:

- **Distribuição:** Ubuntu 14.04;
- **Web Server:** Nginx;
- **PHP Extensions:** PHP-MYSQL, PHP-FPM, PHP-CLI, PHP-MCrypt;
- **Databases:** MySQL;
- **Outros:** Git;

## Setup
A primeira coisa que precisamos fazer antes de instalar o Laravel, é configurar nosso ambiente, lembre-se que a instancia vem sem nada, precisamos configurar tudo do zero.

Precisamos atualizar os pacotes locais para atualizar a lista de pacotes disponíveis, só então adicionar os pacotes necessários:

{% highlight text %}
sudo apt-get update
sudo apt-get install nginx mysql-server php5-mysql php5-fpm php5-cli php5-mcrypt git
{% endhighlight %}

Nesse post vamos utilizar o [Nginx](http://nginx.org/) juntamente com os pacotes PHP necessários para conseguirmos rodar o Laravel sem problemas. Também precisamos instalar o [Git](https://git-scm.com/), já que ele é uma dependencia do [Composer](https://getcomposer.org/) que irá gerenciar os pacotes do PHP quando instalarmos o Laravel.

Durante a instalação o MySQL irá fazer algumas perguntas relacionadas a *senha do root* (root password), mas caso você perca a chance de configurar uma senha nesta etapa, não se preocupe, é bem fácil faze-lo depois.


#### Configurando o MySQL
Bom, vou começar explicando pelo [MySQL](https://www.mysql.com/) porque é o mais fácil de se configurar.

Depois de tudo instalado, vamos habilita-lo através do comando:

{% highlight text %}
sudo mysql_install_db
{% endhighlight %}

Feito isso execute o comando abaixo para mantermos uma instalação mais "segura" informando a senha de root definida.

{% highlight text %}
sudo /usr/bin/mysql_secure_installation
{% endhighlight %}

Será apresentada uma tela como esta:

{% highlight text %}
Enter current password for root (enter for none):
OK, successfully used password, moving on...
{% endhighlight %}

Nessa hora você vai definir se quer mudar a senha de root novamente e outras várias opções onde você vai definir respondendo "n" para não e "y" para sim.

**DICA:** Por padrão você pode apenas apertar "ENTER" para as demais perguntas, pois o MySQL já traz valores default nesta etapa de configuração, como remover alguns bancos de dados que não são utilizados, desabilitar logins remotos como root e carregar algumas regras quanto ao proprio sistema do MySQL.

Feito isso vamos a configuração do PHP.

#### Configurando o PHP
Com o PHP e as demais ferramentas instaladas, precisamos abilitar o PHP-FPM já que estamos utilizando o **nginx**:

{% highlight text %}
sudo vim /etc/php5/fpm/php.ini
{% endhighlight %}


Com o arquivo aberto, procure por `cgi.fix_pathinfo` e modifique o parametro para `0`, o qual por default é configurado com `1`:

{% highlight text %}
cgi.fix_pathinfo=0
{% endhighlight %}

Isso impede que o PHP execute scripts com nomes similares quando não forem encontrados (sim, sério), e essa configuração é importante em questões de segurança, pois este comportamento permite que o servidor sofra tentativas de ataque e execute códigos que não deveria. Apenas salve o arquivo e podemos ser felizes.

Por ultimo precisamos habilitar é a extensão *MCrypt* que é uma dependencia do Laravel. Execute o comando `php5enmod` para habilita-lo facilmente de forma manual:

{% highlight text %}
sudo php5enmod mcrypt
{% endhighlight %}

Agora só reiniciar o FPM e esta pronto a configuração do PHP:

{% highlight text %}
sudo service php5-fpm restart
{% endhighlight %}

Feito isso vamos ao servidor.

#### Configurando o Servidor Nginx
Agora vem a parte legal da coisa, a configuração do nosso servidor de aplicação.

A primeira coisa que vamos fazer é definir o diretório **root** da aplicação. Nossa aplicação vai ficar localizada em `/var/www/laravel`. Coloquei Laravel apenas como convenção, mas você pode mudar para qualquer outro nome de sua preferência.

Normalmente apenas o folder `/var` esta criado por conta da estrutura *FHS* do sistema, mas nós vamos criar as outras pastas manualmente utilizando o parâmetro `-p` junto ao comando `mkdir`, que irá criar os folders necessários para construtir o path passado como argumento:

{% highlight text %}
sudo mkdir -p /var/www/laravel
{% endhighlight %}

Feito isso, vamos adicionar a localização da nossa aplicação no bloco de configuração do Nginx:

{% highlight text %}
sudo vim /etc/nginx/sites-available/default
{% endhighlight %}

Esse arquivo tem **N** coisas, mas relaxa, vamos basicamente modificar o bloco `server {}`:

{% highlight text %}
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /var/www/laravel/public;
    index index.php index.html index.htm;

    server_name <server domain / IP>;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
{% endhighlight %}

Nessa etapa, modificamos o *document root* para `/var/www/laravel/public`, onde está o arquivo base da aplicação (index.php) que também foi adicionado na linha abaixo de arquivos de index.

Em `server_name` mudamos de `localhost` para o **domínio** ou **IP** do servidor. Caso você ainda não tem nenhum domínio configurado, apenas adicione o endereço IP do servidor.

Modificamos a entrada `try_files` que tentará por default servir um arquivo como padrão, mas caso o arquivo/rota não existir, o usuário sera redirecionado para o arquivo `index.php` da aplicação que pode ser seguido por uma *query string* como parâmetro opicional.

Foi criado um bloco específico para a execução de arquivos PHP, o qual ira tratar qualquer request a origens `*.php` e irá redirecionar como parâmetro para o nosso arquivo `index.php`.

Também foi habilitado o `fastcgi_*` que possui uma série de configurações para a execução correta através do socket feito com o PHP-FPM para se comunicar com o arquivo `index.php` usando diversas operações e tratamentos, e, utilizando o `SCRIPT_FILENAME` como parâmetro para que o PHP localize as requests corretamente e redirecione se necessário.

Salve o arquivo quando terminar estas edições e reinicie o servidor com o comando abaixo:

{% highlight text %}
sudo service nginx restart
{% endhighlight %}

## Instalando o Laravel via Composer
Agora sim, com tudo configurado e rodando direito, vamos a instação. Primeiro volte para o diretório home do seu usuário. Vamos a instalação do *Composer*:

{% highlight text %}
cd ~
curl -sS https://getcomposer.org/installer | php
{% endhighlight %}

Esse comando irá gerar o arquivo `composer.phar` em seu diretório home. Por mais que seja possível rodar a partir deste diretório, uma melhor estratégia é mante-lo disponível globalmente, dessa forma precisamos renomea-lo e move-lo para a pasta local:

{% highlight text %}
sudo mv composer.phar /usr/local/bin/composer
{% endhighlight %}

No fim, apenas removemos a extensão do arquivo quando o mudamos de lugar, mas agora temos o comando composer instalado globalmente em nosso servidor.

Vamos instalar o Laravel, mas lembre-se que configuramos nosso servidor para servir a aplicação a partir do diretório `/var/www/laravel`:

{% highlight text %}
sudo composer create-project laravel/laravel /var/www/laravel
{% endhighlight %}

Agora, com o Laravel instalado no path `/var/www/laravel` precisamos dar permissões para que o servidor possa executar os arquivos sem problemas:

{% highlight text %}
sudo chown -R :www-data /var/www/laravel
{% endhighlight %}

**Nota:** `www-data` é o grupo de usuários que o *Nginx* utiliza.

Vamos também alterar as permissões no diretório `/var/www/laravel/app/storage` apenas para escrita, para evitarmos problemas na execução da aplicação:

{% highlight text %}
sudo chmod -R 775 /var/www/laravel/app/storage
{% endhighlight %}

Por fim, como Laravel é um framework PHP, o que deixa claro que não precisamos compilar nada, acesse sua aplicação pelo domínio ou IP do servidor para verificar se tudo esta rodando corretamente:

{% highlight text %}
http://<server domain / IP>
{% endhighlight %}

## Conclusão
Tudo o que foi mostrado aqui pode ser encontrado facilmente na internet visitando algumas páginas do Google e até mesmo os tutoriais no [site da Digital Ocean](https://www.digitalocean.com/community/tutorials).
