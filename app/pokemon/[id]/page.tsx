import { getPokemon } from "@/lib/pokeApi";
import { ButtonNext, ButtonPrev } from "@/components/ui/buttonsNavigation";

export default async function PokemonPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const pokemonObject = await getPokemon(id);


  const { name: pokemonName, weight, stats, sprite, description, category, weaknesses } = pokemonObject;
  const formattedId = id.toString().padStart(4, "0");

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
            <div
              className="m-4"
              style={{ position: "relative", width: "300px", height: "300px" }}
            >
              <img
                src={sprite}
                alt={pokemonName}
              />
            </div>
            <p>{description}</p>
            <h3>Weight: {weight}</h3>
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
                    <h3 className="p-3 w-2/4">
                      {statName}: {statValue}
                    </h3>
                    {/* <Progress className="w-2/4 m-auto" value={statValue} /> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
