// const POKEMON_API = "https://pokeapi.co/api/v2/";
import { PokemonData, TypeData, PokemonType } from '../types/pokemonTypes';

export async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=700&offset=0");
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
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();
  
    try {
      const types = pokemonData.types.map((t: any) => t.type.name);
      const sprite = getFirstAvailableSprite(pokemonData.sprites);
      const description = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === "en").flavor_text;
      const category = speciesData.genera.find((genus : any) => genus.language.name === "en").genus;
  
      let weaknesses: string[] = [];
      for (const typeInfo of pokemonData.types) {
        const typeResponse = await fetch(typeInfo.type.url);
        const typeData: TypeData = await typeResponse.json();
        const typeWeaknesses = typeData.damage_relations.double_damage_from.map(type => type.name);
        weaknesses = [...new Set([...weaknesses, ...typeWeaknesses])];
      }
  
      return {
        ...pokemonData,
        types,
        sprite,
        description,
        category,
        weaknesses,
      };
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Failed to parse response as JSON");
    }
  }