import { EventCallback } from "../helpers/event.helper";
import { Chat, ChatPayload, ChatListPayload } from "./chat.types";
import { User, UserLoginPayload, UserListPayload } from "./user.types";

// ? Event contract
export interface EventMap {
    "": EventCallback<"", "">;
    "user:login": EventCallback<UserLoginPayload, User | null>;
    "user:list": EventCallback<UserListPayload, User[]>;
    "chat:new": EventCallback<ChatPayload, Chat>;
    "chat:send": EventCallback<ChatPayload, Chat>;
    "chat:receive": EventCallback<Chat, Chat>;
    "chat:list": EventCallback<ChatListPayload, Chat[]>;
}
