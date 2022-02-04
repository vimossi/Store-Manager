function NotFoundError(message) {
  this.message = message;
  this.code = 404;
}

module.exports = NotFoundError;
