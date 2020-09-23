/* Written by Ye Liu */

import Koa from 'koa';
import Session from 'koa-session';
import sslify from 'koa-sslify';
import fs from 'fs';

import middlewares from './middlewares';
import router from './router/router';
import CONF from './config';

// Init Koa app
const app = new Koa({ proxy: true });
app.keys = ['geoviewer secret keys']

// Bind middlewares
app
    .use(sslify({ port: CONF.port }))
    .use(middlewares.logger)
    .use(middlewares.header)
    .use(middlewares.body)
    .use(middlewares.validation)
    .use(Session(CONF.session, app))
    .use(router.routes())
    .use(router.allowedMethods());

const options = {
    crt: fs.readFileSync(CONF.ssl.crt),
    key: fs.readFileSync(CONF.ssl.key)
}

// Start web service
https.createServer(options, app.callback()).listen(CONF.port, () => console.log(`Listening on port ${CONF.port}...`));
