# Shop Games Mobile

Shop Games Mobile é um aplicativo móvel desenvolvido com React Native para uma loja de videogames. Este projeto faz parte do portfólio acadêmico e tem como objetivo proporcionar uma experiência de compra intuitiva e segura, reunindo funcionalidades como cadastro, login, navegação pelo catálogo de jogos, gerenciamento de carrinho, favoritos e chat para atendimento em tempo real.

---

## Funcionalidades

- **Cadastro e Login:**  
  Permite aos usuários criar uma conta de forma segura e acessar o sistema para realizar compras e interagir com o aplicativo.

- **Catálogo de Jogos:**  
  Exibição de jogos disponíveis com detalhes de cada produto, facilitando a navegação e a busca por jogos de interesse.

- **Carrinho de Compras:**  
  Funcionalidade para adicionar, remover e gerenciar jogos selecionados para compra.

- **Favoritos:**  
  Possibilita aos usuários marcar jogos de interesse para acessar facilmente posteriormente.

- **Chat:**  
  Sistema de chat integrado para suporte e interação com o atendimento da loja.

- **Integração com Backend:**  
  Consumo de uma API RESTful para operações de CRUD e gerenciamento de dados, com armazenamento persistente via MongoDB (utilizando Mongoose).

---

## Tecnologias Utilizadas

- **Frontend:**  
  - [React Native](https://reactnative.dev/) – Desenvolvimento do aplicativo móvel.
  - JavaScript (ES6+)
  - Componentes de interface e navegação próprios do React Native

- **Integração de API:**  
  - Consumo de endpoints RESTful para comunicação com o backend.

- **Backend (referência):**  
  - Embora este projeto seja o aplicativo móvel, ele se integra a um servidor RESTful desenvolvido (possivelmente em Node.js) que utiliza MongoDB com Mongoose.

---

## Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Ambiente de desenvolvimento para React Native (por exemplo, Expo CLI ou React Native CLI)
- Emulador Android/iOS ou dispositivo físico para testes

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DavigSo/shop-games-mobile.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd shop-games-mobile
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou, se preferir:
   ```bash
   yarn install
   ```

4. **Configuração do Ambiente:**  
   Se houver necessidade de configurar variáveis de ambiente (como URL da API), crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias (consulte a documentação do projeto ou o arquivo `.env.example`, se disponível).

5. **Execute o aplicativo:**

   - **Com Expo CLI:**  
     Se o projeto utiliza Expo, inicie o servidor com:
     ```bash
     expo start
     ```
     Em seguida, use o aplicativo Expo Go em seu dispositivo ou um emulador para visualizar o app.

   - **Com React Native CLI:**  
     Para Android:
     ```bash
     npx react-native run-android
     ```
     Para iOS:
     ```bash
     npx react-native run-ios
     ```

---

## Uso

Após iniciar o aplicativo, o usuário poderá:
- **Realizar cadastro e login** para acessar sua conta.
- **Navegar pelo catálogo de jogos,** visualizar detalhes e informações dos produtos.
- **Adicionar jogos ao carrinho** e gerenciar suas compras.
- **Marcar jogos como favoritos** para facilitar futuras consultas.
- **Utilizar o chat** para tirar dúvidas e obter suporte.

---

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar o aplicativo ou adicionar novas funcionalidades, sinta-se à vontade para abrir issues ou enviar pull requests.

---

## Licença

Este projeto é open-source e está licenciado sob a [Licença MIT](LICENSE).

---

## Contato

Para dúvidas, sugestões ou suporte, entre em contato:

- **Davi Sousa Oliveira**  
  Campina Grande - PB  
  **E-mail:** [davig4611@gmail.com](mailto:davig4611@gmail.com)  
  **GitHub:** [DavigSo](https://github.com/DavigSo)  
  **LinkedIn:** [Davi Sousa Oliveira](https://linkedin.com/in/davi-sousa-/)

---
