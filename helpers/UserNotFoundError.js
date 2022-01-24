class UserNotFoundError extends Error {
  constructor(code = 404, message = 'User not found') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = UserNotFoundError;
