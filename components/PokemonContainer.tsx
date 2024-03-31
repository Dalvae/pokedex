import React from "react";
import PokeballPixel from "@/public/icons/pokeballpixel";

interface PokemonContainerProps {
  children: React.ReactNode;
}

export function PokemonContainer({ children }: PokemonContainerProps) {
  return (
    <div className="max-w-5xl mt-5 mx-[10%] bg-white flex-start min-h-[70vh] justify-center relative border-black border-b-[6px] border-2">
      <div className="m-[3px] bg-white border-black border-2 border-t-[6px]">
        <div className="absolute top-0 left-0 -mt-2 -ml-2">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-2 -ml-2">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute bottom-0 right-0 -mb-2 -mr-2">
          <PokeballPixel className="w-6 h-6" />
        </div>
        {children}
      </div>
    </div>
  );
}
