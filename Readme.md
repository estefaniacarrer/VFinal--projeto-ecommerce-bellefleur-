## 🚀 1º Projeto Prático - DevWeb
### 📋 Construindo um Site Responsivo com HTML e CSS

### 🚩 Desafio 1
<br>
Desenvolva um site responsivo completo para uma empresa do ramo de cosméticos, com foco na criação de um layout flexível que se adapte a dispositivos móveis e desktop. Ao finalizar este projeto, você terá praticado HTML e CSS, aprendendo a estruturar páginas da web, criar um cabeçalho, rodapé e utilizar variáveis CSS para facilitar a manutenção do design.

<br>✅ Etapas<br>

a. Estrutura do Site: Crie uma estrutura de arquivos e defina a estrutura HTML básica.<br>
b. Cabeçalho e Rodapé: Desenvolva um cabeçalho e rodapé atraentes, aplicando estilos CSS.<br>
c. Variáveis CSS: Utilize variáveis CSS para melhorar a manutenção do design.<br>
d. Responsividade: Garanta que o site seja responsivo e se adapte a diferentes tamanhos de tela.<br>
e. Publicação: Publique o projeto em um servidor ou plataforma de hospedagem.<br><br>


### 🚩 Desafio 2
Aprimore o site responsivo criado no projeto "Construindo um Site Responsivo com HTML e CSS" adicionando funcionalidades interativas e dinâmicas com JavaScript. Isso pode incluir recursos como um menu suspenso, carrossel de imagens, exibição de informações ao passar o mouse e outros elementos interativos.

<br>✅ Etapas<br>

a. Identificação de Elementos: Identifique os elementos do site onde a interatividade será aplicada.<br>
b. Manipulação do DOM: Utilize JavaScript para manipular o DOM e adicionar comportamentos interativos.<br>
c. Eventos de Usuário: Implemente eventos de usuário, como cliques, mouseover e mouseout, para acionar a interatividade.<br>
d. Validação: Se for relevante, integre validação de formulários para garantir que os dados do usuário sejam inseridos corretamente.<br>
e. Teste e Aprimoramento: Teste a interatividade em diferentes dispositivos e faça ajustes para garantir que funcione de maneira consistente.<br>

### 🚩 Desafio 3
Desenvolva uma API REST com Node e Express que forneça os dados para o site responsivo criado no projeto "Construindo um Site Responsivo com HTML e CSS" e integre o frontend e a API. As informações devem ser armazenadas no banco de dados MongoDB.

<br>✅ Etapas<br>

a. Coleções no MongoDB: crie as coleções no MongoDB e armazene informações que serão fornecidas para o frontend.<br>
b. Criação da API: desenvolva as rotas e os endpoints da API REST.<br>
c. Integração front e back: faça integração do frontend para trazer informações da API usando Fetch API.<br>
d. Teste e Aprimoramento: Teste a integração e faça ajustes para garantir que funcione de maneira consistente.<br>


## 🖥️ Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Node.js, Express
- **Banco de Dados:** MongoDB
<br>

## 💡  Como Rodar a Aplicação

### 📌 Passo a Passo:

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. No terminal, navegue até o diretório do projeto e execute o comando `npm install` para instalar as dependências.
4. Configure o banco de dados de acordo com as variáveis de ambiente fornecidas no arquivo de configuração. 
5. Execute o comando `npm start` para iniciar o servidor.

### 🛠️ Comandos do Node.js:

- `npm install`: Instala todas as dependências necessárias.

-  sugestão de rotas para o banco de dados:
-  MongoDB instalado:
await mongoose.connect('mongodb://127.0.0.1:27017/bellefleur')
-  Utilizando docker.compose:
const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
await mongoose.connect(uri);
Obs: Os comandos estão pré-configurados na pasta backend/db/conn.js

- `npm start`: Inicia o servidor.
<br>


