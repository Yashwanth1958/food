const Order = require('../models/orderModel').default;
const Restaurant = require('../models/restaurantModel');

const createOrder = async (req, res) => {
    try {
        const { restaurantId, items, deliveryAddress } = req.body;
        const restaurant = await Restaurant.findById(restaurantId);

        let totalCost = 0;
        items.forEach(item => {
            const menuItem = restaurant.menu.id(item.menuItemId);
            totalCost += menuItem.price * item.quantity;
        });

        const newOrder = new Order({
            userId: req.user.id,
            restaurantId,
            items,
            totalCost,
            deliveryAddress
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('items.menuItemId');
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrder, updateOrderStatus, listOrders };
