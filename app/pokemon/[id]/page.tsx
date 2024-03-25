import { getPokemon } from "@/lib/pokeApi";
import { ButtonNext, ButtonPrev } from "@/components/ui/buttonsNavigation";
import Image from "next/image";
import { PokemonData } from "@/types/pokemonTypes";

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemonId = parseInt(params.id, 10);
  const pokemonData: PokemonData = await getPokemon(pokemonId);

  const typeColors = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-500 text-white",
    psychic: "bg-pink-500 text-white",
    ice: "bg-cyan-500 text-white",
    dragon: "bg-indigo-500 text-white",
    dark: "bg-gray-800 text-white",
    fairy: "bg-pink-200 text-white",
    bug: "bg-green-300 text-white",
    poison: "bg-purple-400 text-white",
    stone: "bg-brown-400 text-white",
    rock: "bg-yellow-800 text-white",
    flying: "bg-sky-400 text-white",
    ground: "bg-yellow-200 text-black",
  };
  const formattedId = pokemonId.toString().padStart(4, "0");
  const weightInKg = pokemonData.weight / 10;
  const heightInMeters = pokemonData.height / 10;

  return (
    <div className=" min-h-screen "
    style={{
      background: `#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")`,
    }}>
      <ButtonPrev id={pokemonId} />
      <ButtonNext id={pokemonId} />
      <div className="container mx-auto  py-8">
        <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 mx-[10%] max-w-5xl w-full ">
          <div className="text-center flex justify-center items-baseline">
            <h1 className="text-4xl font-flexo-demi mr-4 font-bold mb-2">
              {pokemonData.name.charAt(0).toUpperCase() +
                pokemonData.name.slice(1)}
            </h1>
            <span className="text-4xl font-flexo-demi font-bold text-gray-500">
              N.° {formattedId}
            </span>
          </div>
          <div className="flex justify-center my-8">
              <Image
                src={pokemonData.sprite}
                alt={pokemonData.name}
                width={200}
                height={200}
                className="mx-auto bg-gray-200 rounded-md m-6"
              />
          </div>
          <div className="text-center">
            <p className="text-lg mb-4">{pokemonData.description}</p>
            <p className="mb-2">
              <span className="font-bold">Weight:</span> {weightInKg} kg
            </p>
            <p className="mb-2">
              <span className="font-bold">Height:</span> {heightInMeters} m
            </p>
            <p className="mb-6">
              <span className="font-bold">Category:</span> {pokemonData.category}
            </p>
            <div className="flex flex-wrap justify-center mx-[20%]">
              {pokemonData.stats.map((statObject: any) => {
                const statName = statObject.stat.name;
                const statValue = statObject.base_stat;
                return (
                  <div key={statName} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                    <div className="bg-gray-200 rounded-lg p-4">
                      <h3 className="font-bold mb-2">{statName}</h3>
                      <p>{statValue}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Type</h3>
              <div className="flex justify-center space-x-2">
                {pokemonData.types.map((type) => (
                  <span
                    key={type}
                    className={`inline-block px-10 rounded-md text-sm ${
                      typeColors[type as keyof typeof typeColors] || "bg-gray-400"
                    }`}
                  >
                    {typeof type === "string"
                      ? `${type.charAt(0).toUpperCase()}${type.slice(1)}`
                      : "Unknown"}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Weakness</h3>
              <div className="flex justify-center space-x-2">
                {pokemonData.weaknesses?.map((type) => (
                  <span
                    key={type}
                    className={`inline-block px-4 py-2 rounded-full text-sm ${
                      typeColors[type as keyof typeof typeColors] || "bg-gray-400"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
