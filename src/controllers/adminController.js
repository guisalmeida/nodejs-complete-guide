const Product = require('../models/productModel');

const getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit Product',
    path: '/admin/add-product',
    editMode: false
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

  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode: isEditMode,
      product: product
    });
  });
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
