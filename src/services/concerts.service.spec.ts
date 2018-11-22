import 'reflect-metadata';

import test from 'ava';
import { ConcertModel } from '../daos/domain.daos';
import { SinonSpy, fake } from 'sinon';
import { DefaultConcertsService } from './concerts.service';
import { Picture, Concert, Band } from '../model/domain.model';

test('Find next Concerts', async t=> {
    const concertModel = ConcertModel;
    const mock: SinonSpy = concertModel.find = fake.returns({sort: fake()});
    const service = new DefaultConcertsService(concertModel);
    await service.findNext();
    t.true(mock.called);
});

test('Create concert', async t=> {
    const concertModel = ConcertModel;
    const mock: SinonSpy = concertModel.create = fake((data) => Promise.resolve(data));
    const service = new DefaultConcertsService(concertModel);
    const createdConcert = await service.create({
        title: 'Concert Title',
        description: 'Concert description',
        banner: {} as Picture,
        date: new Date('2018-01-01'),
        owner: {} as Band
    } as Concert);
    t.true(mock.called);
    t.true(createdConcert.createdAt !== undefined);
    t.true(createdConcert.modifiedAt !== undefined);
    t.deepEqual(createdConcert.createdAt, createdConcert.modifiedAt);
});
