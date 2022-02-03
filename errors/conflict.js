function ConflictError() {
  this.message = 'Product already exists';
  this.code = 409;
}

module.exports = ConflictError;
