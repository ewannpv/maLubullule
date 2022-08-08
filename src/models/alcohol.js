// Returns a random id.
const randomId = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

export default class Alcohol {
  constructor(name, abv, volume, categories) {
    // String that stores the name and displayed name of the alcohol.
    this.name = name;
    // Int that stores the abv of the alcohol in %.
    this.abv = abv;
    // Flat that stores the volume of one dose of the alcohol.
    this.volume = volume;
    // [Category] that stores all the categories of the alcohol.
    this.categories = categories;
    // String that stores a random id.
    this.id = randomId();
  }
}

// Generates a list of custom alcohols from 1 to 100 abv.
const getCustomAlcohols = () => {
  const alcohols = [];
  for (let index = 1; index <= 100; index += 1) {
    const name = `Brevage à ${index.toString()}°`;
    alcohols.push(new Alcohol(name, index, 5, ['custom']));
  }
  return alcohols;
};

// Currently disabled.
export const customAlcohols = getCustomAlcohols();
