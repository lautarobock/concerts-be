import { httpGet, controller, response } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { IModel, User } from "../model";
import * as jwtSimple from 'jwt-simple';
import { Response } from "express";
import { LoginService } from "../services/login.service";

@controller('/api/users')
export class UsersRoutes {
    
    constructor(
        private loginService: LoginService
    ) {}

    // @httpGet('/')
    // async getUser() {
    //     return this.userModel.find();
    // }

    @httpGet('/users/token')
    async login(email: string, pwd: string, @response() res: Response): Promise<{token: string, user: User}> {
        try {
            return (await this.loginService.login(email, pwd));
        } catch(e) {
            res.status(404).send();
        }
    }
    
    // async signin(arg0: string, arg1: string, arg2: Response): Promise<{token: string, user: User}> {
        
    // }
    
}