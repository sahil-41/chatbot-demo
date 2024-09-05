'use server'
import { connectMongoDB } from "@/config/database";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server"
import { json } from "stream/consumers";
import { stringify } from 'querystring';
connectMongoDB();
export const saveCurrentUser = async ()=>{
    try{
        const user = await currentUser();
        const exsistingUser = await UserModel.findOne({email:user?.emailAddresses[0].emailAddress})
        if(exsistingUser){
        return {
            sucess: true,
            data: JSON.parse(JSON.stringify(exsistingUser))
        }}

        const userobj = {
            name: user?.firstName!+user?.lastName,
            email:user?.emailAddresses[0].emailAddress,
          
        };
        const newUser = await UserModel.create(userobj)
        return {
            sucess: true,
            data: JSON.parse(JSON.stringify(newUser))
        }
    }catch(error){
        return {
            success: false,
        }
    }
}