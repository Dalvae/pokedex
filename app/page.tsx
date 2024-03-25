"use server";
import { getPokemonList } from '../lib/pokeApi';
import { PokemonGrid } from '@/components/pokemonGrid';

export default async function Home() {
  const pokemonList = await getPokemonList();
  return( 
  <PokemonGrid pokemonList={pokemonList} />
  );
}