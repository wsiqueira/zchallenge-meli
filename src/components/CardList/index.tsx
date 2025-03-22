import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';

import type { Film, People, Planet, Species, Starship } from 'ts-swapi';

type CardItemType = Film & People & Planet & Species & Starship & {};

type CardListType = {
  data: CardItemType[];
};

export function CardList({ data }: CardListType) {
  console.log('data', data);

  return (
    <div className="grid grid-cols-3 gap-3">
      {data?.map((item: CardItemType, index: number) => {
        return (
          <Card key={`card-${index}`}>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>{item?.name} <Star /></CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>

            <CardContent>CardContent</CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline">Load more</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
