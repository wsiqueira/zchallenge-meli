import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';

type LoadingType = React.ReactNode & {
  variant?: 'default' | 'lightsaber' | 'spaceship';
};

export function Loading({ variant = 'default' }): LoadingType {
  switch (variant) {
    case 'lightsaber':
      return <div className="lightsaber" />;
    case 'spaceship':
      return (
        <Image
          src="/img_x-wing.gif"
          alt="X-wing"
          width={800}
          height={600}
          priority
          unoptimized
        />
      );
    default:
      return <LoaderCircle className="animate-spin" />;
  }
}
