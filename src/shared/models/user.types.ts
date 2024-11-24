import { BaseEntity } from "./api.types";

type role = 'superAdmin' | 'admin';

export interface User extends BaseEntity {
    name: string;
    email: string;
    password: string;
    roleName?: role;
    rol_id?: number;
}

export interface Role {
    id: number;
    roleName: string;
}