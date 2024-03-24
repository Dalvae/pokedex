"use server"
import { getPokemonList, getPokemon } from '../lib/pokeApi';
import { PokemonGrid } from '@/components/pokemonGrid';
import { PokemonData } from '@/types/pokemonTypes';

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 20;

  const pokemonList = await getPokemonList(page, limit);
  const detailedPokemonList: PokemonData[] = await Promise.all(
    pokemonList.map(async (pokemon: any) => {
      const detailedPokemon = await getPokemon(pokemon.name);
      return detailedPokemon;
    })
  );

  return <PokemonGrid pokemonList={detailedPokemonList} />;
}