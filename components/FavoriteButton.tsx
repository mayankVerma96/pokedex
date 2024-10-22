"use client";

import { PokemonListItem } from "@/api/types";
import { useState, useEffect, ReactEventHandler } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({ item }: { item: PokemonListItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favItems =
      favorites.length > 0
        ? favorites.map((fav: PokemonListItem) => fav.name)
        : [];

    setIsFavorite(favItems.length > 0 ? favItems.includes(item.name) : false);
  }, [item.name]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const newFavorites = isFavorite
      ? favorites.length &&
        favorites.filter((fav: PokemonListItem) => fav.name !== item.name)
      : [...favorites, item];
    console.log(newFavorites);

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={(e) => toggleFavorite(e)}>
      {isFavorite ? (
        <div className="flex gap-2 items-center">
          <p>Remove</p>
          <FaHeart />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <p>Add </p>
          <FaRegHeart />
        </div>
      )}
    </button>
  );
}
