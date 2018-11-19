import { httpGet, controller } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { IModel, User } from "../model";

@controller('/api/users')
export class UsersRoutes {

    constructor(
        @inject(TYPES.UserModel) private userModel: IModel<User>
    ) {}

    @httpGet('/')
    async getUser() {
        return this.userModel.find();
    }
}