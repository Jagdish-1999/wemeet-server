export interface Chat {
    _id: string;
    senderId: string;
    receiverId: string;
    //! @TODO - need to replace with text.
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SendChat {
    image?: string;
    //! @TODO - need to replace with text.
    message: string;
    senderId: string;
    receiverId: string;
}

export interface FetchChatList {
    senderId: string;
    receiverId: string;
}
