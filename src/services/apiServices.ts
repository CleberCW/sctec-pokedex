import { PokemonApiResponse } from '../types/PokemonApiResponse.js';
import { PokemonResumo } from '../types/PokemonResumo.js';
import { isPokemonApiResponse } from '../validators/validators.js';

function toPokemonResumo(pokemon: PokemonApiResponse): PokemonResumo {
  return {
    id: pokemon.id,
    nome: pokemon.name,
    tipos: pokemon.types.map((t) => t.type.name),
    altura: pokemon.height,
    peso: pokemon.weight,
    img: pokemon.sprites.other['official-artwork'].front_default || '',
  };
}

export async function searchPokemon(
  pokemonNameOrId: string,
): Promise<PokemonResumo | Error> {
  try {
    if (pokemonNameOrId.length === 0) {
      return new Error('Invalid Pokémon name or ID');
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        return new Error('Pokémon não encontrado');
      }

      if (response.status === 429) {
        return new Error(
          'Limite de requisições excedido. Tente novamente mais tarde',
        );
      }

      if (response.status === 429) {
        return new Error('Erro no servidor. Tente novamente mais tarde');
      }

      return new Error(
        'Houve um problema ao acessar a API. Tente novamente mais tarde',
      );
    }

    const data = await response.json();

    if (isPokemonApiResponse(data)) {
      return toPokemonResumo(data);
    }

    return new Error('Resposta inválida da API');
  } catch (error) {
    if (error instanceof Error) {
      return new Error('Erro desconhecido: ' + error.message);
    }

    throw new Error('Erro desconhecido.');
  }
}
