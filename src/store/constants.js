import Alcohol from "./alcohol"
import Category from "./category"

// name, displayName.
export const categories = [
  new Category('classic','classique'),
  new Category('beer','bière'),
  new Category('darkRum','Rhum brun'),
]

// name, abv, volume.
export const alcohols = [
  new Alcohol('86 Original', 8.6, 0.5,['classic','beer']),
  new Alcohol('86 Extreme', 10.5, 0.5,['beer']),
  new Alcohol('86 Gold', 6.5, 0.5, ['beer']),
  new Alcohol('86 Red', 7.9, 0.5,  ['beer']),
  new Alcohol('Captain Morgan', 35, 0.75,  ['classic','darkRum']),
]
