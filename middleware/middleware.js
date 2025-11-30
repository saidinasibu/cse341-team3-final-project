// middleware/middleware.js
// This file holds the validation rules for each collection using express-validator.

const { body, validationResult } = require('express-validator');

// This function checks if validation passed or failed
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  next();
};

// Validation rules for Books
const saveBook = [
  body('title').notEmpty().withMessage('title is required'),
  body('author').notEmpty().withMessage('author is required'),
  body('genre').notEmpty().withMessage('genre is required'),
  body('publishedYear').isInt().withMessage('publishedYear must be a number'),
  body('language').notEmpty().withMessage('language is required'),
  body('pages').isInt().withMessage('pages must be a number'),
  body('available').isBoolean().withMessage('available must be true or false'),
  body('summary').optional().isString(),
  handleValidation
];

// Validation rules for Authors
const saveAuthor = [
  body('name').notEmpty().withMessage('name is required'),
  body('birthYear').isInt().withMessage('birthYear must be a number'),
  body('nationality').notEmpty().withMessage('nationality is required'),
  body('awards').optional().isArray().withMessage('awards must be an array'),
  body('numBooksWritten').isInt().withMessage('numBooksWritten must be a number'),
  handleValidation
];

// Validation rules for Stores
const saveStore = [
  body('location').notEmpty().withMessage('location is required'),
  body('owner').notEmpty().withMessage('owner is required'),
  body('employees').isInt().withMessage('employees must be a number'),
  handleValidation
];

// Validation rules for Customers
const saveCustomer = [
  body('fullName').notEmpty().withMessage('fullName is required'),
  body('address').notEmpty().withMessage('address is required'),
  body('email').isEmail().withMessage('email must be valid'),
  body('phoneNumber').notEmpty().withMessage('phoneNumber is required'),
  handleValidation
];

module.exports = {
  saveBook,
  saveAuthor,
  saveStore,
  saveCustomer
};
