import 'reflect-metadata';

import test from 'ava';
import { BandModel } from '../daos/domain.daos';
import { SinonSpy, fake } from 'sinon';
import { DefaultBandsService } from './bands.service';
import { Band } from '../model/domain.model';

test('Create band', async t=> {
    const bandModel = BandModel;
    const mock: SinonSpy = bandModel.create = fake((data) => Promise.resolve(data));
    const service = new DefaultBandsService(bandModel);
    const createdBand = await service.create({
        name: 'My Mock Band'
    } as Band);
    t.true(mock.called);
    t.is(createdBand.name, 'My Mock Band');
    t.true(createdBand.createdAt !== undefined);
    t.true(createdBand.modifiedAt !== undefined);
    t.deepEqual(createdBand.createdAt, createdBand.modifiedAt);
});
