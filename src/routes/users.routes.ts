import { httpGet, controller, response, queryParam, httpPost } from "inversify-express-utils";
import { Response } from "express";
import { LoginService } from "../services/login.service";
import { LoginResponse } from "../model/login.model";
import { inject } from "inversify";
import { TYPES } from "../types";

@controller('/api/users')
export class UsersRoutes {
    
    constructor(
        @inject(TYPES.LoginService) private loginService: LoginService
    ) {}

    // @httpGet('/')
    // async getUser() {
    //     return this.userModel.find();
    // }

    @httpGet('/token')
    async login(
        @queryParam('email') email: string,
        @queryParam('pwd') pwd: string,
        @response() res: Response
    ): Promise<LoginResponse> {
        try {
            return await this.loginService.login(email, pwd);
        } catch(e) {
            res.status(404).send();
        }
    }
    
    @httpPost('/token')
    async signin(
        @queryParam('email') email: string,
        @queryParam('pwd') pwd: string,
        @queryParam('name') name: string,
        @response() res: Response
    ): Promise<LoginResponse> {
        try {
            return await this.loginService.signin(email, pwd, name);
        } catch(e) {
            res.status(422).send();
        }
    }
    
}