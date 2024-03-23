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
    const [detailedPokemonList, setDetailedPokemonList] = useState<PokemonDetails[]>([]);
    const pokemonsPerPage = 12;

  

    const searchFilter = (list: any[]) => {
        return list.filter(
            (pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const filteredPokemonList = searchFilter(detailedPokemonList).slice(
        (currentPage - 1) * pokemonsPerPage,
        currentPage * pokemonsPerPage
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(pokemonList.map((pokemon, index) => {
                const pokemonId = index + 1;
                return getPokemon(pokemonId);
            }));
            setDetailedPokemonList(details);
        };
    
        fetchDetails();
    }, [pokemonList]);

    return (
        <>
            <div>
                <h3 className="text-2xl py-6 text-center">Search For Your Pokemon!</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input 
                        type="text" 
                        value={searchText} 
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="Charizard, Pikachu, etc."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
            </div>
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
                {filteredPokemonList.map((pokemon: any) => (
                    <PokemonCard 
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        sprite={pokemon.sprites ? pokemon.sprites.front_default : ''}
                    />
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                )}
                <button onClick={() => paginate(currentPage + 1)}>Next</button>
            </div>
        </>
    );
}
