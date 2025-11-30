const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('customers')
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
      res.status(400).json('Must use a valid customer id to find a customer.');
      return;
    }
    const customerId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('customers')
      .find({ _id: customerId })
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

const createCustomer = async (req, res) => {
    const customer = {
        fullName: req.body.fullName,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };
    try {
        const response = await mongodb.getDb().db().collection('customers').insertOne(customer);
        //error handling
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the customer.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateCustomer = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid customer id to update a customer.');
        return;
    }
    const customerId = new ObjectId(req.params.id);
    const customer = {
        fullName: req.body.fullName,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };
    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('customers')
            .replaceOne({ _id: customerId }, customer);
        //error handling
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the customer.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteCustomer = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid customer id to delete a customer.');
        return;
    }
    const customerId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('customers').deleteOne({ _id: customerId });
        //error handling
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the customer.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};