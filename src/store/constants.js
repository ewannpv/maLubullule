import Alcohol from './alcohol';
import Category from './category';

// name, displayName.
export const categories = [
  new Category('classic', 'Classique'),
  new Category('beer', 'Bière'),
  new Category('rum', 'Rhum'),
  new Category('darkRum', 'Rhum brun'),
  new Category('whiteRum', 'Rhum blanc'),
  new Category('vodka', 'Vodka'),
  new Category('wisky', 'Wisky'),
  new Category('digestif', 'Digestif'),
  new Category('martini', 'Martini'),
  new Category('gin', 'Gin'),
  new Category('triplesec', 'Triple sec'),
];

// name, abv, volume (cL), categories.
export const alcohols = [
  new Alcohol('86 Original', 8.6, 50, ['classic', 'beer']),
  new Alcohol('86 Extreme', 10.5, 50, ['beer']),
  new Alcohol('86 Gold', 6.5, 50, ['beer']),
  new Alcohol('86 Red', 7.9, 50, ['beer']),
  new Alcohol('Captain Morgan', 35, 75, ['classic', 'rum', 'darkRum']),
  new Alcohol('Desperados', 5.9, 33, ['beer']),
  new Alcohol('Ricard', 45, 70, ['classic', 'digestif']),
  new Alcohol('Aperol', 15, 10, ['digestif']),
  new Alcohol('Old Nick', 40, 70, ['rum', 'whiteRum', 'classic']),
  new Alcohol('Bianco Martini', 15, 150, ['martini']),
  new Alcohol('Absolut Vodka', 40, 100, ['vodka']),
  new Alcohol('Bombay dry gin', 37.5, 70, ['gin']),
  new Alcohol('Ballantine\'s', 40, 70, ['wisky']),
  new Alcohol('Charette', 49, 100, ['rum', 'whiteRum', 'classic']),
  new Alcohol('Cointreau', 40, 70, ['triplesec', 'digestif']),
  new Alcohol('Grey Goose', 40, 175, ['vodka']),
  new Alcohol('Heineken', 5, 33, ['beer', 'classic']),
  new Alcohol('Kronenbourg', 4.2, 25, ['beer']),
  new Alcohol('Leffe Blonde', 6.6, 33, ['beer', 'classic']),
  new Alcohol('Leffe Ruby', 5, 33, ['beer']),
  new Alcohol('Grimbergen', 6.7, 33, ['beer']),
];
