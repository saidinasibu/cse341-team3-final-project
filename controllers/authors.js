const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('authors')
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
      res.status(400).json('Must use a valid author id to find an author.');
      return;
    }
    const authorId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('authors')
      .find({ _id: authorId })
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

const createAuthor = async (req, res) => {
  const author = {
    name: req.body.name,
    birthYear: req.body.birthYear,
    nationality: req.body.nationality,
    awards: req.body.awards,
    numBooksWritten: req.body.numBooksWritten
  };
  try {
    const response = await mongodb.getDb().db().collection('authors').insertOne(author);
    //error handling
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateAuthor = async (req, res) => {
    //data validation for id param
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid author id to update an author.');
    return;
  }
  const authorId = new ObjectId(req.params.id);
  const author = {
    name: req.body.name,
    birthYear: req.body.birthYear,
    nationality: req.body.nationality,
    awards: req.body.awards,
    numBooksWritten: req.body.numBooksWritten
  };
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .replaceOne({ _id: authorId }, author);
      //error handling
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteAuthor = async (req, res) => {
    //data validation for id param
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid author id to delete an author.');
    return;
  }
  const authorId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('authors').deleteOne({ _id: authorId });
    //error handling
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};