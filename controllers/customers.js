// controllers/customers.js
// This file handles all Customer actions.

const { ObjectId } = require('mongodb');
const db = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const result = await db.getDb().collection('customers').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting customers' });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid customer id');
    }

    const customerId = new ObjectId(req.params.id);
    const result = await db.getDb().collection('customers').findOne({ _id: customerId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting customer' });
  }
};

const createCustomer = async (req, res) => {
  const customer = req.body;

  try {
    const result = await db.getDb().collection('customers').insertOne(customer);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating customer' });
  }
};

const updateCustomer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid customer id');
  }

  const customerId = new ObjectId(req.params.id);
  const customer = req.body;

  try {
    const result = await db.getDb().collection('customers').replaceOne({ _id: customerId }, customer);

    if (result.modifiedCount > 0) return res.status(204).send();
    res.status(404).json('Customer not found');
  } catch (err) {
    res.status(500).json({ message: 'Error updating customer' });
  }
};

const deleteCustomer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid customer id');
  }

  const customerId = new ObjectId(req.params.id);

  try {
    const result = await db.getDb().collection('customers').deleteOne({ _id: customerId });

    if (result.deletedCount > 0) return res.status(204).send();
    res.status(404).json('Customer not found');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
