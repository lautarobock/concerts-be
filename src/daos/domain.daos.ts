import { InstanceType } from 'typegoose';
import { Model } from 'mongoose';
import { User, Band } from '../model/domain.model';

export interface IModel<T> extends Model<InstanceType<T>> {

}

export const UserModel = new User().getModelForClass(User);
export const BandModel = new Band().getModelForClass(Band);