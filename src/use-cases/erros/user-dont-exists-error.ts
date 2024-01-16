export class UserDontExistsError extends Error {
  constructor() {
    super('User dont exists')
  }
}
