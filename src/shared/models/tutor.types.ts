import { BaseEntity } from "./api.types";
import { Subject } from "./subject.types";

type Status = 'active' | 'inactive';
type Shift = 'matutino' | 'vespertino'

export interface Tutor extends BaseEntity {
    tutor_name: string;
    email: string,
    phone: string,
    department: string,
    status: Status,
    shift: Shift
    subjectIds: Partial<Subject>[],
}

export interface TutorData {
    tutorData: {
        tutor_name: string;
        department: string;
        email: string,
        phone: string,
        status: Status,
        shift: Shift
    }
    subjectIds: number[],
}