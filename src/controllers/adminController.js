/* eslint-disable no-unused-vars */
const Product = require('../models/productModel');

const getAdminProducts = (req, res) => {
  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        docTitle: 'Admin Products',
        path: '/admin/products',
      });
    }).catch((err) => console.log(err));
};

const getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/add-product',
    editMode: false
  });
};

const postAddProduct = (req, res) => {
  req.user.createProduct(req.body)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

const getEditProduct = (req, res) => {
  const isEditMode = req.query.edit === 'true' ? true : false;

  if (!isEditMode) {
    res.redirect('/');
  };

  const prodId = req.params.productId;

  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode: isEditMode,
      product: product
    });
  }).catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  Product.findByPk(req.body.productId).then((product) => {
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    return product.save();
  }).then((result) => {
    console.log('UPDATED PRODUCT', result);
    res.redirect('/admin/products');
  }).catch((err) => console.log(err));
}

const deleteProduct = (req, res) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId).then((product) => {
    return product.destroy();
  }).then(() => {
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
}

module.exports = {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  deleteProduct
};
