require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@cluster0.iij6l.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`;

const mongoClient = new MongoClient(uri);

let _db;

const mongoConnect = (callback) => {
  mongoClient.connect().then((client) => {
    console.log('Connected!');
    _db = client.db();
    callback();
  }).catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!'
}

module.exports = { mongoConnect, getDb };
