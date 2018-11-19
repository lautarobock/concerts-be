import { IModel, Band } from "../model";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";

@controller('/api/bands')
export class BandsRoutes {

    constructor(
        @inject(TYPES.BandModel) private bandModel: IModel<Band>
    ) {}

    @httpGet('/')
    async all() {
        return await this.bandModel.find();
    }
}