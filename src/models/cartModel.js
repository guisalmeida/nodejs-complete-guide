const path = require('path');
const fs = require('fs');

const productsPath = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(productsPath, (err, fileContent) => {
      const cart = !err ? JSON.parse(fileContent) : { products: [], totalPrice: 0 };

      const existingProdIndex = cart.products.findIndex((prod) => prod.id === id);

      if (existingProdIndex >= 0) {
        cart.products[existingProdIndex].qty += 1;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(productsPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }
}

module.exports = Cart;
