const { getDb } = require('../utils/database');
const { ObjectId } = require('mongodb');

class UserModel {
  constructor(name, email, cart, userId) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = userId;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart(product) {
    const cartProdIndex = this.cart.items.findIndex((cartProd) => {
      return cartProd.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProdIndex >= 0) {
      newQuantity = this.cart.items[cartProdIndex].quantity + 1;
      updatedCartItems[cartProdIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: product._id, quantity: 1 });
    };


    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db.collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } })
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = { UserModel };
