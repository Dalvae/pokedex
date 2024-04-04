"use client";

import { useEffect, useState, useRef } from "react";
import { PokemonCard } from "./pokemonCard";
import { Input } from "@/components/ui/input";
import { SimplePokemonDetails } from "@/types/pokemonTypes";
import { PokemonContainer } from "@/components/PokemonContainer";

interface PokemonGridProps {
  pokemonList: SimplePokemonDetails[];
  totalFetchedPokemons: number;
}

export function PokemonGrid({
  pokemonList,
  totalFetchedPokemons,
}: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [loadedPokemonList, setLoadedPokemonList] = useState<
    SimplePokemonDetails[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(8);
  const lastPokemonRef = useRef<HTMLLIElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  }, [pokemonsPerPage]);

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
          lastPokemonRef.current?.scrollIntoView({ behavior: "smooth" });
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
  // Movimiento con teclas

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (isNextPageAvailable) {
      paginate(currentPage + 1);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "ArrowLeft" || key === "k") {
      event.preventDefault();
      handlePreviousPage();
    } else if (key === "ArrowRight" || key === "j") {
      event.preventDefault();
      handleNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isNextPageAvailable]);

  return (
    <>
      <div
        className="bg-cover min-h-screen flex flex-col justify-between"
        style={{
          background: `#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")`,
        }}
      >
        <div className="container mx-auto max-w-screen-xl relative">
          <div
            className={`flex justify-between items-center mt-6 mx-[10%] ${
              !isMobile ? "max-w-5xl" : ""
            }`}
          >
            {!isMobile && currentPage > 1 ? (
              <button
                className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded border-double border-4 border-black pagination-button w-32 sm:block hidden"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            ) : (
              <div className="w-32 sm:block hidden"></div>
            )}
            <div className="w-full sm:max-w-sm mx-auto px-[10%] sm:px-0">
              <Input
                type="text"
                value={searchText}
                autoComplete="off"
                id="pokemonName"
                placeholder="Search for your Pokemon"
                onChange={handleSearchChange}
                className="border-4 border-black border-double rounded-md"
              />
            </div>
            {!isMobile && (
              <button
                className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded border-double border-4 border-black pagination-button w-32 sm:block hidden"
                onClick={handleNextPage}
                disabled={!isNextPageAvailable}
              >
                Next
              </button>
            )}
          </div>
          <PokemonContainer
            currentProgress={
              (currentPage - 1) * pokemonsPerPage + loadedPokemonList.length
            }
            totalProgress={
              searchText.length > 0
                ? filteredPokemons.length
                : totalFetchedPokemons
            }
          >
            <ul className="flex flex-wrap justify-center m-3">
              {loadedPokemonList.map((pokemon, index) => {
                const urlParts = pokemon.url.split("/");
                const pokemonId = parseInt(urlParts[urlParts.length - 2]);
                const isLast = pokemonId === loadedPokemonList.length - 1;
                const isSelected = index === selectedIndex;
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
          </PokemonContainer>
        </div>
      </div>
    </>
  );
}
