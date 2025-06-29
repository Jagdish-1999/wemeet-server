export interface UserList {
    message: string;
    data: User[];
}

export interface User {
    _id: string;
    name: string;
    createdAt: string;
}

export interface UserListPayload {
    token: string;
    id: string;
}
