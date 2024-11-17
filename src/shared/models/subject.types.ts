import { BaseEntity } from "./api.types";

export interface Subject extends BaseEntity {
    name: string;
    department: string;
}