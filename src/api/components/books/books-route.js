const express = require('express');

const booksController = require('./books-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/books', route);

  // Get list of books
  route.get('/', booksController.getBooks);

  // Create a new book
  route.post('/', booksController.createBook);

  // Get book detail
  route.get('/:id', booksController.getBook);

  // Update book
  route.put('/:id', booksController.updateBook);

  // Delete book
  route.delete('/:id', booksController.deleteBook);
};
