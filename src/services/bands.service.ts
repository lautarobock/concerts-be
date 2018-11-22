import { injectable, inject } from "inversify";
import { IModel } from "../daos/domain.daos";
import { Band } from "../model/domain.model";
import { TYPES } from "../types";

export interface BandsService {

    create(band: Band): Promise<Band>;
}

@injectable()
export class DefaultBandsService {

    constructor(
        @inject(TYPES.BandModel) private bandsModel: IModel<Band>
    ) { }

    async create(band: Band): Promise<Band> {
        band.createdAt = new Date();
        band.modifiedAt = new Date(band.createdAt);
        return this.bandsModel.create(band);        
    }
}