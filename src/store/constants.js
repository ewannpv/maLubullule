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
  new Category('custom', 'Custom'),
];

// name, abv, volume, categories.
export const alcohols = [
  new Alcohol('86 Original', 8.6, 0.5, ['classic', 'beer']),
  new Alcohol('86 Extreme', 10.5, 0.5, ['beer']),
  new Alcohol('86 Gold', 6.5, 0.5, ['beer']),
  new Alcohol('86 Red', 7.9, 0.5, ['beer']),
  new Alcohol('Captain Morgan', 35, 0.75, ['classic', 'rum', 'darkRum']),
  new Alcohol('Desperados', 5.9, 0.33, ['beer']),
  new Alcohol('Ricard', 45, 0.70, ['classic', 'digestif']),
  new Alcohol('Aperol', 15, 1, ['digestif']),
  new Alcohol('Old Nick', 40, 0.7, ['rum', 'whiteRum', 'classic']),
  new Alcohol('Bianco Martini', 15, 1.5, ['martini']),
  new Alcohol('Absolut Vodka', 40, 1, ['vodka']),
  new Alcohol('Bombay dry gin', 37.5, 0.7, ['gin']),
  new Alcohol('Ballantine\'s', 40, 0.7, ['wisky']),
  new Alcohol('Charette', 49, 1, ['rum', 'whiteRum', 'classic']),
  new Alcohol('Cointreau', 40, 0.7, ['triplesec', 'digestif']),
  new Alcohol('Grey Goose', 40, 1.75, ['vodka']),
];
