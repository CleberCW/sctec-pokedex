import { PokemonResumo } from './PokemonResumo.js';

export default class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): string {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      return `[AVISO] ${pokemon.nome} já está no catálogo.`;
    }

    this.pokemons.push(pokemon);
    return `[OK] ${pokemon.nome} adicionado ao catálogo.`;
  }

  checar(pokemonNameOrId: string): PokemonResumo | null {
    const pokemon = this.pokemons.find(
      (pokemon) =>
        pokemon.id === Number(pokemonNameOrId) ||
        pokemon.nome === pokemonNameOrId,
    );

    return pokemon ?? null;
  }

  listar(): PokemonResumo[] {
    return this.pokemons;
  }

  remover(pokemonToRemove: string): void {
    const index = this.pokemons.findIndex(
      (pokemon) =>
        pokemon.id === Number(pokemonToRemove) ||
        pokemon.nome === pokemonToRemove,
    );

    if (index === -1) {
      console.log('[AVISO] Nenhum Pokémon encontrado com esse ID.');
      return;
    }

    this.pokemons.splice(index, 1);
    console.log('[OK] Pokémon removido do catálogo.');
  }
}
