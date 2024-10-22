"use client";
import React, { useState, useEffect } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { PokemonListItem } from "@/api/types";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Image from "next/image";

const ITEMS_PER_PAGE = 20;

const PokemonList = ({ pokemonList }: { pokemonList: PokemonListItem[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonListItem[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    const currentLength = displayedPokemon.length;
    const newPokemon = pokemonList.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );
    setDisplayedPokemon((prev) => [...prev, ...newPokemon]);

    if (newPokemon.length < ITEMS_PER_PAGE) {
      // are no more items to load
      setHasMore(false);
    }
  };

  // scrolling logic
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 5 && hasMore) {
      loadMore();
    }
  };

  useEffect(() => {
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedPokemon(filteredPokemon.slice(0, ITEMS_PER_PAGE));

    // Reset hasMore since filtering
    setHasMore(filteredPokemon.length > ITEMS_PER_PAGE);
  }, [searchQuery, pokemonList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, displayedPokemon]);

  return (
    <div>
      <SearchBar
        searchValue={searchQuery}
        setSearchValue={setSearchQuery}
        placeholder="Search Pokemon..."
      />
      {displayedPokemon.length > 0 ? (
        <ul className="mt-10">
          {displayedPokemon.map((pokemon) => (
            <li
              key={pokemon.name}
              className="border mb-6 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <Link href={`/details/${pokemon.name}`} className="p-5 flex-1">
                  <p>{pokemon.name}</p>
                </Link>
                <div className="mr-5">
                  <FavoriteButton item={pokemon} />
                </div>
              </div>
            </li>
          ))}
          {hasMore && <p className="text-center">Loading more...</p>}
        </ul>
      ) : (
        searchQuery && <p className="text-center mt-10">No items found</p>
      )}
    </div>
  );
};

export default PokemonList;

// "use client";
// import React, { useState, useEffect } from "react";
// import FavoriteButton from "@/components/FavoriteButton";
// import { PokemonListItem, PokemonResponse } from "@/api/types";
// import Link from "next/link";
// import { getPokemonList, searchPokemon } from "@/api/items";
// import SearchBar from "./SearchBar";

// const ITEMS_PER_PAGE = 20;

// const PokemonList = ({
//   initialPokemonList,
// }: {
//   initialPokemonList: PokemonListItem[];
// }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchPokemonResult, setSearchPokemonResult] =
//     useState<PokemonResponse | null>(null);
//   const [pokemonList, setPokemonList] =
//     useState<PokemonListItem[]>(initialPokemonList);
//   const [offset, setOffset] = useState(ITEMS_PER_PAGE);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadMorePokemon = async () => {
//     if (isLoading || !hasMore) return;
//     setIsLoading(true);

//     try {
//       const data = await getPokemonList(offset, ITEMS_PER_PAGE);

//       if (data.results.length > 0) {
//         setPokemonList((prev) => [...prev, ...data.results]);
//         setOffset((prev) => prev + ITEMS_PER_PAGE);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to load more Pokémon:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (
//       scrollHeight - scrollTop <= clientHeight + 50 &&
//       hasMore &&
//       !isLoading
//     ) {
//       loadMorePokemon();
//     }
//   };

//   const handleSubmitSearch = async () => {
//     const searchResult = await searchPokemon({ pokemon: searchQuery });
//     setSearchPokemonResult(searchResult);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [hasMore, isLoading]);

//   if (searchPokemonResult !== null) {
//     return (
//       <>
//         <SearchBar
//           searchValue={searchQuery}
//           setSearchValue={setSearchQuery}
//           placeholder="Search Pokemon..."
//           onSubmit={handleSubmitSearch}
//         />
//         <div
//           key={searchPokemonResult.name}
//           className="border mb-6 mt-10 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-900"
//         >
//           <div className="flex items-center justify-between">
//             <Link
//               href={`/details/${searchPokemonResult.name}`}
//               className="p-5 flex-1"
//             >
//               <p>{searchPokemonResult.name}</p>
//             </Link>
//             {/* <div className="mr-5">
//           <FavoriteButton item={searchPokemonResult} />
//         </div> */}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <div>
//       <SearchBar
//         searchValue={searchQuery}
//         setSearchValue={setSearchQuery}
//         placeholder="Search Pokemon..."
//         onSubmit={handleSubmitSearch}
//       />
//       <ul className="mt-10">
//         {pokemonList.map((pokemon) => (
//           <li
//             key={pokemon.name}
//             className="border mb-6 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-900"
//           >
//             <div className="flex items-center justify-between">
//               <Link href={`/details/${pokemon.name}`} className="p-5 flex-1">
//                 <p>{pokemon.name}</p>
//               </Link>
//               <div className="mr-5">
//                 <FavoriteButton item={pokemon} />
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {isLoading && <p className="text-center mt-10">Loading more...</p>}
//       {!hasMore && <p className="text-center mt-10">No more Pokémon to load</p>}
//     </div>
//   );
// };

// export default PokemonList;
