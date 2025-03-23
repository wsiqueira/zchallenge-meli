import Link from 'next/link';
import Image from 'next/image';

import { Globe, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="p-4 bg-neutral-100">
      <div className="container flex flex-col items-center mx-auto">
        <Link href="/" className="max-w-[96px] max-h-[46px] overflow-hidden">
          <Image
            src="/logo_star-wars.png"
            width={48}
            height={48}
            alt="Star Wars"
            style={{ objectPosition: '0 calc(-48px / 4)' }}
          />
        </Link>

        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link href="https://swapi.dev/" target="_blank">
              <span className="sr-only">swapi.dev</span>
              <Globe />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/Juriy/swapi" target="_blank">
              <span className="sr-only">Juriy/swapi - Github</span>
              <Github />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/juriy" target="_blank">
              <span className="sr-only">Juriy - Twitter</span>
              <Twitter />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
