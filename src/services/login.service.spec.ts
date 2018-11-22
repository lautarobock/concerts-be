import 'reflect-metadata';

import test from 'ava';
import * as jwtSimple from 'jwt-simple';
import { UserModel } from '../daos/domain.daos';
import { SinonSpy, fake } from 'sinon';
import { DefaultLoginService, DefaultPwdHelper } from '../services/login.service';

test('Login OK', async t => {
    const userModel = UserModel;
    const mock: SinonSpy = userModel.findOne = fake.returns({
        lean: fake.returns({
            _id: 'ID',
            name: 'fakename',
            email: 'mail@fake.com',
            pwd: 'pbkdf2$10000$8f0317606f633b5a68462212f1e448678821cd9522ed033558d10672ff35cb57575704e10c93a7309fabe9eb28d0b44543f2d2a5d3607177cb7a4f1319eefd33$15fc11fc6075eea7e65febee046aa42c2d18dfbb66d9f0316ac02889e0d602b090d175d01eea155f7bbbd8051b5c9587206921af273c84ce96a4c5156882ebe1',
        })
    });
    const pwdHelper = new DefaultPwdHelper();
    const loginService = new DefaultLoginService(userModel, 'SECRET', pwdHelper);
    const response = await loginService.login('mail@fake.com', 'myPass123');
    const tokenData = jwtSimple.decode(response.token, 'SECRET');
    t.is(tokenData.sub, 'ID');
    t.true(mock.calledWith({email: 'mail@fake.com'}));
    t.is(tokenData.name, 'fakename');
    t.not(response.user, undefined);
    t.is(response.user.email, 'mail@fake.com');
    t.is(response.user.name, 'fakename');
    t.is(response.user.pwd, undefined);
    t.not(response.exp, undefined);
});

test('Login Wrong PWD', async t => {
    const userModel = UserModel;
    const mock: SinonSpy = userModel.findOne = fake.returns({
        _id: 'ID',
        name: 'fakename',
        email: 'mail@fake.com',
        pwd: 'fakepwd'
    });
    try {
        const pwdHelper = new DefaultPwdHelper();
        await new DefaultLoginService(userModel, 'SECRET', pwdHelper).login('mail@fake.com', 'wrongpwd');
        t.throws(() => undefined);
    } catch (e) {
        t.true(mock.calledWith({email: 'mail@fake.com'}));
    }
});

test('Sign in OK', async t => {
    const userModel = UserModel;
    const mockFindOne: SinonSpy = userModel.findOne = fake.returns(undefined);
    const mockcreate: SinonSpy = userModel.create = fake.returns({
        email: 'mail@fake.com', pwd: 'wrongpwd', name: 'fakename', _id: 'ID'
    });
    const pwdHelper = new DefaultPwdHelper();
    const loginService = new DefaultLoginService(userModel, 'SECRET', pwdHelper);
    const response = await loginService.signin('mail@fake.com', 'wrongpwd', 'fakename');
    const tokenData = jwtSimple.decode(response.token, 'SECRET');
    t.is(tokenData.sub, 'ID');
    t.true(mockFindOne.calledWith({email: 'mail@fake.com'}));
    t.true(mockcreate.called);
    t.is(tokenData.name, 'fakename');
    t.not(response.user, undefined);
    t.is(response.user.email, 'mail@fake.com');
    t.is(response.user.name, 'fakename');
    t.is(response.user.pwd, undefined);
    t.not(response.exp, undefined);
});

test('Hash pwd', async t => {
    const helper = new DefaultPwdHelper();
    const hash = await helper.hash('myPass123');
    t.not(hash, undefined);
    t.true((await helper.verify('myPass123', hash)));
    t.true((await helper.verify('myPass123', 'pbkdf2$10000$8f0317606f633b5a68462212f1e448678821cd9522ed033558d10672ff35cb57575704e10c93a7309fabe9eb28d0b44543f2d2a5d3607177cb7a4f1319eefd33$15fc11fc6075eea7e65febee046aa42c2d18dfbb66d9f0316ac02889e0d602b090d175d01eea155f7bbbd8051b5c9587206921af273c84ce96a4c5156882ebe1')));
});