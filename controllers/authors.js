// controllers/authors.js
// This file handles all Author actions.

const { ObjectId } = require('mongodb');
const db = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const result = await db.getDb().collection('authors').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting authors' });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid author id');
    }

    const authorId = new ObjectId(req.params.id);
    const result = await db.getDb().collection('authors').findOne({ _id: authorId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting author' });
  }
};

const createAuthor = async (req, res) => {
  const author = req.body;

  try {
    const result = await db.getDb().collection('authors').insertOne(author);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating author' });
  }
};

const updateAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid author id');
  }

  const authorId = new ObjectId(req.params.id);
  const author = req.body;

  try {
    const result = await db.getDb().collection('authors').replaceOne({ _id: authorId }, author);

    if (result.modifiedCount > 0) return res.status(204).send();
    res.status(404).json('Author not found');
  } catch (err) {
    res.status(500).json({ message: 'Error updating author' });
  }
};

const deleteAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid author id');
  }

  const authorId = new ObjectId(req.params.id);

  try {
    const result = await db.getDb().collection('authors').deleteOne({ _id: authorId });

    if (result.deletedCount > 0) return res.status(204).send();
    res.status(404).json('Author not found');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting author' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
