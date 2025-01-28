const Product = require('../models/productModel');

const getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    });
  });
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Product List',
      path: '/products',
    });
  });
};

const getCart = (req, res) => {
  res.render('shop/cart', { docTitle: 'cart', path: '/cart' });
};

const getOrder = (req, res) => {
  res.render('shop/order', { docTitle: 'order', path: '/order' });
};

const getCheckout = (req, res) => {
  res.render('shop/checkout', { docTitle: 'checkout', path: '/checkout' });
};

const getProduct = (req, res) => {
  res.render('shop/product', { docTitle: 'product', path: '/product' });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body);
  product.save();
  res.redirect('/');
};

module.exports = {
  getIndex,
  postAddProduct,
  getProducts,
  getCart,
  getOrder,
  getCheckout,
  getProduct
};
