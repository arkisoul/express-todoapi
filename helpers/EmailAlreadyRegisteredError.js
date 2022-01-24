class EmailAlreadyRegisteredError extends Error {
  constructor(code = 400, message = 'Email already registered') {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = EmailAlreadyRegisteredError;
