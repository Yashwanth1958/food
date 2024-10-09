const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', orderRoutes);

//.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
//});
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();


app.post("/hi",(req,res)=>{
    const na=req.body.name;
    res.json({"name":'yashwanth ' + na})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
