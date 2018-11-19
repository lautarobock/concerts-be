import 'reflect-metadata';

import test from 'ava';
import * as jwtSimple from 'jwt-simple';
import { UserModel } from '../model';
import { SinonSpy, fake } from 'sinon';
import { LoginService } from '../services/login.service';

test('Login OK', async t => {
    const userModel = UserModel;
    const mock: SinonSpy = userModel.findOne = fake.returns({
        _id: 'ID',
        name: 'fakename',
        email: 'mail@fake.com',
        pwd: 'fakepwd'
    });
    const loginService = new LoginService(userModel, 'SECRET');
    const response = await loginService.login('mail@fake.com', 'fakepwd');
    const tokenData = jwtSimple.decode(response.token, 'SECRET');
    t.is(tokenData.sub, 'ID');
    t.true(mock.calledWith({email: 'mail@fake.com'}));
    t.is(tokenData.name, 'fakename');
    t.not(response.user, undefined);
    t.is(response.user.email, 'mail@fake.com');
    t.is(response.user.name, 'fakename');
    t.is(response.user.pwd, undefined);
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
        await new LoginService(userModel, 'SECRET').login('mail@fake.com', 'wrongpwd');
        t.throws(() => undefined);
    } catch (e) {
        t.true(mock.calledWith({email: 'mail@fake.com'}));
    }
});

// test('Sign in OK', async t => {
//     const userModel = UserModel;
//     const mockFindOne: SinonSpy = userModel.findOne = fake.returns(undefined);
//     const mockcreate: SinonSpy = userModel.create = fake();
//     const loginService = new LoginService(userModel, 'SECRET');
//     const response = await new UsersRoutes(loginService).signin('mail@fake.com', 'wrongpwd', {} as Response);
// });