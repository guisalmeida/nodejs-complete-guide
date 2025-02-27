/* eslint-disable no-unused-vars */
const { OrderModel } = require('../models/orderModel');
const { ProductModel } = require('../models/productModel');
// const { CartModel } = require('../models/cartModel');

const getIndex = (req, res) => {
  ProductModel.find().then((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => console.log(err));
};

const getProducts = (req, res) => {
  ProductModel.find().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Product List',
      path: '/products'
    });
  }).catch((err) => console.log(err));
};

const getProduct = (req, res) => {
  const prodId = req.params.productId;

  ProductModel.findById(prodId).then((product) => {
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
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      res.render('shop/cart', {
        docTitle: 'cart',
        path: '/cart',
        products: user.cart.items
      });
    })
    .catch(err => console.log(err));

  // req.user.getCart()
  //   .then((cartProducts) => {
  //     res.render('shop/cart', {
  //       docTitle: 'cart',
  //       path: '/cart',
  //       products: cartProducts

  //     });
  //   })
  //   .catch(err => console.log(err));
};

const getPostCart = (req, res) => {
  const prodId = req.body.productId;

  ProductModel.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

const getOrder = (req, res) => {
  OrderModel.find({ 'user._id': req.user._id }).then((orders) => {
    res.render('shop/orders', {
      docTitle: 'orders',
      path: '/orders',
      orders: orders
    });
  }).catch((err) => console.log(err));
};

const postOrder = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          quantity: item.quantity, product: item.productId._doc
        }
      });

      const order = new OrderModel({
        products: products,
        user: {
          _id: user._id,
          email: user.email
        }
      });
      return order.save();

    }).then(() => {
      return req.user.clearCart();
    }).then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

const postDeleteCartItem = (req, res) => {
  const prodId = req.body.productId;

  req.user.removeFromCart(prodId)
    .then((result) => {
      console.log(result);
      res.redirect('/cart');
    }).catch(err => console.log(err));
}


module.exports = {
  getIndex,
  getProducts,
  getCart,
  getPostCart,
  getOrder,
  getProduct,
  postDeleteCartItem,
  postOrder
};
