import { Role } from './role.model';
export interface User {
    email: string;
    password: string;
    name?: string;
    username?: string;
    roles?: Role[]
    id?: number;
}
