import Link from 'next/link';

import { Globe } from 'lucide-react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="p-4 bg-neutral-100">
      <div className="container mx-auto">
        <ul className='flex items-center justify-center gap-2'>
          <li>
            <Link href="https://swapi.dev/" className="link" target='_blank'>
              <span className='sr-only'>swapi.dev</span>
              <Globe />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/Juriy/swapi" className="link" target='_blank'>
              <span className='sr-only'>Juriy/swapi - Github</span>
              <Github />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
