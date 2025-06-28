import { EventCallback } from "../helpers/event.helper";
import { Chat, FetchChatList, SendChat } from "./chat.types";
import { User, UserListPayload } from "./user.types";

// ? Event contract
export interface EventMap {
    "user:list": EventCallback;
    "chat:send": EventCallback;
    "chat:receive": EventCallback;
    "chat:list": EventCallback;
}

/**
 * Payload for the event's which are going to emit from client side
 */

export interface Payload {
    "user:list": UserListPayload;
    "chat:list": FetchChatList;
    "chat:send": SendChat;
    "chat:receive": Chat | TypedResponse["chat:send"];
}

export interface TypedResponse {
    "user:list": User[] | null;
    "chat:send": Chat | null;
    "chat:receive": any;
    "chat:list": Chat[] | null;
}

// // ? Event contract
// export interface EventMap {
//     "": EventCallback<"", "">;
//     "user:login": EventCallback<UserLoginPayload, User | null>;
//     "user:list": EventCallback<UserListPayload, User[]>;
//     "chat:new": EventCallback<ChatPayload, Chat>;
//     "chat:send": EventCallback<ChatPayload, Chat>;
//     "chat:receive": EventCallback<Chat, Chat>;
//     "chat:list": EventCallback<ChatListPayload, Chat[]>;
// }
