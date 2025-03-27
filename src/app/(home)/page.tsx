import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
// import { Badge } from "@/components/ui/badge";
import { MoveRight, MoveLeft } from 'lucide-react';

export default function PageHome() {
  return (
    <main className="container grid place-content-center gap-8 mx-auto md:max-w-6xl">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex p-4 md:p-0 gap-4 flex-col">
          <div>{/* <Badge variant="outline">We&apos;re live!</Badge> */}</div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              The Star Wars API (SWAPI)
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              The Star Wars API, or &quot;swapi&quot; (Swah-pee) is the world&apos;s first
              quantified and programmatically-accessible data source for all the
              data from the Star Wars canon universe!
            </p>
          </div>
          <div className="flex flex-row justify-center md:justify-start gap-4">
            <Button
              size="lg"
              className="gap-4 transition-shadow delay-150 duration-200 ease-in-out hover:shadow-[0_0_6px_1px_rgba(0,0,255,0.75)]"
              variant="outline"
              asChild
            >
              <Link href="/characters">
                <MoveLeft className="w-4 h-4" /> Start here
              </Link>
            </Button>
            <Button
              size="lg"
              className="gap-4 transition-shadow delay-150 duration-200 ease-in-out hover:shadow-[0_0_6px_1px_rgba(255,0,0,0.75)]"
              asChild
            >
              <Link href="/characters">
                Start here <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-md aspect-square">
          <Image
            src="/anim_space-travel.webp"
            width={256}
            height={256}
            alt="Space"
            priority={true}
            unoptimized={true}
            className="w-full invert"
          />
        </div>
      </div>
    </main>
  );
}
