import { getPokemonList } from "@/api/items";
import PokemonList from "@/components/PokemonList";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main>
      <section className="p-10">
        <PokemonList pokemonList={pokemonList.results} />
      </section>
    </main>
  );
}
