import { getPokemonDetails } from "@/api/items";
import { PokemonListItem } from "@/api/types";
import FavoriteButton from "@/components/FavoriteButton";
import Image from "next/image";
import { notFound } from "next/navigation";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const pokemon = await getPokemonDetails({ pokemon: params.id });

  // console.log("pokemon==", pokemon.types);

  if (!pokemon) {
    notFound();
  }
  const url = process.env.NEXT_PUBLIC_API_URL || "https://pokeapi.co/api/v2/";
  const pokemonItem = {
    name: pokemon?.name,
    url: `${url}pokemon/${pokemon?.id}`,
  } as PokemonListItem;

  console.log("pokemomn==", pokemon);

  return (
    <main>
      <section className="my-10 mx-auto justify-center items-center w-[400px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              height={100}
              width={100}
              objectFit="cover"
            /> */}
            <h1>Name: {pokemon.name.toUpperCase()}</h1>
          </div>

          <FavoriteButton item={pokemonItem} />
        </div>

        <p className="my-4">Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <div className="mt-4 flex gap-4">
          Type:
          <ul>
            {pokemon.types.map((item) => (
              <li
                className="text-red-600"
                key={`${pokemon.name}-${item.type.name}`}
              >
                - {item.type.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default DetailPage;
