const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        const uri = process.env.DB_URL;
        await mongoose.connect(uri);
        console.log("Database connected");
        
        
    } catch (err) {
        console.log(err);
        
    }
}

module.exports = connectDB;