'use client';

import { useRouter } from 'next/navigation';

export function ButtonNext({ id }: { id: number }) {
  const router = useRouter();

  const handleNextPokemon = () => {
    const nextId = +id + 1; //Aca habia un bug tremendo
    router.push(`/pokemon/${nextId}`);
  };

  return (
    <button onClick={handleNextPokemon}>Next Pokemon</button>
  );
}

export function ButtonPrev({ id }: { id: number }) {
  const router = useRouter();

  const handlePrevPokemon = () => {
    const prevId = +id - 1; 
    router.push(`/pokemon/${prevId}`);
  };

  return (
    <button onClick={handlePrevPokemon}>Previous Pokemon</button>
  );
}
