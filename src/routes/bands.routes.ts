import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { Band } from "../model/domain.model";
import { BandsService } from "../services/bands.service";

@controller('/api/bands')
export class BandsRoutes {

    constructor(
        @inject(TYPES.BandsService) private bandsService: BandsService
    ) {}
    
    @httpPost('/')
    async create(@requestBody() band: Band) {
        return await this.bandsService.create(band);
    }
}