/* eslint-disable no-unused-vars */
const Product = require('../models/productModel');

const getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/add-product',
    editMode: false
  });
};

const getAdminProducts = (req, res) => {
  Product.fetchAll().then(([queryResult, fieldData]) => {
    res.render('admin/products', {
      prods: queryResult,
      docTitle: 'Admin Products',
      path: '/admin/products',
    });
  }).catch((err) => console.log(err));
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body);
  product.save().then(() => {
    res.redirect('/');
  }).catch((err) => console.log(err));
};

const getEditProduct = (req, res) => {
  const isEditMode = req.query.edit === 'true' ? true : false;

  if (!isEditMode) {
    res.redirect('/');
  };

  const prodId = req.params.productId;

  Product.findById(prodId).then(([queryResult, fieldData]) => {
    if (!queryResult.length) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode: isEditMode,
      product: queryResult[0]
    });
  }).catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  const updatedProduct = new Product(req.body);
  updatedProduct.save();
  res.redirect('/admin/products');
}

const deleteProduct = (req, res) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

module.exports = {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  deleteProduct
};
