interface PokemonCardSkeletonProps {
  name: string;
  id: number;
}

export function PokemonCardSkeleton({ name, id }: PokemonCardSkeletonProps) {
  const formattedId = id.toString().padStart(4, "0");

  return (
    <li className="group rounded-lg overflow-hidden transition-transform ease-in-out duration-200 hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="block rounded-lg m-3 p-5">
        <div className="bg-gray-200 rounded-md aspect-square animate-pulse"></div>
        <span className="text-sm m-2 font-bold text-gray-400 font-flexo-bold mx-4">
          N.° {formattedId}
        </span>
        <h2 className="text-xl font-semibold text-gray-700 font-flexo-demi mt-3 mx-4">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <div className="flex gap-1 mx-4">
          <div className="h-3 w-16 bg-gray-200 rounded-sm animate-pulse"></div>
          <div className="h-3 w-16 bg-gray-200  rounded-sm animate-pulse"></div>
        </div>
      </div>
    </li>
  );
}
