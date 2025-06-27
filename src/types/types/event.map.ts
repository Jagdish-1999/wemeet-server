import { EventCallback } from "../helpers/event.helper";
import { ChatFromServer, ChatFromClient } from "./chat.types";
import { User } from "./user.types";

// ? Event contract
export interface EventMap {
    "user:login": EventCallback<{ token: string; id: string }, User>;
    "user:list": EventCallback<{ token: string; id: string }, User[]>;
    "chat:send": EventCallback<ChatFromClient, ChatFromServer>;
    "chat:receive": EventCallback<ChatFromServer, ChatFromServer>;
    "chat:list": EventCallback<
        { senderId: string; receiverId: string },
        ChatFromServer[]
    >;
}
