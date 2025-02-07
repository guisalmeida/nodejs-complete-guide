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
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart;
      return fetchedCart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cart_product.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return ProductModel.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));

};

const getOrder = (req, res) => {
  res.render('shop/order', { docTitle: 'order', path: '/order' });
};

const getCheckout = (req, res) => {
  res.render('shop/checkout', { docTitle: 'checkout', path: '/checkout' });
};

const deleteCartItem = (req, res) => {
  const prodId = req.body.productId;

  req.user.getCart()
    .then((cart) => cart.getProducts({ where: { id: prodId } }))
    .then((products) => {
      const product = products[0];
      return product.cart_product.destroy();
    }).then(() => {
      res.redirect('/cart');
    }).catch(err => console.log(err))
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
