import mongoose from "mongoose";

async function ConnectDB() {

    try {

        await mongoose.connect(process.env.DATABASE_URI||"");
        console.log('db connected');
    } 
    catch (e) {

        console.error("error", e);
        process.exit(1); 
    }
}

export default ConnectDB;

export const JWT_SECRET = process.env.JWT_SECRET;