class InvalidCredentialsError extends Error {
  constructor(code = 401, message = "Invalid credentails") {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = InvalidCredentialsError;
