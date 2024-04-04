"use server";
import { getPokemonList } from "../lib/pokeApi";
import { PokemonGrid } from "@/components/pokemonGrid";

export default async function Home() {
  const pokemonList = await getPokemonList();
  const totalPokemons: number = pokemonList.length; // Obtener el total de Pokémon y especificar el tipo
  return (
    <PokemonGrid
      pokemonList={pokemonList}
      totalFetchedPokemons={totalPokemons}
    />
  );
}
