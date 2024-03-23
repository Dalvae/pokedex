// app/lib/fetchPokemon.js
export async function fetchPokemon(limit = 151, offset = 0) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return data.results;
  }
  