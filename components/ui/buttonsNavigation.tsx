'use client';
import { useRouter } from 'next/navigation';

export function ButtonNext({ id }: { id: number }) {
  const router = useRouter();

  const handleNextPokemon = () => {
    const nextId = +id + 1;
    router.push(`/pokemon/${nextId}`);
  };

  return (
    <button onClick={handleNextPokemon} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-full fixed top-1/5 right-[10%] mr-2 z-50">
      Next Pokemon
    </button>
  );
}

export function ButtonPrev({ id }: { id: number }) {
  const router = useRouter();

  const handlePrevPokemon = () => {
    const prevId = +id - 1;
    router.push(`/pokemon/${prevId}`);
  };

  return (
    <button onClick={handlePrevPokemon} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-full fixed top-1/5 left-[10%] ml-2 z-50">
      Previous Pokemon
    </button>
  );
}
