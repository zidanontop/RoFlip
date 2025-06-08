const mongoose = require('mongoose');
const { mongodb_uri } = require('./config.js');

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 