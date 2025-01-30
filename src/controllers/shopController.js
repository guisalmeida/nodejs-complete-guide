const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

const getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    });
  });
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Product List',
      path: '/products',
    });
  });
};

const getCart = (req, res) => {
  const cartProducts = [];

  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      for (const product of products) {
        const cartProdData = cart.products.find((cartProd) => cartProd.id === product.id);
        if (cartProdData) {
          cartProducts.push({ ProdData: product, qty: cartProdData.qty });
        }
        res.render('shop/cart', {
          docTitle: 'cart',
          path: '/cart',
          products: cartProducts
        });
      }
    });

  });
};

const getPostCart = (req, res) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect('/cart');
};

const getOrder = (req, res) => {
  res.render('shop/order', { docTitle: 'order', path: '/order' });
};

const getCheckout = (req, res) => {
  res.render('shop/checkout', { docTitle: 'checkout', path: '/checkout' });
};

const getProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', { docTitle: 'product detail', path: '/products', product: product });
  });
};

const deleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (prod) => {
    Cart.deleteProduct(prodId, prod.price);
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
