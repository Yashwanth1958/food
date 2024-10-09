const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant.menu' },
        quantity: Number
    }],
    totalCost: Number,
    deliveryAddress: String,
    status: { type: String, enum: ['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'], default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
