export interface ChatFromServer {
    _id: string;
    senderId: string;
    receiverId: string;
    //! @TODO - need to replace with text.
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatFromClient {
    image?: string;
    //! @TODO - need to replace with text.
    message: string;
    senderId: string;
    receiverId: string;
}
