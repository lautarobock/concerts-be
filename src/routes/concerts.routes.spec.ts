import 'reflect-metadata';

import test from 'ava';
import { ConcertsService } from '../services/concerts.service';
import { fake, SinonSpy } from 'sinon';
import { Concert } from '../model/domain.model';
import { ConcertsRoutes } from './concerts.routes';

test('Find next concerts', async t => {
    const service = {} as ConcertsService;
    const mock: SinonSpy = service.findNext = fake.returns([{title: 'Mock Concert'} as Concert]);
    const route = new ConcertsRoutes(service);
    const concerts = await route.findNext();
    t.is(concerts.length, 1);
    t.is(concerts[0].title, 'Mock Concert');
    t.true(mock.called);
});

test('Create new concert', async t => {
    const service = {} as ConcertsService;
    const mock: SinonSpy = service.create = fake.returns({title: 'New Mock Concert'} as Concert);
    const route = new ConcertsRoutes(service);
    const concert = await route.create({title: 'New Mock Concert'} as Concert);
    t.is(concert.title, 'New Mock Concert');
    t.true(mock.called);
});