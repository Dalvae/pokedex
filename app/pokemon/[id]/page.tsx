import { getPokemon } from "@/lib/pokeApi";
import { ButtonNext, ButtonPrev } from "@/components/ui/buttonsNavigation";
import Image from "next/image";
import { PokemonData } from "@/types/pokemonTypes";
import { TypePills } from "@/components/ui/TypePills";
import { PokemonContainer } from "@/components/PokemonContainer";

interface PokemonPageProps {
  params: {
    id: number;
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemonId = params.id;
  const pokemonData: PokemonData = await getPokemon(pokemonId);

  const formattedId = pokemonId.toString().padStart(4, "0");
  const weightInKg = pokemonData.weight / 10;
  const heightInMeters = pokemonData.height / 10;

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background: `#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")`,
      }}
    >
      <ButtonPrev id={pokemonId} />
      <ButtonNext id={pokemonId} />
      <div className="container mx-auto max-w-screen-xl relative">
        <div className="flex justify-center">
          <PokemonContainer className="max-w-3xl">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
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
                  className="mx-auto bg-gray-200 rounded-md"
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
                  <span className="font-bold">Category:</span>{" "}
                  {pokemonData.category}
                </p>
                <div className="flex flex-wrap justify-center">
                  {pokemonData.stats.map((statObject: any) => {
                    const statName = statObject.stat.name;
                    const statValue = statObject.base_stat;
                    return (
                      <div
                        key={statName}
                        className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
                      >
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
                    <TypePills types={pokemonData.types} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Weakness</h3>
                  <div className="flex justify-center space-x-2">
                    {/* <TypePills types={pokemonData.weaknesses}/> */}
                  </div>
                </div>
              </div>
            </div>
          </PokemonContainer>
        </div>
      </div>
    </div>
  );
}
