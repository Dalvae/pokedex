"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ButtonNextProps {
  id: number;
}

export function ButtonNext({ id }: ButtonNextProps) {
  const router = useRouter();

  const handleNextPokemon = () => {
    const nextId = +id + 1;
    router.push(`/pokemon/${nextId}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "j") {
        event.preventDefault();
        handleNextPokemon();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [id]);

  return (
    <button
      onClick={handleNextPokemon}
      className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-1 rounded fixed lg:top-28 top-1/2 right-[5%] transform -translate-y-1/2 ml-2 z-50 border-double border-4 border-black sm:right-[21%]"
    >
      Next Pokemon
    </button>
  );
}

interface ButtonPrevProps {
  id: number;
}

export function ButtonPrev({ id }: ButtonPrevProps) {
  const router = useRouter();

  const handlePrevPokemon = () => {
    const prevId = id - 1;
    if (prevId >= 1) {
      router.push(`/pokemon/${prevId}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "k") {
        event.preventDefault();
        handlePrevPokemon();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [id]);

  return (
    <button
      onClick={handlePrevPokemon}
      className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-1 rounded fixed lg:top-28 top-1/2 left-[5%] transform -translate-y-1/2 ml-2 z-50 border-double border-4 border-black sm:left-[20%]"
    >
      Previous Pokemon
    </button>
  );
}
