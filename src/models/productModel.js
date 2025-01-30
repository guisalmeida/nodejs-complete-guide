const path = require('path');
const fs = require('fs');

const Cart = require('./cartModel');

const productsPath = path.join(path.dirname(require.main.filename), 'src', 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) return callback([]);

    return callback(JSON.parse(fileContent));
  });
};

class Product {
  constructor({ productId = null, title, imageUrl, price, description }) {
    this.id = productId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProdIndex = products.findIndex((prod) => prod.id === this.id);
        products[existingProdIndex] = this;
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  };

  static deleteById(id) {
    getProductsFromFile((products) => {
      const removedProd = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, removedProd.price);
        }
      });
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  };

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);

      callback(product);
    });
  }
}

module.exports = Product;
