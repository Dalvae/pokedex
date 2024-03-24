// const POKEMON_API = "https://pokeapi.co/api/v2/";
import { PokemonData, TypeData, PokemonType } from '../types/pokemonTypes';

export async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=600&offset=0");
    const data = await response.json();
    return data.results;
}


function getFirstAvailableSprite(sprites: any): string {
    const generationOrder = [
        'generation-i', 'generation-ii', 'generation-iii',
        'generation-iv', 'generation-v', 'generation-vi',
        'generation-vii', 'generation-viii',
      ];
    for (const gen of generationOrder) {
      const genSprites = sprites.versions[gen];
      for (const version in genSprites) {
        if (genSprites[version].front_default) {
          return genSprites[version].front_default;
        }
      }
    }
  
    return sprites.front_default || '';
  }

  export async function getPokemon(id: number): Promise<PokemonData> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await response.json();
  
    return {
      ...pokemonData,
      sprite: getFirstAvailableSprite(pokemonData.sprites),
      types: pokemonData.types.map((t: any) => t.type.name), 
    };
  }
