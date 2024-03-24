"use server";
import { getPokemonList, getPokemon } from '../lib/pokeApi';
import { PokemonGrid } from '@/components/pokemonGrid';
import { PokemonData } from '@/types/pokemonTypes';

export default async function Home() {
  const pokemonList = await getPokemonList();

  const detailedPokemonList: PokemonData[] = await Promise.all(
    pokemonList.map(async (pokemon:any, index:number) => {
      const adjustedIndex = index + 1;
      const detailedPokemon = await getPokemon(adjustedIndex);
      return detailedPokemon;
    })
  );

  return <PokemonGrid pokemonList={detailedPokemonList}/>;
}
