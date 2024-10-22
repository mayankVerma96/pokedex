"use client";
import { useEffect, useState } from "react";
import { PokemonListItem } from "@/api/types";
import PokemonList from "@/components/PokemonList";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  return (
    <section className="p-10">
      {favorites.length > 0 ? (
        <PokemonList pokemonList={favorites} />
      ) : (
        <p>No favorites added yet. Go back and add some!</p>
      )}
    </section>
  );
};

export default FavoritesPage;
