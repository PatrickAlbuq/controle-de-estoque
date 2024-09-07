# **Sobre o Projeto**
  - Estre projeto trata-se de um sistema de controle de estoque. Atualmente é possível buscar e adicionar novos produtos. Futuramente serão adicionadas features para deletar e atualizar os produtos assim como inserir ou retirar certa quantidade de um produto existente.
  - Projeto entregue como requisito para conclusão do curso de Análise e Desenvolvimento de Sistemas.
  ---

<br>
<br>

# **Sumário**
  * [Sobre o Projeto](#sobre-o-projeto)
  * [Configurando o Projeto](#configurando-o-projeto)
    * [Banco de Dados](#banco-de-dados)
      * [Instalando MySQL](#instalando-mysql)
      * [Configurando Usuário](#configurando-usuário)
    * [NodeJS](#nodejs)
      * [Instalando Node](#instalando-node)
    * [Back-End](#back-end)
    * [Front-End](#front-end)
---

<br>
<br>

## **Banco de Dados**
### **Instalando MySQL**
  - Para este projeto será utilizado o MySQL. Comece baixando e instalando o sistema através do [site oficial](https://dev.mysql.com/downloads/mysql/).
  - Siga as instruções do instalador do MySQL community. Se for necessário, este [guia](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing) pode ajudar.

<br>

### **Configurando Usuário**
  - Após instalar o MySQL Server, através do Mysql Workbench ou Shell crie um novo banco.
  - Crie um novo usuário e conceda as permissões à ele sobre o banco de dados criado.
---

<br>
<br>

## **NodeJS**
  - Será utilizado o NodeJS como base tanto para o Back-End como para o Front-End.

### **Instalando Node**
  - Para instalar o NodeJS basta acessar o [site official](https://nodejs.org/en/download/package-manager) e seguir os passos de instalação para o seu sistema operacional. Siga as instruções e aguarde finalizar.
---

<br>
<br>

## **Repositório**
  - Com banco de dados e o Node instalados podemos partir para o projeto.
  - Primeiro clone o projeto (necessário ter o Git instalado, pode ser feito através do [site oficial](https://git-scm.com/downloads)), as seguintes opções são mais recomendadas mas você pode baixar o ZIP do projeto, se desejar (não necessita do Git).

<br>

  - `SSH:`
```
git clone git@github.com:PatrickAlbuq/controle-de-estoque.git
```

  - `HTTPS:`
```
git clone https://github.com/PatrickAlbuq/controle-de-estoque.git
```

<br>

  - Com o projeto clonado você pode agora acessar seus arquivos.
  - Neles você irá encontrar duas pastas, a `Back-End` e a `Front-End`.
  - Em suas respectivas pastas você encontrará os códigos do projeto.
---

<br>
<br>

### **Back-End**
  - Dentro da pasta `Back-End` abra uma terminal e rode o seguinte comando:

```
npm install
```
  - Este comando irá baixar todas as dependências necessárias para o projeto.

<br>

  - A seguir, encontre o arquivo com nome `.env.example`, crie uma cópia dele e renomeie para `.env`
  - Dentro dele você irá encontrar as seguintes linhas:

```
# SERVER
PORT=3000               # Porta em que o Back-End irá rodar

# DATABASE  
USER=                   # Nome do usuário configurado no MySQL
PASSWORD=               # Senha do usuário configurado no MySQL
DATABASE=               # Nome do banco de dados configurado no MySQL
DB_HOST=localhost       # Host do banco de dados
DB_PORT=3306            # Porta do banco de dados
DIALECT=mysql           # Dialéto de banco de dados
```
  - Seguindo o mesmo padrão das 3 últimas linhas, preencha cada campo com seu respectivo valor. Os comentários em cada linha te auxiliarão.

<br>

  - Agora vamos configurar as tabelas do seu Banco de Dados com poucos comandos. Volte ao terminal e siga os seguintes passos:

```
npm run migrate
```
  - e
```
npm run seed
```
  - Através de arquivos pré configurados, o primeiro comando cria as tabelas e o segundo aficiona alguns itens à elas para não comecarem vazias :)

<br>

  - Agora, ainda no terminal dentro da pasta `Back-End` e rode o seguinte comando:
```
npm start
```
  - Você verá uma mensagem como:
```
> projeto-controle-de-estoque@1.0.0 start
> nodemon -r esm index.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node -r esm index.js`
[07-09-2024 06:10:56] App listening on port 3000
```
  - Isso significa que o seu servidor já está operando, se desejar finalizar a operação precione `CTRL + C` no terminal ou apenas feche-o.
---

<br>
<br>
  
## **Front-End**
  - Com o Back-End em funcionamento resta apenas subir o Front-End.
  - Dentro das pasta `Front-End` abra um novo terminal.
  - Rode o seguinte comando:

```
npm install
```
  - Este comando irá baixar todas as dependências necessárias para o projeto.

<br>

  - Agora utilize o este comando:
```
npm run dev
```
  - Você verá uma mensagem como:
```
> controle-de-estoque-front@0.0.0 dev
> vite


  VITE v4.5.3  ready in 671 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
  - Isso siginifica que sua aplicação está rodando, basta acessá-la em [http://localhost:5173/](http://localhost:5173/). Se desejar finalizar a operação precione `CTRL + C` no terminal ou apenas feche-o.