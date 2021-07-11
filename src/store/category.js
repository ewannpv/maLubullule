export default class Category {
  constructor(name, displayName) {
    this.name = name
    this.displayName = displayName
    this.id = randomId()
  }
}


let randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}