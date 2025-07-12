import mongoose from "mongoose";
import { IUser } from "../types/user.type";
const userSchema = new mongoose.Schema<IUser>(
    {
        fullName:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            require: true,
            minlength: 6,
            select: false
        },
        profilePic:{
            type: String,
            default:"",
        },
    },
    {timestamps:true}
);
const User = mongoose.model("User", userSchema);
export default User;