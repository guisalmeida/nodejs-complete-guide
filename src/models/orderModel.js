const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
});

const OrderModel = model('order', orderSchema);

module.exports = { OrderModel };
