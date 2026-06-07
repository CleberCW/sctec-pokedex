# Pokédex TypeScript Lite

Uma aplicação de terminal desenvolvida em Node.js e TypeScript que consome dados da PokeAPI, permite pesquisar Pokémon por nome ou ID e gerencia um catálogo local durante a execução da aplicação.

## Sobre o Projeto

Este projeto foi desenvolvido com foco no aprendizado dos fundamentos do desenvolvimento back-end com TypeScript, aplicando conceitos de programação orientada a objetos, consumo de APIs, tratamento de erros e organização de código.

Os dados dos Pokémon são obtidos através da PokeAPI e transformados em objetos simplificados para utilização dentro da aplicação.

## Objetivos de Aprendizagem

Durante o desenvolvimento foram praticados os seguintes conceitos:

- Node.js
- TypeScript
- Interfaces
- Classes
- Programação Orientada a Objetos
- Tipagem estática
- Async/Await
- Fetch API
- Tratamento de erros
- Manipulação de JSON
- Métodos de array
- Git e GitHub
- GitFlow

## Tecnologias Utilizadas

- Node.js
- TypeScript
- TSX
- PokeAPI
- terminal-image
- figlet
- ESLint
- Prettier
- Git
- GitHub

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

- Node.js
- npm
- Git

## Instalação

Clone o repositório:

```bash
git clone https://github.com/CleberCW/sctec-pokedex.git
```

Acesse a pasta do projeto:

```bash
cd sctec-pokedex
```

Instale as dependências:

```bash
npm install
```

## Executando o Projeto

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Ou em modo de produção:

```bash
npm run build
npm run start
```

## Estrutura do Projeto

```text
src/
├── controllers/
│   └── controllr.ts
├── img/
│   ├── 025.png
│   ├── pokeball.gif
│   └── pokeball.png
├── services/
│   ├── apiServices.ts
│   └── databaseServices.ts
├── types/
│   ├── PokemonApiResponse.ts
│   ├── PokemonCatalogo.ts
│   └── PokemonResumo.ts
├── validators/
│   └── validators.ts
├── views/
│   └── terminal.ts
└── main.ts

├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Funcionalidades

- Buscar Pokémon por nome
- Buscar Pokémon por ID
- Exibir informações detalhadas do Pokémon encontrado
- Exibir imagem do Pokémon diretamente no terminal
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicados
- Remover Pokémon do catálogo por nome ou ID
- Listar Pokémon cadastrados
- Tratar erros de entrada e requisição
- Interface de terminal estilizada

## Conceitos Aplicados

### TypeScript

Foram utilizadas interfaces, classes e tipagem estática para aumentar a segurança, previsibilidade e legibilidade do código.

### Interface `PokemonResumo`

A interface define a estrutura dos objetos utilizados pela aplicação, garantindo consistência dos dados e prevenção de erros durante o desenvolvimento.

### Async/Await e Fetch

A comunicação com a PokeAPI é realizada através de requisições assíncronas utilizando `fetch` e `async/await`.

### Tratamento de Erros

A aplicação trata diferentes cenários de falha, incluindo:

- Pokémon inexistente (404)
- Entrada vazia
- Dados inválidos
- Falhas de comunicação com a API

### Métodos de Array

Foram utilizados diversos métodos nativos para manipulação dos dados:

- `find()`
- `findIndex()`
- `map()`
- `forEach()`
- `some()`
- `filter()`

### Classe `CatalogoPokemon`

Responsável por encapsular a lista de Pokémon cadastrados e disponibilizar métodos para:

- Adicionar Pokémon
- Remover Pokémon
- Verificar existência
- Listar catálogo

A coleção permanece privada, garantindo encapsulamento e controle de acesso aos dados.

### Interface de Terminal

A aplicação utiliza:

- **figlet** para criação de títulos estilizados
- **terminal-image** para exibição das imagens dos Pokémon

Em terminais compatíveis (Kitty, iTerm2, entre outros), as imagens originais podem ser exibidas. Em terminais convencionais, elas são convertidas para blocos Unicode coloridos.

## Estratégia de Branches

O projeto segue uma estrutura simplificada inspirada no GitFlow:

```text
main
├── feat/*
└── fix/*
```

Exemplos:

```text
feat/add-pokemon-search
fix/image-loading-bug
```

## Melhorias Futuras

### Cache de Pokémon

Evitar chamadas repetidas para a API armazenando resultados já consultados.

### Cache de Imagens

Atualmente as imagens são baixadas novamente durante a listagem.

Uma melhoria futura será armazená-las localmente após o primeiro download.

### Persistência em Arquivo

Salvar o catálogo em um arquivo JSON para manter os dados entre execuções.

### Mais Informações dos Pokémon

Adicionar:

- HP
- Ataque
- Defesa
- Velocidade
- Habilidades

### Tradução para Português

Traduzir automaticamente informações retornadas pela API, como tipos e habilidades.

### API Própria

Criar uma API utilizando Express para disponibilizar os dados do catálogo através de endpoints REST.

## API Utilizada

- PokeAPI: https://pokeapi.co/

## Autor

Desenvolvido por **Cleber Leal** como projeto avaliativo do módulo M1S08 do curso de Desenvolvimento Back-end Node da SCTEC.
