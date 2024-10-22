import {
  getPokemonList,
  getPokemonDetails,
  searchPokemon,
} from "../../api/items";
import axiosInstance from "../../api/axios";

jest.mock("../../api/axios");

const mockPokemonListResponse = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  ],
};

const mockPokemonDetailsResponse = {
  name: "bulbasaur",
  id: 1,
  height: 20,
  weight: 40,
};

describe("API calls", () => {
  test("getPokemonList should fetch the list of Pokemon", async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockPokemonListResponse,
    });
    const pokemonList = await getPokemonList();

    expect(axiosInstance.get).toHaveBeenCalledWith("/pokemon?limit=1302");
    expect(pokemonList).toEqual(mockPokemonListResponse);
  });

  test("getPokemonDetails should fetch the details of a Pokemon", async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockPokemonDetailsResponse,
    });

    const pokemonDetails = await getPokemonDetails({ pokemon: "bulbasaur" });

    expect(axiosInstance.get).toHaveBeenCalledWith("/pokemon/bulbasaur");
    expect(pokemonDetails).toEqual(mockPokemonDetailsResponse);
  });

  test("getPokemonDetails should return null on error", async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch Pokemon details")
    );

    const pokemonDetails = await getPokemonDetails({ pokemon: "bulbasaur" });

    expect(axiosInstance.get).toHaveBeenCalledWith("/pokemon/bulbasaur");
    expect(pokemonDetails).toBeNull();
  });

  test("searchPokemon should fetch the details of a Pokemon", async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockPokemonDetailsResponse,
    });

    const pokemonDetails = await searchPokemon({ pokemon: "bulbasaur" });

    expect(axiosInstance.get).toHaveBeenCalledWith("/pokemon/bulbasaur");
    expect(pokemonDetails).toEqual(mockPokemonDetailsResponse);
  });

  test("searchPokemon should return null on error", async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch Pokemon details")
    );

    const pokemonDetails = await searchPokemon({ pokemon: "bulbasaur" });

    expect(axiosInstance.get).toHaveBeenCalledWith("/pokemon/bulbasaur");
    expect(pokemonDetails).toBeNull();
  });
});
