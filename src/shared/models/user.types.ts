import { BaseEntity } from "./api.types";

type role = 'superAdmin' | 'admin';

export interface User extends BaseEntity {
    user_name: string;
    email: string;
    password: string;
    roleName?: role;
    role_id?: number;
}

export interface Role {
    id: number;
    roleName: string;
}