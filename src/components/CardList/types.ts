import type { Film, People, Planet, Species, Starship } from 'ts-swapi';

export type CardItemType = Film & People & Planet & Species & Starship & {
  properties?: Film & People & Planet & Species & Starship;
}

export type CardListType = {
  data: CardItemType[];
};
