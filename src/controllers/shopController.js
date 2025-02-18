/* eslint-disable no-unused-vars */
const { ProductModel } = require('../models/productModel');
// const { CartModel } = require('../models/cartModel');

const getIndex = (req, res) => {
  ProductModel.fetchAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    });
  }).catch((err) => console.log(err));
};

const getProducts = (req, res) => {
  ProductModel.fetchAll().then((products) => {
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
  req.user.getCart()
    .then((cartProducts) => {
      res.render('shop/cart', {
        docTitle: 'cart',
        path: '/cart',
        products: cartProducts
      });
    })
    .catch(err => console.log(err));
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
  req.user.getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', {
        docTitle: 'orders',
        path: '/orders',
        orders: orders
      });
    })
    .catch((err) => console.log(err));
};

const postOrder = (req, res) => {
  let fetchedCart;
  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      req.user.createOrder()
        .then((order) => {
          order.addProducts(products.map((prod) => {
            prod.order_product = { quantity: prod.cart_product.quantity };
            return prod;
          }))
        })
        .catch(err => console.log(err))
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

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
  getProduct,
  deleteCartItem,
  postOrder
};
