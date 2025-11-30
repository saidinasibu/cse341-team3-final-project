const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('stores')
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
      res.status(400).json('Must use a valid store id to find a store.');
      return;
    }
    const storeId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('stores')
      .find({ _id: storeId })
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

const createStore = async (req, res) => {
    const store = {
        location: req.body.location,
        owner: req.body.owner,
        employees: req.body.employees
    };
    try {
        const response = await mongodb.getDb().db().collection('stores').insertOne(store);
        //error handling
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the store.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateStore = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid store id to update a store.');
        return;
    }
    const storeId = new ObjectId(req.params.id);
    const store = {
        location: req.body.location,
        owner: req.body.owner,
        employees: req.body.employees
    };
    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('stores')
            .replaceOne({ _id: storeId }, store);
        //error handling
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the store.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteStore = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid store id to delete a store.');
        return;
    }
    const storeId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('stores').deleteOne({ _id: storeId });
        //error handling
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the store.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStore,
    updateStore,
    deleteStore
};