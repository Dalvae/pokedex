"use client";

import { useEffect, useState, useCallback } from "react";
import { PokemonCard } from "./pokemonCard";
import { Input } from "@/components/ui/input";
import { getPokemon } from "@/lib/pokeApi";
import { SimplePokemonDetails, PokemonData } from "@/types/pokemonTypes";

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
  const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const pokemonsPerPage = 12;

  // Detalles de pokemon
  useEffect(() => {
    function filterPokemon() {
      const startIndex = (currentPage - 1) * pokemonsPerPage;
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );

      const paginatedItems = isMobile
        ? filtered
        : filtered.slice(startIndex, startIndex + pokemonsPerPage);
      setFilteredPokemonList(paginatedItems);
    }

    filterPokemon();
  }, [searchText, pokemonList, currentPage, isMobile]);

  //Handle Resize

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Handle Scoll
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile || searchText.length > 0) {
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, currentPage, searchText]);

  //Busqueda

  //Reestablece la paginacion cuando hay texto  en el buscador

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div
        className="bg-cover min-h-screen flex flex-col justify-between"
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
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {!isMobile && (
            <div className="pagination my-6 w-full flex justify-center items-center">
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
                  //  disabled={
                  //   currentPage * pokemonsPerPage >= filteredPokemonList.length // Cambiado a filteredPokemonList
                  // }
                >
                  Next
                </button>
              </div>
            </div>
          )}
          <div className="max-w-5xl mt-5 rounded-xl mx-[10%] bg-white flex flex-col justify-center min-h-[calc(100vh-10rem)]">
            <ul className="flex flex-wrap justify-center m-3">
              {filteredPokemonList.map((pokemon: PokemonData) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
