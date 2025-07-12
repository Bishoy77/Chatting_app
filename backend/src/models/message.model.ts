import mongoose from "mongoose";
import { IMessage } from "../types/message.type";

const messageSchema = new mongoose.Schema<IMessage>({
    senderId:{
        type: String,
        required: true,
    },
    recieverId: {
        type: String,
        required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.model("Message", messageSchema);