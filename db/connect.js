// db/connect.js
// This file connects our project to MongoDB using the connection string in .env.

require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

// This function starts the connection to the database
const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized');
    return callback(null, _db);
  }

  const uri = process.env.MONGO_DB_URL;

  if (!uri) {
    console.log('MONGO_DB_URL is missing in the .env file');
    return callback('No connection string found');
  }

  // Connect to MongoDB
  MongoClient.connect(uri)
    .then((client) => {
      // We select the database that is in the connection string
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// This function gives access to the database after it is connected
const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
