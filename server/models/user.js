import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

export const User = mongoose.model("User",userSchema)