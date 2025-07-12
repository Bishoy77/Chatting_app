export interface IMessage {
    
    senderId: string;
    recieverId: string;
    roomId: string;
    content: string;
    status: "sent" | "delivered" | "seen";
    createdAt?: Date;
}