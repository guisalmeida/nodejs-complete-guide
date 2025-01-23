const Product = require('../models/productModel');

const getAddProduct = (req, res) => {
  res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

const getProducts = (req, res) => {
  res.render('shop', {
    prods: Product.fetchAll(),
    docTitle: 'Shop',
    path: '/',
  });
};


module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
};
