import jwt from "jsonwebtoken";
import { IUser } from "../types/user.type";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";



export const protectRoute  = async(req: Request, res: Response, next:NextFunction):Promise<void> => {
    const token = req.cookies.token;
    console.log(token)
    try {
        if(!token){
            res.status(401).json({ message: "Unauthorized access, please login" });
            return; 
        }
        console.log("k1")
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: string };
        console.log("k1")

        if(!decoded || !decoded.userId){
            res.status(401).json({ message: "Unauthorized access, please login" });
            return 
        }
        console.log("k1")

        const user = await User.findById(decoded.userId);
        console.log("k1")
        console.log(user?.id)   
        if(!user){
            res.status(404).json({ message: "User not found" });
            return
        }
        console.log("k1")

        req.user = { id: user?.id, username: user?.fullName }; // Attach user to request object
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
        return 
    }
}