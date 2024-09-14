const mongoose = require('mongoose');

// connect to MongoDB
const connectDB = async () => {
    try {

        mongoose.set('strictQuery',false);
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connection: ${connection.connection.host}`);
        
    } catch (error) {
        console.log('Error connecting to MongoDB ' + error.message);
        process.exit(1);
    }
}

module.exports = connectDB;