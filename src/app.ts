import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as logger from 'morgan';
import { configure } from './config';
import * as mongoose from 'mongoose';

import { container } from './inversify.config';

mongoose.connect(process.env.DATABASE_URL);

const server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    configure(app);
});
server.setErrorConfig(app => {
    app.use((err, req, res, next) => {
        if (err.status === 401 || err.status === 403) {
            res.status(err.status).send(err.message); 
        } else {
            console.error(err.stack);
            res.status(500).send({ error: 'Something failed!' });
        }
    });
});

module.exports = server.build();    
