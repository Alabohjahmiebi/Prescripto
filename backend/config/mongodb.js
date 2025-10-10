import mongoose from "mongoose";

const connectDB = async () => {


    // const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

// mongoose.connect(MONGODB_URL)
//     .then(()=> console.log("MongoDB Connection Verified"))
//     .catch((err)=> console.log("MongoDB Connection Failed", err));
mongoose.connection.on('connected', () => console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)
}

export default connectDB;