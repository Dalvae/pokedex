import { getPokemon } from "@/lib/pokeApi";
import { ButtonNext, ButtonPrev } from "@/components/ui/buttonsNavigation";
import Image from "next/image";

export default async function PokemonPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const pokemonObject = await getPokemon(id);
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
    normal: "bg-gray-400 text-white"
  };
  const {
    name: pokemonName,
    weight,
    stats,
    sprite,
    description,
    category,
    height,
    weaknesses,
    types,
  } = pokemonObject;

  const formattedId = id.toString().padStart(4, "0");
  const weightInKg = weight / 10;
  const heightInMeters = height / 10;
  return (
    <>
      <div
        className="bg-cover min-h-screen flex flex-col justify-between"
        style={{
          background: `#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")`,
        }}
      >
        <ButtonPrev id={id} />
        <ButtonNext id={id} />
        <div className="container mx-auto max-w-screen-xl overflow-hidden relative">
          <div className="max-w-5xl  mt-10 rounded-xl mx-[10%] bg-white flex flex-col justify-center min-h-[calc(100vh-10rem)]">
            <div className="text-center flex justify-center items-baseline">
              <h1 className="text-4xl text-bold mr-4">
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
              </h1>
              <span className="text-4xl font-bold text-gray-400">
                N.° {formattedId}
              </span>
            </div>
            <div className="m-4 flex justify-center items-center max-w-[200]">
              <Image
                src={sprite}
                alt={pokemonName}
                width={300}
                height={300}
                className="bg-gray-200 rounded-md aspect-square"
              />
            </div>
            <p>{description}</p>
            <p>Weight: {weightInKg} kg</p>
            <p>Height: {heightInMeters} m</p>
            <p>Category {category}</p>
            <div className="flex-col">
              {stats.map((statObject: any) => {
                const statName = statObject.stat.name;
                const statValue = statObject.base_stat;
                return (
                  <div
                    className="flex items-stretch"
                    style={{ width: "500px" }}
                    key={statName}
                  >
                    <h3 className="p-2 w-2/4">
                      {statName}: {statValue}
                    </h3>
                    {/* {<Progress className="w-2/4 m-auto" value={statValue} /> } */}
                  </div>
                );
              })}
            </div>
            <h3>Type</h3>
            <div className="flex gap-1 mx-4">
              {types &&
                types.map((type) => (
                  <span
                    key={type}
                    className={`inline-block text-center px-3  text-xs rounded-sm font-flexo-medium ${
                      typeColors[type as keyof typeof typeColors] ||
                      "bg-gray-400"
                    } w-[80px]`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
            </div>
            <h3>Weakness</h3>
            <div className="flex gap-1 mx-4">
              {weaknesses &&
                weaknesses.map((type) => (
                  <span
                    key={type}
                    className={`inline-block text-center px-3  text-xs rounded-sm font-flexo-medium ${
                      typeColors[type as keyof typeof typeColors] ||
                      "bg-gray-400"
                    } w-[80px]`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
