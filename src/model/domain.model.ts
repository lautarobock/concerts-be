import { prop, Typegoose } from 'typegoose';

export class Picture {
    secure_url: string;
    url: string;
    version: string;
    public_id: string;
    format: string;
}

export class User extends Typegoose {

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    email: string;

    // @ts-ignore
    @prop({ select: false })
    pwd: string;
}

export class Band extends Typegoose {

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    createdAt: Date;

    @prop({ required: true })
    modifiedAt: Date;
    
}

export class Concert extends Typegoose {

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    description: string;

    @prop()
    date: Date;

    @prop({ required: true })
    banner: Picture;

    @prop({ required: true })
    createdAt: Date;

    @prop({ required: true })
    modifiedAt: Date;

    @prop({ ref: Band, required: true })
    owner: Band;

}