import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import PokemonList from "../../components/PokemonList";

jest.mock("axios");

const mockPokemonListResponse = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  ],
};

describe("PokemonList", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockPokemonListResponse,
    });
  });

  test("should display the list of Pokemon", async () => {
    render(<PokemonList pokemonList={mockPokemonListResponse.results} />);

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.getByText("squirtle")).toBeInTheDocument();
    });
  });

  test("should filter the Pokemon based on search query", async () => {
    render(<PokemonList pokemonList={mockPokemonListResponse.results} />);

    const searchInput = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(searchInput, { target: { value: "bulbasaur" } });

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();

      // these will not be in the document
      expect(screen.queryByText("charmander")).not.toBeInTheDocument();
      expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });
  });

  test('should display "No items found" when search query does not match any Pokemon', async () => {
    render(<PokemonList pokemonList={mockPokemonListResponse.results} />);

    const searchInput = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(searchInput, { target: { value: "pikachu" } });

    await waitFor(() => {
      expect(screen.getByText("No items found")).toBeInTheDocument();
    });
  });
});
