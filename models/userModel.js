const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: String,
    addresses: [{ type: String }]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
