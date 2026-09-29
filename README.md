# Pokédex FATEC

Aplicação mobile desenvolvida em React Native/Expo para o projeto do 1º bimestre. Ela consome a [PokéAPI](https://pokeapi.co/) para criar cards de Pokémon.

## Integrantes

- **Nome completo:** Guilherme Porto de Melo Junqueira
- **Nome completo:** Leonardo Bonamin

## Funcionalidades

- Login validado por usuário e senha cadastrados;
- Cadastro com nome, telefone, CPF, e-mail, curso, usuário e senha;
- Persistência local dos dados do cadastro com AsyncStorage (equivalente ao LocalStorage no React Native);
- Pokédex com acesso a todos os Pokémon da API, exibidos por páginas;
- Pesquisa de Pokémon pelo nome;
- Aba de time aleatório: ADD gera seis Pokémon diferentes e EXCLUIR remove o time;
- Time aleatório persistido separadamente para cada usuário;
- Preferência de busca persistida separadamente para cada usuário;
- Tela com detalhes, atributos e habilidades do Pokémon.

## Como executar

1. Instale o Node.js LTS e o app **Expo Go** no celular.
2. No terminal, dentro desta pasta, execute `npm install`.
3. Execute `npm start`.
4. Leia o QR Code exibido usando o Expo Go, ou pressione `a` para abrir no emulador Android.

## API utilizada

- PokéAPI: `https://pokeapi.co/api/v2/pokemon/{id}`
