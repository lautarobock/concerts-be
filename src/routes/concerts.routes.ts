import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ConcertsService } from "../services/concerts.service";
import { Concert } from "../model/domain.model";

@controller('/api/concerts')
export class ConcertsRoutes {
    
    constructor(
        @inject(TYPES.ConcertsService) private concertsService: ConcertsService
    ) {}

    @httpGet('/')
    async findNext(): Promise<Concert[]> {
        return await this.concertsService.findNext();
    }

    @httpPost('/')
    async create(@requestBody() concert: Concert): Promise<Concert> {
        return await this.concertsService.create(concert);
    }

}