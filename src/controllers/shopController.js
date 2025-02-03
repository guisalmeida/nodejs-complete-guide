/* eslint-disable no-unused-vars */
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

const getIndex = (req, res) => {
  Product.fetchAll().then(([queryResult, fieldData]) => {
    res.render('shop/index', {
      prods: queryResult,
      docTitle: 'Shop',
      path: '/',
    });
  }).catch((err) => console.log(err));

};

const getProducts = (req, res) => {
  Product.fetchAll().then(([queryResult, fieldData]) => {
    res.render('shop/product-list', {
      prods: queryResult,
      docTitle: 'Product List',
      path: '/products',
    });
  }).catch((err) => console.log(err));
};

const getCart = (req, res) => {
  const cartProducts = [];

  Cart.getCart((cart) => {
    Product.fetchAll().then(([queryResult, fieldData]) => {
      for (const product of queryResult) {
        const cartProdData = cart.products.find((cartProd) => cartProd.id === product.id);
        if (cartProdData) {
          cartProducts.push({ ProdData: product, qty: cartProdData.qty });
        }
        res.render('shop/cart', {
          docTitle: 'cart',
          path: '/cart',
          products: cartProducts
        });
      }
    }).catch((err) => console.log(err));
  });
};

const getPostCart = (req, res) => {
  const prodId = req.body.productId;

  Product.findById(prodId).then(([queryResult, fieldData]) => {
    const product = queryResult[0];
    Cart.addProduct(prodId, product.price);
  }).catch((err) => console.log(err));

  res.redirect('/cart');
};

const getOrder = (req, res) => {
  res.render('shop/order', { docTitle: 'order', path: '/order' });
};

const getCheckout = (req, res) => {
  res.render('shop/checkout', { docTitle: 'checkout', path: '/checkout' });
};

const getProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId).then(([queryResult, fieldData]) => {
    console.log(queryResult);

    res.render(
      'shop/product-detail',
      {
        docTitle: 'product detail',
        path: '/products',
        product: queryResult[0]
      });
  }).catch((err) => console.log(err));
};

const deleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (prod) => {
    Cart.deleteProduct(prodId, prod.price);
  });

  res.redirect('/cart');
}


module.exports = {
  getIndex,
  getProducts,
  getCart,
  getPostCart,
  getOrder,
  getCheckout,
  getProduct,
  deleteCartItem
};
