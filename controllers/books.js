// controllers/books.js
// This file handles all Book actions in the database.

const { ObjectId } = require('mongodb');
const db = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const result = await db.getDb().collection('books').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting books' });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid book id');
    }

    const bookId = new ObjectId(req.params.id);
    const result = await db.getDb().collection('books').findOne({ _id: bookId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting book' });
  }
};

const createBook = async (req, res) => {
  const book = req.body;

  try {
    const result = await db.getDb().collection('books').insertOne(book);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid book id');
  }

  const bookId = new ObjectId(req.params.id);
  const book = req.body;

  try {
    const result = await db.getDb().collection('books').replaceOne({ _id: bookId }, book);

    if (result.modifiedCount > 0) return res.status(204).send();
    res.status(404).json('Book not found');
  } catch (err) {
    res.status(500).json({ message: 'Error updating book' });
  }
};

const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid book id');
  }

  const bookId = new ObjectId(req.params.id);

  try {
    const result = await db.getDb().collection('books').deleteOne({ _id: bookId });

    if (result.deletedCount > 0) return res.status(204).send();
    res.status(404).json('Book not found');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};
