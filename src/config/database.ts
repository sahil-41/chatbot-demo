import mongoose from 'mongoose'

export const connectMongoDB = async ()=>{
    try{
        console.log(process.env.DATABASE_URL!)
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log("connected to mongoDB");

    }
    catch(error){
        console.log(error);
    }
};