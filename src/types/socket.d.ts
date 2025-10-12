import "socket.io";

declare module "socket.io" {
    interface Socket {
        onlineUsers: Record<string, string>;
    }
}
