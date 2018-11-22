import { SECRET } from './config';
import { Container } from 'inversify';
import { BandModel, IModel, UserModel, ConcertModel } from './daos/domain.daos';
import { TYPES } from './types';
import { Band, User, Concert } from './model/domain.model';
import { DefaultLoginService, PwdHelper, DefaultPwdHelper, LoginService } from './services/login.service';
import { DefaultConcertsService, ConcertsService } from './services/concerts.service';
import { DefaultBandsService, BandsService } from './services/bands.service';

// needed by inversify in order to read controllers metadata
import './routes/users.routes';
import './routes/bands.routes';
import './routes/concerts.routes';

export const container = new Container();
// DAOs
container.bind<IModel<Band>>(TYPES.BandModel).toConstantValue(BandModel);
container.bind<IModel<User>>(TYPES.UserModel).toConstantValue(UserModel);
container.bind<IModel<Concert>>(TYPES.ConcertModel).toConstantValue(ConcertModel);
// Constants
container.bind<string>(TYPES.SECRET).toConstantValue(SECRET);
// Services
container.bind<LoginService>(TYPES.LoginService).to(DefaultLoginService);
container.bind<ConcertsService>(TYPES.ConcertsService).to(DefaultConcertsService);
container.bind<BandsService>(TYPES.BandsService).to(DefaultBandsService);
// Helpers
container.bind<PwdHelper>(TYPES.PwdHelper).to(DefaultPwdHelper);
