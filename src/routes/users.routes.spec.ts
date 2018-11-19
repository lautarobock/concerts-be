import 'reflect-metadata';

import test from 'ava';
import { UsersRoutes } from './users.routes';
import { SinonSpy, fake } from 'sinon';
import { Response } from 'express';
import { LoginService } from '../services/login.service';

test('Login OK', async t => {
    const loginService = {} as LoginService;
    const mock: SinonSpy = loginService.login = fake.returns('faketoken');
    const response = await new UsersRoutes(loginService).login('mail@fake.com', 'fakepwd', {} as Response);
    t.not(response, undefined);
    t.true(mock.calledWith('mail@fake.com', 'fakepwd'));
});

test('Login Wrong PWD', async t => {
    const loginService = {} as LoginService;
    const mock: SinonSpy = loginService.login = fake.throws(undefined);
    const res: Response = {} as Response;
    const mockResSend: SinonSpy = res.send = fake.returns(res);
    const mockResStatus: SinonSpy = res.status = fake.returns(res);
    const response = await new UsersRoutes(loginService).login('mail@fake.com', 'wrongpwd', res);
    t.is(response, undefined);
    t.true(mock.calledWith('mail@fake.com', 'wrongpwd'));
    t.true(mockResStatus.calledWith(404));
    t.true(mockResSend.called);
});

// test('Sign in OK', async t => {
//     const userModel = UserModel;
//     const mockFindOne: SinonSpy = userModel.findOne = fake.returns(undefined);
//     const mockcreate: SinonSpy = userModel.create = fake();
//     const loginService = new LoginService(userModel, 'SECRET');
//     const response = await new UsersRoutes(loginService).signin('mail@fake.com', 'wrongpwd', {} as Response);
// });