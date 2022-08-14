class ServerError extends Error {
  constructor(message = 'Server error') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = ServerError;
