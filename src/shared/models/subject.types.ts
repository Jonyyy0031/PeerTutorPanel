import { BaseEntity } from "./api.types";

type Status = 'active' | 'inactive';

export interface Subject extends BaseEntity {
    name: string;
    department: string;
    status: Status;
}
