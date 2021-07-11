export default class Alcohol {
  constructor(name, abv, volume,categories) {
    this.name = name;
    this.abv = abv
    this.volume = volume
    this.categories = categories
    this.id = randomId()
  }
}


let randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}