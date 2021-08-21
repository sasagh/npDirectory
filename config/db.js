const mongoose = require('mongoose');

const connectDb = async () => {
    const connectionString = process.env.MONGO_URI;
    const connection = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDb;