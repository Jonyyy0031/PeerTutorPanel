import { BaseEntity } from "./api.types";

type Status = 'active' | 'inactive';

export interface Subject extends BaseEntity {
    subject_name: string;
    department: string;
    status: Status;
}

export interface CreateSubjectDTO {
    subject_name: string;
    department: string;
    status: Status;
}
