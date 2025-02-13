const { getDb } = require('../utils/database');
const { ObjectId } = require('mongodb');

class ProductModel {
  constructor({ title, price, description, imageUrl, productId, userId }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = productId ? new ObjectId(productId) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;

    if (this._id) {
      dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection('products').insertOne(this);
    }

    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log("error to save:", err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .findOne({ _id: new ObjectId(prodId) })
      .then(product => {
        console.log('pproduct', product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static delete(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new ObjectId(prodId) })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = { ProductModel };
