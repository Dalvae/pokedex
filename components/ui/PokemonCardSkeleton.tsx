export function PokemonCardSkeleton() {
  return (
    <li className="group rounded-lg overflow-hidden transition-transform ease-in-out duration-200 hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="block rounded-lg m-3 p-5 transition-transform ease-in-out duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-100">
        <div className="animate-pulse flex flex-col">
          <div className="bg-gray-200 rounded-md aspect-square mb-4"></div>{" "}
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>{" "}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>{" "}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
