const Product = require('../models/productModel');

const getAddProduct = (req, res) => {
  res.render('admin/add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
};

const getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

module.exports = {
  getAddProduct,
  getAdminProducts
};
