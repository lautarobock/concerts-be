import { SECRET } from './config';
import { Container } from 'inversify';
import { BandModel, IModel, Band, User, UserModel } from './model';
import { TYPES } from './types';

// needed by inversify in order to read controllers metadata
import './routes/users.routes';
import './routes/bands.routes';

export const container = new Container();
container.bind<IModel<Band>>(TYPES.BandModel).toConstantValue(BandModel);
container.bind<IModel<User>>(TYPES.UserModel).toConstantValue(UserModel);
container.bind<string>('SECRET').toConstantValue(SECRET);