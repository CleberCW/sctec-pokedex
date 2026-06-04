import { Interface } from 'readline/promises';

import { searchPokemon } from '../services/apiServices.js';
import { showPokemonAnimation } from '../views/terminal.js';

export async function menuController(
  interfaceConsole: Interface,
): Promise<boolean> {
  let running = true;

  while (running) {
    console.log('\n________________________\n ');
    console.log('=========================');
    console.log('          POKEDEX        ');
    console.log('=========================');
    console.log(' INSTRUÇÕES DE USO:');
    console.log(' Busque os seus Pokemons');
    console.log(' 1. Buscar Pokemon ');
    console.log(' 2. ');
    console.log(' 3. ');
    console.log(' 4. Sair');
    console.log('==========================\n');

    const respostaOperação = await interfaceConsole.question(
      'Digite a opção escolhida:\n',
    );

    switch (respostaOperação) {
      case '1': {
        const inputPokemon: string = await interfaceConsole.question(
          'Digite o nome ou ID do Pokemon que deseja buscar: \n',
        );

        const pokemon = await searchPokemon(inputPokemon);
        if (pokemon instanceof Error) {
          console.log(pokemon.message);
          await interfaceConsole.question('Pressione enter para prosseguir...');
          break;
        }
        await showPokemonAnimation(pokemon);
        console.log(pokemon);

        await interfaceConsole.question('Pressione enter para prosseguir...');
        break;
      }
      case '2':
        break;
      case '3':
        break;
      case '4':
        running = false;
        break;

      default:
        break;
    }
    console.clear();
  }
  return running;
}
