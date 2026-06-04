export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  img: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': { front_default: string };
    };
  };
}
