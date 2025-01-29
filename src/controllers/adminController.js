const Product = require('../models/productModel');

const getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/add-product'
  });
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

const postAddProduct = (req, res) => {
  const product = new Product(req.body);
  product.save();
  res.redirect('/');
};

const getEditProduct = (req, res) => {
  const isEditMode = req.query.edit === 'true' ? true : false;

  if (!isEditMode) {
    res.redirect('/');
  };

  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/edit-product',
    editMode: isEditMode
  });
};

module.exports = {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
  getEditProduct
};
