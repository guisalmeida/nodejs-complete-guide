const path = require('path');
const fs = require('fs');

const cartPath = path.join(path.dirname(require.main.filename), 'src', 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      const cart = !err ? JSON.parse(fileContent) : { products: [], totalPrice: 0 };

      const existingProdIndex = cart.products.findIndex((prod) => prod.id === id);

      if (existingProdIndex >= 0) {
        cart.products[existingProdIndex].qty += 1;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(cartPath, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(prodId, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) return;

      const updatedCart = JSON.parse(fileContent);
      const removedProd = updatedCart.products.find((prod) => prod.id === prodId);

      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== prodId);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * removedProd.qty;

      fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }
}

module.exports = Cart;
