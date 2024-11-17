type status = 'active' | 'inactive';

export interface Tutor {
    id_tutor: number;
    name: string;
    email: string,
    phone: string,
    department: string,
    status: status,
}