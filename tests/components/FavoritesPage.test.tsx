import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesPage from "@/app/favorites/page";

// Mock the PokemonList component
jest.mock("@/components/PokemonList", () => {
  return function MockPokemonList({ pokemonList }: { pokemonList: any[] }) {
    return (
      <div data-testid="pokemon-list">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))}
      </div>
    );
  };
});

describe("FavoritesPage", () => {
  // Mock localStorage before each test
  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    localStorageMock = {};

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key) => localStorageMock[key] || null),
        setItem: jest.fn((key, value) => {
          localStorageMock[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
          delete localStorageMock[key];
        }),
        clear: jest.fn(() => {
          localStorageMock = {};
        }),
      },
      writable: true,
    });
  });

  it("should display message when no favorites are found", () => {
    render(<FavoritesPage />);
    expect(
      screen.getByText("No favorites added yet. Go back and add some!")
    ).toBeInTheDocument();
  });

  it("should load and display favorites from localStorage", async () => {
    // Set up mock favorites in localStorage
    const mockFavorites = [
      { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
    ];

    localStorage.setItem("favorites", JSON.stringify(mockFavorites));

    render(<FavoritesPage />);

    await waitFor(() => {
      expect(screen.getByTestId("pokemon-list")).toBeInTheDocument();
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.getByText("charizard")).toBeInTheDocument();
    });
  });

  it("should handle empty array in localStorage", async () => {
    localStorage.setItem("favorites", "[]");

    render(<FavoritesPage />);

    expect(
      screen.getByText("No favorites added yet. Go back and add some!")
    ).toBeInTheDocument();
  });
});
