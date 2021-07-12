import Alcohol from "./alcohol"
import Category from "./category"

// name, displayName.
export const categories = [
  new Category('classic', 'classique'),
  new Category('beer', 'bière'),
  new Category('rum', 'Rhum'),
  new Category('darkRum', 'Rhum brun'),
  new Category('whiteRum', 'Rhum blanc'),
  new Category('vodka', 'vodka'),
  new Category('wisky', 'wisky'),
  new Category('other', 'Autre'),
  new Category('digestif', 'digestif'),
  new Category('martini', 'martini'),
  new Category('gin', 'gin'),
  new Category('triplesec', 'triple sec'),

]

// name, abv, volume.
export const alcohols = [
  new Alcohol('86 Original', 8.6, 0.5, ['classic', 'beer']),
  new Alcohol('86 Extreme', 10.5, 0.5, ['beer']),
  new Alcohol('86 Gold', 6.5, 0.5, ['beer']),
  new Alcohol('86 Red', 7.9, 0.5, ['beer']),
  new Alcohol('Captain Morgan', 35, 0.75, ['classic', 'rum', 'darkRum']),
  new Alcohol('Desperados', 5.9, 0.33, ['beer']),
  new Alcohol('Ricard', 45, 0.70, ['classic', 'digestif']),
  new Alcohol('Aperol', 15, 1, ['digestif']),
  new Alcohol('Old Nick', 15, 0.7, ['rum', 'whiteRum', 'classic']),
  new Alcohol('Bianco Martini', 15, 1.5, ['martini']),
  new Alcohol('Bianco Martini', 15, 1.5, ['martini']),
  new Alcohol('Absolut Vodka', 40, 1, ['vodka']),
  new Alcohol('Bombay dry gin', 37.5, 0.7, ['gin']),
  new Alcohol('Ballantine\'s', 40, 0.7, ['wisky']),
  new Alcohol('Charette', 49, 1, ['rum','whiteRum','classic']),
  new Alcohol('Cointreau', 40, 0.7, ['triplesec','digestif']),
]
