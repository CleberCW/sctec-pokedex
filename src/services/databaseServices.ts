import { PokemonResumo } from '../types/PokemonResumo.js';

export function checkPokemonInCatalogo(
  pokemonNameOrId: string,
  catalogo: PokemonResumo[],
): PokemonResumo | null {
  const pokemon = catalogo.find(
    (pokemon) =>
      pokemon.id === Number(pokemonNameOrId) ||
      pokemon.nome === pokemonNameOrId,
  );

  return pokemon ?? null;
}

export function addPokemonCatalogo(
  pokemon: PokemonResumo,
  catalogo: PokemonResumo[],
) {
  const stringId = pokemon.id.toString();
  if (!checkPokemonInCatalogo(stringId, catalogo)) {
    catalogo.push(pokemon);
    return `Pokemon ${stringId} - ${pokemon.nome} adicionado com sucesso ao catálogo!`;
  }
  return `Pokemon ${stringId} - ${pokemon.nome} já está no catálogo!`;
}
