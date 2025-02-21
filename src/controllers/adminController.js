/* eslint-disable no-unused-vars */
const { ProductModel } = require('../models/productModel');

const getAdminProducts = (req, res) => {
  ProductModel.find()
    // .populate('userId') retrieve all the data from user
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        docTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    }).catch((err) => console.log(err));
};

const getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/add-product',
    editMode: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

const postAddProduct = (req, res) => {
  const userId = req.user._id;
  const newProduct = {
    ...req.body,
    userId
  }

  const product = new ProductModel(newProduct);

  product.save()
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

  ProductModel.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode: isEditMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn
    });
  }).catch((err) => console.log(err));
};

const postEditProduct = (req, res) => {
  ProductModel.findById(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log('UPDATED PRODUCT', result);
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
}

const deleteProduct = (req, res) => {
  const prodId = req.body.productId;

  ProductModel.findByIdAndDelete(prodId)
    .then(() => {
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
