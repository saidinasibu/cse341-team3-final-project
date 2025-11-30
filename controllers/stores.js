// controllers/stores.js
// This file handles all Store actions.

const { ObjectId } = require('mongodb');
const db = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const result = await db.getDb().collection('stores').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting stores' });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid store id');
    }

    const storeId = new ObjectId(req.params.id);
    const result = await db.getDb().collection('stores').findOne({ _id: storeId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error getting store' });
  }
};

const createStore = async (req, res) => {
  const store = req.body;

  try {
    const result = await db.getDb().collection('stores').insertOne(store);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating store' });
  }
};

const updateStore = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid store id');
  }

  const storeId = new ObjectId(req.params.id);
  const store = req.body;

  try {
    const result = await db.getDb().collection('stores').replaceOne({ _id: storeId }, store);

    if (result.modifiedCount > 0) return res.status(204).send();
    res.status(404).json('Store not found');
  } catch (err) {
    res.status(500).json({ message: 'Error updating store' });
  }
};

const deleteStore = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Invalid store id');
  }

  const storeId = new ObjectId(req.params.id);

  try {
    const result = await db.getDb().collection('stores').deleteOne({ _id: storeId });

    if (result.deletedCount > 0) return res.status(204).send();
    res.status(404).json('Store not found');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting store' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStore,
  updateStore,
  deleteStore
};
