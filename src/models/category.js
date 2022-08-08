// Returns a random id.
const randomId = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

export default class Category {
  constructor(name, displayedName) {
    // String that stores the name of the category.
    this.name = name;
    // String that stores the displayed name of the category.
    this.displayedName = displayedName;
    // String that stores a random id.
    this.id = randomId();
  }
}
