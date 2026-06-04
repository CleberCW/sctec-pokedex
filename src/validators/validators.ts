import { PokemonApiResponse } from '../types/PokemonApiResponse.js';

interface PokemonType {
  type: {
    name: string;
  };
}

function isPokemonType(value: unknown): value is PokemonType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'object' &&
    value.type !== null &&
    'name' in value.type &&
    typeof value.type.name === 'string'
  );
}

export function isPokemonApiResponse(
  value: unknown,
): value is PokemonApiResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const pokemon = value as Record<string, unknown>;

  return (
    typeof pokemon.id === 'number' &&
    typeof pokemon.name === 'string' &&
    typeof pokemon.height === 'number' &&
    typeof pokemon.weight === 'number' &&
    Array.isArray(pokemon.types) &&
    pokemon.types.every(isPokemonType)
  );
}
