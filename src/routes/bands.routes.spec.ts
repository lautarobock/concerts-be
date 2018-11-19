import 'reflect-metadata';

import test from 'ava';
import * as sinon from 'sinon';
import { BandsRoutes } from './bands.routes';
import { BandModel } from '../model';

test('Get all bands', async t => {
    const model = BandModel;
    const mock: any = model.find = sinon.fake.returns(Promise.resolve([]));
    const bands = await new BandsRoutes(model).all();
    t.deepEqual(bands, []);
    t.is(mock.calledWith(), true);
})