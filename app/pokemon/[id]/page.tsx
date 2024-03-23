
import { getPokemon } from "@/lib/pokeApi";
import { ButtonNext, ButtonPrev} from "@/components/ui/buttonsNavigation";


export default async function PokemonPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const pokemonObject = await getPokemon(id);
  const { name: pokemonName, weight, stats, sprites } = pokemonObject;



  return (
    <>
      <h1 className="text-4xl text-bold pt-4">
        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </h1>
      <div
        className="m-4"
        style={{ position: "relative", width: "300px", height: "300px" }}
      >
        <img
          src={sprites.other["official-artwork"].front_default}
          alt={pokemonName}
        />
      </div>
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
      <ButtonPrev id={id} />
      <ButtonNext id={id} />
    </>
  );
}
