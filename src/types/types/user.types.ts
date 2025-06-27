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
