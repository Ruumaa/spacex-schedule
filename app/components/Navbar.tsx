import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ToogleMode';

function Navbar() {
  return (
    <header className="mb-8 border-b py-3 bg-gray-100 dark:bg-gray-900 ">
      <div className="flex items-center justify-between  max-w-2xl px-4 sm:px-6 lg:max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Rocket className="w-10 h-10 ml-2 -rotate-45" />
          <h1 className="text-2xl md:text-4xl font-bold font-mono ">SpaceX</h1>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
