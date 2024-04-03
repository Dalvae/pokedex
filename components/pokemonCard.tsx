import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPokemon } from "@/lib/pokeApi";
import { PokemonData } from "@/types/pokemonTypes";
import { PokemonCardSkeleton } from "./ui/PokemonCardSkeleton";
import { TypePills } from "./ui/TypePills";

interface PokemonCardProps {
  id: number;
  name: string;
}

export function PokemonCard({ id, name }: PokemonCardProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await getPokemon(id);
      setPokemonData(data);
    };

    fetchPokemonData();
  }, [id]);

  const formattedId = id.toString().padStart(4, "0");

  if (!pokemonData) {
    return <PokemonCardSkeleton id={id} name={name} />;
  }

  const { sprite, types } = pokemonData;

  return (
    <li
      key={id}
      className="group rounded-lg overflow-hidden transition-transform ease-in-out duration-200 hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <Link
        href={`/pokemon/${id}`}
        className="block rounded-lg m-3 p-5 transition-transform ease-in-out duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-100"
        key={id}
      >
        <Image
          src={sprite}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
          className="bg-gray-200 rounded-md aspect-square"
        />
        <span className="text-sm m-2 font-bold text-gray-400 font-flexo-bold mx-4">
          N.° {formattedId}
        </span>
        <h2 className="text-xl font-semibold text-gray-700 font-flexo-demi mt-3 mx-4 ">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <div className="flex gap-1 mx-4">
          <TypePills types={types} />
        </div>
      </Link>
    </li>
  );
}
