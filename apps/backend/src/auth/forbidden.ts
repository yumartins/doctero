class Forbidden extends Error {
  constructor() {
    super('Forbidden');

    this.name = 'Forbidden';
  }
}

export default Forbidden;
