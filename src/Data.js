class Data {
  constructor(title, description) {
    this.id = Date.now().toString(16);
    this.title = title;
    this.description = description;
  }
}