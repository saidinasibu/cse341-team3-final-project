const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('books')
      .find()
      .toArray((err, lists) => {
        //error handling
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  try {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to find a book.');
      return;
    }
    const bookId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('books')
      .find({ _id: bookId })
      .toArray((err, result) => {
        //error handling
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const createBook = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
        language: req.body.language,
        pages: req.body.pages,
        available: req.body.available,
        summary: req.body.summary
    };
    try {
        const response = await mongodb.getDb().db().collection('books').insertOne(book);
        //error handling
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the book.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateBook = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
        return;
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
        language: req.body.language,
        pages: req.body.pages,
        available: req.body.available,
        summary: req.body.summary
    };
    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('books')
            .replaceOne({ _id: bookId }, book);
        //error handling
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the book.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteBook = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
        return;
    }
    const bookId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId });
        //error handling
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the book.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};