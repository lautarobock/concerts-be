import * as jwt from 'express-jwt';

export const SECRET = '04c5fcdc-5c83-4b77-8b3cbce25f1c-8891';

export function configure(app) {
    secure(app);
}

function secure(app) {
    app.use(jwt({
        secret: SECRET,
        getToken: req => req.headers['x-access-token'] || req.query['x-access-token']
    }).unless({
        path: [
            '/',
            '/api/concerts',
            '/api/users/token',
            '/favicon.ico',
            '/robots.txt'
        ]
    }));
}