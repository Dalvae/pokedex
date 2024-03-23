"use client";
import { useEffect, useState } from "react";
import { PokemonCard } from "./pokemonCard";
import { Input } from "@/components/ui/input";
import { getPokemon } from "@/lib/pokeApi";

interface PokemonGridProps {
  pokemonList: any[];
}
interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedPokemonList, setDetailedPokemonList] = useState<
    PokemonDetails[]
  >([]);
  const pokemonsPerPage = 12;

  const searchFilter = (list: any[]) => {
    return list.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(detailedPokemonList).slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        pokemonList.map((pokemon, index) => {
          const pokemonId = index + 1;
          return getPokemon(pokemonId);
        })
      );
      setDetailedPokemonList(details);
    };

    fetchDetails();
  }, [pokemonList]);

  return (
    <>
      <div
        className="shadow-overlay bg-cover min-h-screen flex flex-col justify-between"
        style={{
          background: `#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")`,
        }}
      >
        <div className="container mx-auto max-w-screen-xl overflow-hidden relative">
          <div>
            <h3 className="text-2xl py-5 text-center">
              Search For Your Pokemon!
            </h3>
            <div className="w-full max-w-sm mx-auto items-center gap-1.5">
              <Input
                type="text"
                value={searchText}
                autoComplete="off"
                id="pokemonName"
                placeholder="Charizard, Pikachu, etc."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="max-w-screen-lg mt-5 rounded-xl bg-white mx-[7%] flex flex-col justify-center min-h-[calc(100vh-10rem)]">
            <ul className="flex flex-wrap justify-center m-3">
              {filteredPokemonList.map((pokemon: PokemonDetails) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  sprite={pokemon.sprite}
                />
              ))}
              <div className="clear-both"></div>
            </ul>
            <div className="pagination mb-4 w-full flex justify-center items-center">
              <div className="flex justify-between items-center w-3/4 mx-auto">
                {currentPage > 1 && (
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                <button
                  className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${
                    currentPage <= 1 ? "ml-auto" : ""
                  }`}
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
