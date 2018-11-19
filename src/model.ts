import { prop, Typegoose, InstanceType } from 'typegoose';
import { Model } from 'mongoose';

export interface IModel<T> extends Model<InstanceType<T>> {

}

export class User extends Typegoose {
    @prop()
    name: string;
    @prop()
    email: string;
    @prop()
    pwd: string;
}
export const UserModel = new User().getModelForClass(User);

export class Band extends Typegoose {
    @prop()
    name: string;
}
export const BandModel = new Band().getModelForClass(Band);