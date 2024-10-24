import { getPokemonList } from "@/api/items";
import { PokemonListItem } from "@/api/types";
import PokemonList from "@/components/PokemonList";

export default async function Home() {
  // const pokemonList = await getPokemonList();
  let pokemonList: PokemonListItem[] = [];
  let error = null;

  try {
    const response = await getPokemonList();
    pokemonList = response.results;

    if (!pokemonList || pokemonList.length === 0) {
      error = "Cant find any Pokemon.";
    }
  } catch (e) {
    error = "Failed to fetch the data.";
  }

  if (error) {
    return (
      <main>
        <section className="p-10 text-center">
          <h1 className="text-xl font-bold">{error}</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="p-10">
        <PokemonList pokemonList={pokemonList} />
      </section>
    </main>
  );
}
