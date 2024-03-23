import React from "react";
import PokeballIcon from "@/public/icons/pokeball";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFCE31] flex justify-center items-center p-2.5 bottom-0 left-0 right-0 border-t-4 border-blue-500 z-50">
      <div className="flex justify-between items-center w-full max-w-5xl mx-[10%]">
        <div className="max-w-[100px]">
          <PokeballIcon />
        </div>
        <div className="font-flexo-demi">
          Created by{" "}
          <a
            href="https://github.com/Dalvae/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 hover:text-blue-800"
          >
            Dalvae
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
