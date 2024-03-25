interface TypePillsProps {
    types: string[];
    weaknesses?: string[];
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
    fairy: "bg-pink-200 text-black",
    bug: "bg-green-300 text-white",
    poison: "bg-purple-400 text-white",
    stone: "bg-brown-400 text-white",
    rock: "bg-yellow-800 text-white",
    flying: "bg-sky-400 text-white",
    ground: "bg-yellow-200 text-black",
  };
  
  export function TypePills({ types, weaknesses }: TypePillsProps) {
    return (
      <div className="flex gap-1">
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
        {weaknesses &&
          weaknesses.map((weakness) => (
            <span
              key={weakness}
              className={`inline-block text-center px-3 text-xs rounded-sm font-flexo-medium ${
                typeColors[weakness as keyof typeof typeColors] || "bg-gray-400"
              } w-[80px]`}
            >
              {typeof weakness === "string"
                ? `${weakness.charAt(0).toUpperCase() + weakness.slice(1)} x2`
                : "Unknown"}
            </span>
          ))}
      </div>
    );
  }