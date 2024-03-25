"use client";

import { useEffect, useState } from "react";
import { PokemonCard } from "./pokemonCard";
import { Input } from "@/components/ui/input";
import { SimplePokemonDetails } from "@/types/pokemonTypes";

interface PokemonGridProps {
  pokemonList: SimplePokemonDetails[];
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [loadedPokemonList, setLoadedPokemonList] = useState<
    SimplePokemonDetails[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(8);

  // Filtrar y paginar la lista de Pokémon
  useEffect(() => {
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    const endIndex = startIndex + pokemonsPerPage;
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setLoadedPokemonList(filtered.slice(startIndex, endIndex));
  }, [pokemonsPerPage, currentPage, searchText, pokemonList]);

  // Detectar cambios en el tamaño de la ventana y asigna pokemones
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);

      if (window.innerWidth >= 1200) {
        setPokemonsPerPage(8);
      } else if (window.innerWidth >= 900) {
        setPokemonsPerPage(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Manejar el scroll infinito en dispositivos móviles
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile || searchText.length > 0) {
        return;
      }

      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 500) {
        const morePokemonsNeeded =
          loadedPokemonList.length + pokemonsPerPage > pokemonList.length;
        if (!morePokemonsNeeded) {
          const nextPokemons = pokemonList.slice(
            loadedPokemonList.length,
            loadedPokemonList.length + pokemonsPerPage
          );
          setLoadedPokemonList((prev) => [...prev, ...nextPokemons]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, searchText, loadedPokemonList, pokemonList]);

  // Manejar cambios en el texto de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reiniciar la página actual a 1 cuando se realiza una nueva búsqueda
  };
  // Calcular el total de páginas y la disponibilidad de la siguiente página
  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalPokemons = filteredPokemons.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  const isNextPageAvailable = currentPage < totalPages;
  // Manejar la paginación
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
            <div className="w-full sm:max-w-sm mx-auto px-[10%] sm:px-0 items-center gap-1.5">
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
                  disabled={!isNextPageAvailable}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          <div className="max-w-5xl mt-5 rounded-xl mx-[10%] bg-white flex-start justify-center ">
            <ul className="flex flex-wrap justify-center m-3">
              {loadedPokemonList.map((pokemon) => {
                const urlParts = pokemon.url.split("/");
                const pokemonId = parseInt(urlParts[urlParts.length - 2]);
                return (
                  <PokemonCard
                    key={pokemon.name}
                    id={pokemonId}
                    name={pokemon.name}
                  />
                );
              })}
              <div className="clear-both"></div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
