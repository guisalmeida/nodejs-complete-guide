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

  getCart() {
    const productIds = this.cart.items.map((item) => item.productId);
    const db = getDb();

    return db.collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          return {
            ...prod,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === prod._id.toString();
            }).quantity
          }
        })
      })
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProdIndex = this.cart.items.findIndex((cartItem) => {
      return cartItem.productId.toString() === product._id.toString();
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

  addOrder() {
    const db = getDb();

    return this.getCart().then((cartProducts) => {
      const order = {
        items: cartProducts,
        user: {
          _id: this._id,
          name: this.name,
          email: this.email
        }
      };

      return db.collection('orders').insertOne(order);
    })
      .then(() => {
        this.cart = { items: [] }
        return db.collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: this.cart } }
          )
      })
      .catch(err => console.log(err));
  }

  getOrders() {
    const db = getDb();

    return db.collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  removeFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter((cartItem) => {
      return cartItem.productId.toString() !== prodId
    });
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
