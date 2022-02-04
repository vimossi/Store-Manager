function ConflictError(message) {
  this.message = message;
  this.code = 409;
}

module.exports = ConflictError;
