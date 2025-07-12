import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: object, res: Response) => {
    const token = jwt.sign({userId}, process.env.SECRET_KEY as string,{ expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV !== "development" });


    return token;
}