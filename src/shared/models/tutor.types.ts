import { BaseEntity } from "./api.types";
import { Subject } from "./subject.types";

type Status = 'active' | 'inactive';

export interface Tutor extends BaseEntity {
    name: string;
    email: string,
    phone: string,
    department: string,
    status: Status,
    subjectIds: Partial<Subject>[],
}

export interface TutorData {
    tutorData: {
        name: string;
        department: string;
        email: string,
        phone: string,
        status: Status,
    }
    subjectIds: number[],
}