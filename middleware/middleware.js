const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    genre: 'required|string',
    publishedYear: 'required|integer',
    language: 'required|string',
    pages: 'required|integer',
    available: 'required|boolean',
    summary: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveAuthor = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    birthYear: 'required|integer',
    nationality: 'required|string',
    awards: 'array',
    numBooksWritten: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveStore = (req, res, next) => {
  const validationRule = {
    location: 'required|string',
    owner: 'required|string',
    employees: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCustomer = (req, res, next) => {
  const validationRule = {
    fullName: 'required|string',
    address: 'required|string',
    email: 'required|email',
    phoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBook,
  saveAuthor,
  saveStore,
  saveCustomer
};