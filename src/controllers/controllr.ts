import { Interface } from 'readline/promises';

import { searchPokemon } from '../services/apiServices.js';
import CatalogoPokemon from '../types/PokemonCatalogo.js';
import {
  listarCatalogoTerminal,
  listarPokemon,
  showMenu,
  showPokemonAnimation,
} from '../views/terminal.js';

const catalogo = new CatalogoPokemon();

export async function menuController(
  interfaceConsole: Interface,
): Promise<boolean> {
  let running = true;

  while (running) {
    await showMenu();

    const respostaOperação = await interfaceConsole.question(
      'Digite a opção escolhida:\n',
    );

    switch (respostaOperação) {
      case '1': {
        const inputPokemon: string = await interfaceConsole.question(
          'Digite o nome ou ID do Pokemon que deseja buscar: \n',
        );

        if (inputPokemon.length === 0) {
          console.log('Input inválido');
          break;
        }

        const pokemon =
          catalogo.checar(inputPokemon) ?? (await searchPokemon(inputPokemon));

        if (!(pokemon instanceof Error)) {
          await showPokemonAnimation(pokemon);
          listarPokemon(pokemon);

          const askUser: string = await interfaceConsole.question(
            'Deseja adicionar esse Pokemon ao catálogo? (s/n): \n',
          );

          if (askUser === 's') {
            console.log(catalogo.adicionar(pokemon));
          }
          break;
        }
        console.log(pokemon.message);

        break;
      }
      case '2':
        console.clear();
        await listarCatalogoTerminal(catalogo.listar());
        break;
      case '3': {
        const inputPokemon: string = await interfaceConsole.question(
          'Digite o nome ou ID do Pokemon que deseja remover do seu catálogo: \n',
        );

        catalogo.remover(inputPokemon);
        break;
      }
      case '4':
        running = false;
        break;

      default:
        break;
    }
    await interfaceConsole.question('Pressione enter para prosseguir...');
    console.clear();
  }
  return running;
}
