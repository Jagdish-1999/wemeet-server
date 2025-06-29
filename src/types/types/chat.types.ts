export interface Chat {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SendChatPayload {
    roomId?: string;
    image?: string;
    message: string;
    senderId: string;
    receiverId: string;
}

export interface ChatListPayload {
    senderId: string;
    receiverId: string;
}
