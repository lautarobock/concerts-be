import { SECRET } from './config';
import { Container } from 'inversify';
import { BandModel, IModel, UserModel } from './daos/domain.daos';
import { TYPES } from './types';
import { Band, User } from './model/domain.model';
import { DefaultLoginService, PwdHelper, DefaultPwdHelper, LoginService } from './services/login.service';

// needed by inversify in order to read controllers metadata
import './routes/users.routes';
import './routes/bands.routes';

export const container = new Container();
// DAOs
container.bind<IModel<Band>>(TYPES.BandModel).toConstantValue(BandModel);
container.bind<IModel<User>>(TYPES.UserModel).toConstantValue(UserModel);
// Constants
container.bind<string>(TYPES.SECRET).toConstantValue(SECRET);
// Services
container.bind<LoginService>(TYPES.LoginService).to(DefaultLoginService);
// Helpers
container.bind<PwdHelper>(TYPES.PwdHelper).to(DefaultPwdHelper);
