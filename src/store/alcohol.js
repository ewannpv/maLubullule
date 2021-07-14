const randomId = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

export default class Alcohol {
  constructor(name, abv, volume, categories) {
    this.name = name;
    this.abv = abv;
    this.volume = volume;
    this.categories = categories;
    this.id = randomId();
  }
}

export const customAlcohols = () => {
  const alcohols = [];
  for (let index = 1; index <= 100; index += 1) {
    const name = `Brevage ${index.toString()}°`;
    alcohols.push(new Alcohol(name, index, 5, 'custom'));
  }
};
