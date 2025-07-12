import { NextFunction, Request, Response } from 'express';
import { IMessage } from '../types/message.type';
import messageModel from '../models/message.model';
import { join } from 'path';
export const sendMessage = async(req: any, res:Response, next: NextFunction) => {
    try {
        const { recieverId, content} = req.body;
        const sender = req.user?.id;
        const roomId = join(recieverId,sender)
        console.log(roomId);


        if (!sender){
            res.status(400).json({message:"Missing content or roomId"});

        }
        if(!content || !roomId){
            res.status(400).json({message:"Missing content or roomId"});
        }
        const newMessage: IMessage = {
            senderId : sender,
            recieverId,
            content,
            roomId ,
            status: "sent"
        }
        const saveMassage = await messageModel.create(newMessage);
        res.status(200).json(saveMassage)
    } catch (error){
        console.error('Error sending message:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getMessage = async(req: Request, res: Response)=>{
    try{
        
        const myId = req.user?.id
        const {id: userToChatId} = req.params
        
        const messages = await messageModel.find({
            senderId: myId,
            
        }).populate("senderId", "content")
        console.log(messages[0].content);
        res.status(200).json({messages})
    }catch(error){
        console.log(error)
        res.status(500).json({
            error
        })
    }
}