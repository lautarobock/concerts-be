import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
    
    @prop()
    name: string;
    
    @prop()
    email: string;

    // @ts-ignore
    @prop({select: false})
    pwd: string;
}

export class Band extends Typegoose {
    @prop()
    name: string;
}