import { User } from './domain.model';

export class LoginResponse {
    token: string;
    user: User;
    exp: number;
}