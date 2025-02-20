const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

userSchema.methods = {
  addToCart(product) {
    const cartProdIndex = this.cart.items.findIndex((cartItem) => {
      return cartItem.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProdIndex >= 0) {
      newQuantity = this.cart.items[cartProdIndex].quantity + 1;
      updatedCartItems[cartProdIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: product._id, quantity: 1 });
    };

    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;

    return this.save()
  },

  // getCart() {
  //   const productIds = this.cart.items.map((item) => item.productId);

  //   return ProductModel.find({ _id: { $in: productIds } })
  //     .then((products) => {
  //       return products.map((prod) => {
  //         return {
  //           ...prod,
  //           quantity: this.cart.items.find((item) => {
  //             return item.productId.toString() === prod._id.toString();
  //           }).quantity
  //         }
  //       })
  //     })
  //     .catch(err => console.log(err));
  // },

  removeFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter((cartItem) => {
      return cartItem.productId.toString() !== prodId
    });
    this.cart.items = updatedCartItems;

    return this.save();
  },

}

const UserModel = model('user', userSchema);

module.exports = { UserModel };
