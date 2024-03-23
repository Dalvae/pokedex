// const POKEMON_API = "https://pokeapi.co/api/v2/";

// getPokemonList -> Get the first 151 pokemon 
export async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const data = await response.json();
    return data.results;
}

export async function getPokemon(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const text = await response.text(); // Primero obtén el texto de la respuesta
  try {
      const data = JSON.parse(text); // Luego intenta parsear el texto como JSON
      const types = data.types.map((t: any) => t.type.name);
      const sprite = data.sprites.versions['generation-i']['red-blue'].front_default;
      return {
          ...data,
          types,
          sprite,
      };
  } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Response text:", text);
      throw new Error("Failed to parse response as JSON");
  }
}