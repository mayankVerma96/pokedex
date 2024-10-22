// define the local storage mock functions
// add items to fav on click
// remove already added items from fav onclick
// load initial favorites from localstorage
// can handle multiple items in favorites

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoriteButton from "@/components/FavoriteButton";

describe("FavoriteButton", () => {
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

  const mockPokemon = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };

  it("should add item to favorites when clicked", async () => {
    render(<FavoriteButton item={mockPokemon} />);

    // Initial state should show "Add"
    expect(screen.getByText("Add")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      // Button should now show "Remove"
      expect(screen.getByText("Remove")).toBeInTheDocument();

      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      expect(storedFavorites).toHaveLength(1);
      expect(storedFavorites[0]).toEqual(mockPokemon);
    });
  });

  it("should remove item from favorites when clicked again", async () => {
    localStorage.setItem("favorites", JSON.stringify([mockPokemon]));

    render(<FavoriteButton item={mockPokemon} />);

    expect(screen.getByText("Remove")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Add")).toBeInTheDocument();

      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      expect(storedFavorites).toHaveLength(0);
    });
  });

  it("should load initial favorite state from localStorage", async () => {
    localStorage.setItem("favorites", JSON.stringify([mockPokemon]));

    render(<FavoriteButton item={mockPokemon} />);

    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("should handle multiple items in favorites", async () => {
    const anotherPokemon = {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    };

    localStorage.setItem("favorites", JSON.stringify([anotherPokemon]));

    render(<FavoriteButton item={mockPokemon} />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      expect(storedFavorites).toHaveLength(2);
      expect(storedFavorites).toContainEqual(mockPokemon);
      expect(storedFavorites).toContainEqual(anotherPokemon);
    });
  });
});
