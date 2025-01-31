/* eslint-disable no-unused-vars */
const db = require('../utils/database');

class Product {
  constructor({ productId = null, title, imageUrl, price, description }) {
    this.id = productId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?);',
      [
        this.title,
        this.price,
        this.imageUrl,
        this.description
      ]);
  };

  static fetchAll() {
    return db.execute('SELECT * FROM products;');
  };

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  };

  static deleteById(id) { };
}

module.exports = Product;
