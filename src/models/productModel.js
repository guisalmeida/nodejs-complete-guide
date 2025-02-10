const { getDb } = require('../utils/database');

const ProductModel = ({ title, price, description, imageUrl }) => {
  const product = {
    title, price, description, imageUrl
  }

  return {
    save() {
      const db = getDb();
      return db.collection('products')
        .insertOne(product)
        .then((result) => {
          console.log("Product saved!", result)
        })
        .catch(err => console.log("Error:", err));
    }
  }
};

module.exports = { ProductModel };
