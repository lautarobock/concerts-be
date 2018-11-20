import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { IModel } from '../daos/domain.daos';
import * as jwtSimple from 'jwt-simple';
import { LoginResponse } from '../model/login.model';
import * as password from 'password-hash-and-salt';
import { User } from '../model/domain.model';

export interface PwdHelper {

    hash(pwd: string): Promise<string>;
    verify(hash: string, against: string): Promise<boolean>;
}

@injectable()
export class DefaultPwdHelper implements PwdHelper {

    hash(pwd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            password(pwd).hash((err: string, hash: string) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash);
                }
            })
        });
    }

    verify(hash: string, against: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            password(hash).verifyAgainst(against, (err: string, verified: boolean) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(verified);
                }
            })
        });
    }

}

export interface LoginService {

    login(email: string, pwd: string): Promise<LoginResponse>;
    signin(email: string, pwd: string, name: string): Promise<LoginResponse>;
}

@injectable()
export class DefaultLoginService implements LoginService {

    constructor(
        @inject(TYPES.UserModel) private userModel: IModel<User>,
        @inject(TYPES.SECRET) private jwtSecret: string,
        @inject(TYPES.PwdHelper) private pwdHelper: PwdHelper
    ) {}

    async login(email: string, pwd: string): Promise<LoginResponse> {
        const user = await this.userModel.findOne({email}, '+pwd');
        if (await this.pwdHelper.verify(pwd, user.pwd)) {
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
                user, exp
            });
        } else {
            return Promise.reject();
        }
    }

    async signin(email: string, pwd: string, name: string): Promise<LoginResponse> {
        if (await this.userModel.findOne({email})) {
            return Promise.reject(new Error('Already exists'));
        } else {
            const user = await this.userModel.create({
                email, name, pwd: (await this.pwdHelper.hash(pwd))
            });
            delete user.pwd;
            const exp = new Date().getTime() + (1000 * 60 * 60 * 24 * 30 * 7);
            return Promise.resolve({
                token: jwtSimple.encode({
                    iss: 'http://concerts',
                    sub: user._id,
                    name: user.name,
                    email: user.email,
                    exp
                }, this.jwtSecret),
                user, exp
            });
        }
    }
}