import React from 'react';
import PokeballPixel from '@/public/icons/pokeballpixel';

interface PokemonContainerProps {
  children: React.ReactNode;
}


export function PokemonContainer({ children }: PokemonContainerProps) {
    return (
      <div className="max-w-5xl mt-5 rounded-xl mx-[10%] bg-white flex-start min-h-[70vh] justify-center relative border-black border-8 border-double">
        <div className="absolute top-0 left-0 -mt-4 -ml-4">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4">
          <PokeballPixel className="w-6 h-6" />
        </div>
        <div className="absolute bottom-0 right-0 -mb-4 -mr-4">
          <PokeballPixel className="w-6 h-6" />
        </div>
        {children}
      </div>
    );
  }