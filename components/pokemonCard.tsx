import Link from "next/link";


interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}


export function PokemonCard({ id, name, types, sprite }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      key={name + "Card"}
    >
      <img src={sprite} alt={name} className="pokemon-sprite" />
      <h2 className={`text-2xl font-semibold`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
      <div className="types">
        {types && types.map((type) => <span key={type}>{type}</span>)}
      </div>
    </Link>
  );
}
