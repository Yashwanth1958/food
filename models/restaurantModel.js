const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    available: Boolean
});

const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    menu: [menuSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
