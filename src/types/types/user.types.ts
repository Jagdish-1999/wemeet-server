export interface UserList {
    status: number;
    message: string;
    data: User[];
}

export interface User {
    _id: string;
    name: string;
    createdAt: string;
}

export interface UserLoginPayload {
    token: string;
    name?: string;
    id: string;
}

export interface UserListPayload {
    token: string;
    id: string;
}
