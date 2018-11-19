import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { IModel, User } from '../model';
import * as jwtSimple from 'jwt-simple';

@injectable()
export class LoginService {

    constructor(
        @inject(TYPES.UserModel) private userModel: IModel<User>,
        @inject('SECRET') private jwtSecret: string
    ) {}

    async login(email: string, pwd: string): Promise<{token: string, user: User}> {
        const user = await this.userModel.findOne({email});
        if (user.pwd === pwd) {
            const exp = new Date().getTime() + (1000 * 60 * 60 * 24 * 30 * 7);
            delete user.pwd;
            return Promise.resolve({
                token: jwtSimple.encode({
                    iss: 'http://concerts',
                    sub: user._id,
                    name: user.name,
                    email: user.email,
                    exp
                }, this.jwtSecret),
                user
            });
        } else {
            return Promise.reject();
        }
    }
}