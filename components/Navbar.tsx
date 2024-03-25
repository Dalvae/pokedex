import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="bg-[#FFCE31] flex justify-center items-center p-2.5 fixed top-0 left-0 right-0 border-b-4 border-blue-600 z-50">
      <Link href="/">
          <Image src="/pokedexlogo.png" alt="Pokedex Logo" width={100} height={50} />
      </Link>
    </nav>
  );
};

export default Navbar;
