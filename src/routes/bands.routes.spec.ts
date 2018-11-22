import 'reflect-metadata';

import test from 'ava';
import { BandsRoutes } from './bands.routes';
import { BandModel } from '../daos/domain.daos';
import { fake } from 'sinon';
import { Band } from '../model/domain.model';

// test('Get all bands', async t => {
//     const model = BandModel;
//     const mock: any = model.find = fake.returns(Promise.resolve([]));
//     const bands = await new BandsRoutes(model).all();
//     t.deepEqual(bands, []);
//     t.is(mock.calledWith(), true);
// });

test('Create Band', async t => {
    const model = BandModel;
    const mock: any = model.create = fake((data) => Promise.resolve(data));
    const band = await new BandsRoutes(model).create({
        name: 'My Band'
    } as Band);
    t.deepEqual(band.name, 'My Band');
    t.true(mock.called);
});