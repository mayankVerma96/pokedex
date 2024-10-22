export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonResponse {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: PokemonTypeObject[];
}

export interface PokemonTypeObject {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}
