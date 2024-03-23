import Link from "next/link";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const typeColors = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  psychic: "bg-pink-500",
  ice: "bg-cyan-500",
  dragon: "bg-indigo-500",
  dark: "bg-gray-800",
  fairy: "bg-pink-200",
  bug: "bg-green-300",
  poison: "bg-purple-400",
  stone: "bg-brown-400",
  rock: "bg-yellow-800",
  flying: "bg-sky-400",
  ground: "bg-yellow-100 text-black",
  // Agrega más tipos según sea necesario
};

export function PokemonCard({ id, name, types, sprite }: PokemonCardProps) {
  const formattedId = id.toString().padStart(4, "0");
  return (
    <li
      key={id}
      className="group rounded-lg overflow-hidden transition-transform ease-in-out duration-200 hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <Link
        href={`/pokemon/${id}`}
        className="block rounded-lg m-3 p-5  transition-transform ease-in-out duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-100"
        key={id}
      >
        <img
          loading="lazy"
          src={sprite}
          alt={name}
          className="bg-gray-200 block relative mx-auto rounded-md w-full aspect-square"
        />
        <span className="text-sm font-bold text-gray-600">N.° {formattedId}</span>
        <h2 className="text-2xl font-semibold text-center mt-10">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <div className="flex justify-center gap-2 mt-4">
          {types &&
            types.map((type) => (
              <span
                key={type}
                className={`inline-block px-4 py-1 text-sm rounded-md ${
                  typeColors[type] || "bg-gray-400 text-white"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
        </div>
      </Link>
    </li>
  );
}
