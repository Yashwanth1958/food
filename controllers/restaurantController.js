const Restaurant = require('../models/restaurantModel');

const createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, { new: true });
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        restaurant.menu.push(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        const item = restaurant.menu.id(req.params.itemId);
        Object.assign(item, req.body);
        await restaurant.save();
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createRestaurant, updateRestaurant, addMenuItem, updateMenuItem };
