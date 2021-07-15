const randomId = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

export default class Category {
  constructor(name, displayedName) {
    this.name = name;
    this.displayedName = displayedName;
    this.id = randomId();
  }
}
