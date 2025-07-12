import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jsend from "jsend";
import User from "../models/user.model";
import { generateToken } from "../libs/utils";
import cloudinary from "../libs/cloudinary";
import { AnyTxtRecord } from "dns";

export const signup = async(req: Request, res: Response)=>{
    const {fullName, email, password, profilePic} = req.body;
    try {
        if(password.length < 6){
            throw new Error("Your password should be at least 6 character");
        }
        const user = await User.findOne({email});
        if(user)
            throw new Error("Email is already exists");
        const hashedPassword =  await bcrypt.hash(password, 10);
        const newUser = new User ({
            fullName,
            email,
            password: hashedPassword, 
            profilePic
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json(jsend.success("signup successfully"));
        }else{
            res.status(400).json(newUser);
        }
    }catch (error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json(jsend.error(errorMessage))
    }
    console.log("signup");
}


export const login = async(req: Request, res: Response): Promise<void>=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).select("+password");
        
        if(!user){
            res.status(404).json(jsend.error("Email not found"));
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json(jsend.error("Password is incorrect"));
            return;
        }
        generateToken(user._id, res);
        res.status(200).json(user);
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json(jsend.error(errorMessage))
    }
}

export const logout = (req: Request, res: Response)=>{
    try{
    res.clearCookie("token");
    res.status(200).json(jsend.success("logout successfully"));
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json(jsend.error(errorMessage))
    }
}

export const updateProfile = async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
    try {
        const { profilePic } = req.body;
        if (!req.user) {
            res.status(401).json(jsend.error("Unauthorized: User not found"));
        }
        const userId = req.user?.id;

        
        if (!profilePic) {
            res.status(400).json(jsend.error("Profile picture is required"));
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json(jsend.error(errorMessage));
    }
}
// export const checkAuth = async(req: RequestHandler, res: Response) => {
//     try {
//         if (!req) {
//             return res.status(401).json(jsend.error("Unauthorized: User not found"));
//         }
//         res.status(200).json(req);
//     }
//     catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//         res.status(400).json(jsend.error(errorMessage));
//     }
// }