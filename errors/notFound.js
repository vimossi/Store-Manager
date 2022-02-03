function NotFoundError() {
  this.message = 'Product not found';
  this.code = 404;
}

module.exports = NotFoundError;
