import { BaseEntity } from "./api.types";

type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
type Status = 'accepted' | 'cancelled' | 'pending';


export interface Schedule  {
    day_of_week: DayOfWeek;
    hour: string;
}

export interface Log extends BaseEntity {
    student_name: string;
    student_group: string;
    tutor_id: number;
    subject_id: number;
    tutor_name: string;
    subject_name: string;
    status: Status;
    day_of_week: DayOfWeek;
    hour: string;
}