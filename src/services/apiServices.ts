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
    img: pokemon.sprites.other['official-artwork'].front_default,
  };
}

export async function searchPokemon(
  pokemonNameOrId: string,
): Promise<PokemonResumo | Error> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`,
  );

  if (!response.ok) {
    return new Error('Pokémon not found');
  }

  const data = await response.json();

  if (isPokemonApiResponse(data)) {
    return toPokemonResumo(data);
  }

  return new Error('Invalid Pokémon response');
}
