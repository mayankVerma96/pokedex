import axiosInstance from "./axios";
import { PokemonListResponse, PokemonResponse } from "./types";

export async function getPokemonList(): Promise<PokemonListResponse> {
  try {
    const response = await axiosInstance.get<PokemonListResponse>(
      "/pokemon?limit=1302"
    );
    console.log("pokedata=", response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch items list`);
  }
}

export async function searchPokemon({
  pokemon,
}: {
  pokemon: string | null;
}): Promise<PokemonResponse | null> {
  try {
    const response = await axiosInstance.get<PokemonResponse>(
      `/pokemon/${pokemon}`
    );
    return response.data;
  } catch (error) {
    console.log("error searching for pokemon");
    return null;
  }
}

export async function getPokemonDetails({
  pokemon,
}: {
  pokemon: string | null;
}): Promise<PokemonResponse | null> {
  try {
    const response = await axiosInstance.get<PokemonResponse>(
      `/pokemon/${pokemon}`
    );
    return response.data;
  } catch (error) {
    console.log("error");
    return null;
  }
}
