/* Written by Ye Liu */

import Koa from 'koa';
import Session from 'koa-session';

import middlewares from './middlewares';
import router from './router/router';
import CONF from './config';

// Init Koa app
const app = new Koa({ proxy: true });
app.keys = ['geoviewer secret keys']

// Bind middlewares
app
    .use(middlewares.logger)
    .use(middlewares.header)
    .use(middlewares.body)
    .use(middlewares.validation)
    .use(Session(CONF.session, app))
    .use(router.routes())
    .use(router.allowedMethods());

// Start http service
app.listen(CONF.port, CONF.ip, () => console.log(`Listening on port ${CONF.port}...`));
