/* eslint-disable no-unused-vars */
const { ProductModel } = require('../models/productModel');
const { CartModel } = require('../models/cartModel');

const getIndex = (req, res) => {
  ProductModel.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    });
  }).catch((err) => console.log(err));
};

const getProducts = (req, res) => {
  ProductModel.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Product List',
      path: '/products',
    });
  }).catch((err) => console.log(err));
};

const getProduct = (req, res) => {
  const prodId = req.params.productId;

  // ProductModel.findAll({ where: { id: prodId } }).then((products) => {
  //   res.render(
  //     'shop/product-detail',
  //     {
  //       docTitle: 'product detail',
  //       path: '/products',
  //       product: products[0]
  //     });
  // }).catch((err) => console.log(err));

  ProductModel.findByPk(prodId).then((product) => {
    res.render(
      'shop/product-detail',
      {
        docTitle: 'product detail',
        path: '/products',
        product: product
      });
  }).catch((err) => console.log(err));
};

const getCart = (req, res) => {
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts()
        .then((products) => {
          res.render('shop/cart', {
            docTitle: 'cart',
            path: '/cart',
            products: products
          });
        });
    })
    .catch(err => console.log(err));
};

const getPostCart = (req, res) => {
  const prodId = req.body.productId;

  ProductModel.findById(prodId).then(([queryResult, fieldData]) => {
    const product = queryResult[0];
    CartModel.addProduct(prodId, product.price);
  }).catch((err) => console.log(err));

  res.redirect('/cart');
};

const getOrder = (req, res) => {
  res.render('shop/order', { docTitle: 'order', path: '/order' });
};

const getCheckout = (req, res) => {
  res.render('shop/checkout', { docTitle: 'checkout', path: '/checkout' });
};

const deleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (prod) => {
    CartModel.deleteProduct(prodId, prod.price);
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
