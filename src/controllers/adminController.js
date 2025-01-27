const getAddProduct = (req, res) => {
  res.render('admin/add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
};

const getAdminProducts = (req, res) => {
  res.render('admin/products', { docTitle: 'Admin Products', path: '/admin/products' });
};

module.exports = {
  getAddProduct,
  getAdminProducts
};
