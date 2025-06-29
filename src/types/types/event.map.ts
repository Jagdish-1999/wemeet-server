import { Socket } from "socket.io";
import { Chat, ChatListPayload, SendChatPayload } from "./chat.types";
import {
    ClientToServerCallback,
    ServerToClientCallback,
} from "../../utils/callbacks";
import { User, UserListPayload } from "./user.types";

export interface ClientToServerEventMap {
    userList: ClientToServerCallback<UserListPayload, User[]>;
    chatList: ClientToServerCallback<ChatListPayload, Chat[]>;
    sendChat: ClientToServerCallback<SendChatPayload, Chat | null>;
    joinRoom: ClientToServerCallback<{ roomId: string }, boolean>;
}

export interface ServerToClientEventMap {
    chatReceived: ServerToClientCallback<Chat | null, boolean>;
    roomJoined: ServerToClientCallback<
        { roomId: string; userId: string },
        boolean
    >;
}
