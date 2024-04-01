"use client";

import { useRouter } from "next/navigation";

export function ButtonNext({ id }: { id: number }) {
  const router = useRouter();

  const handleNextPokemon = () => {
    const nextId = +id + 1;
    router.push(`/pokemon/${nextId}`);
  };

  return (
    <button
      onClick={handleNextPokemon}
      className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-1 rounded fixed lg:top-28 top-1/2 right-[5%] transform -translate-y-1/2 ml-2 z-50 border-double border-4 border-black sm:right-[21%]"
    >
      Next Pokemon
    </button>
  );
}

export function ButtonPrev({ id }: { id: number }) {
  const router = useRouter();

  const handlePrevPokemon = () => {
    const prevId = +id - 1;
    if (prevId >= 1) {
      router.push(`/pokemon/${prevId}`);
    }
  };

  return (
    <button
      onClick={handlePrevPokemon}
      className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-1 rounded fixed lg:top-28 top-1/2 left-[5%] transform -translate-y-1/2 ml-2 z-50 border-double border-4 border-black sm:left-[20%]"
    >
      Previous Pokemon
    </button>
  );
}
