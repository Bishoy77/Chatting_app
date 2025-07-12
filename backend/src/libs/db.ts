import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config();
export const connectDB = async()=>{
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        const connect = await mongoose.connect(mongoUri);
        console.log("connected to database"+mongoUri)
    }catch(err){
        console.log("DB connection error: " + err);
    }
}