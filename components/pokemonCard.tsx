import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPokemon } from "@/lib/pokeApi";
import { PokemonData } from "@/types/pokemonTypes";

interface PokemonCardProps {
  id: number;
  name: string;
}

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

export function PokemonCard({ id, name }: PokemonCardProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await getPokemon(id);
      setPokemonData(data);
    };

    fetchPokemonData();
  }, [id]);

  if (!pokemonData) {
    const formattedId = id.toString().padStart(4, "0");
    return (
      <li className="group rounded-lg overflow-hidden transition-transform ease-in-out duration-200 hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="block rounded-lg m-3 p-5 transition-transform ease-in-out duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-100">
          <div className="animate-pulse flex flex-col">
            <div className="bg-gray-200 rounded-md aspect-square mb-4"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <span className="text-sm m-2 font-bold text-gray-400 font-flexo-bold mx-4">
            N.° {formattedId}
          </span>
          <h2 className="text-xl font-semibold text-gray-700 font-flexo-demi mt-3 mx-4">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <div className="flex gap-1 mx-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="inline-block text-center px-3 text-xs rounded-sm font-flexo-medium bg-gray-200 w-[80px] h-6"
              ></div>
            ))}
          </div>
        </div>
      </li>
    );
  }

  const { sprite, types } = pokemonData;
  const formattedId = id.toString().padStart(4, "0");

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
          {types.map((type) => (
            <span
              key={type}
              className={`inline-block text-center px-3 text-xs rounded-sm font-flexo-medium ${
                typeColors[type as keyof typeof typeColors] || "bg-gray-400"
              } w-[80px]`}
            >
              {typeof type === "string"
                ? type.charAt(0).toUpperCase() + type.slice(1)
                : "Unknown"}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
}
