import { injectable, inject } from "inversify";
import { IModel } from "../daos/domain.daos";
import { Concert } from "../model/domain.model";
import { TYPES } from "../types";


export interface ConcertsService {

    /**
     * Find next events
     */
    findNext(): Promise<Concert[]>;

    create(concert: Concert): Promise<Concert>;
}

@injectable()
export class DefaultConcertsService {

    constructor(
        @inject(TYPES.ConcertModel) private concertsModel: IModel<Concert>
    ) { }

    async findNext(): Promise<Concert[]> {
        return this.concertsModel.find({ date: { $gt: new Date() } }).sort('date');
    }

    async create(concert: Concert): Promise<Concert> {
        concert.createdAt = new Date();
        concert.modifiedAt = new Date(concert.createdAt);
        return this.concertsModel.create(concert);        
    }
}