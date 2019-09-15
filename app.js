/* Written by Ye Liu */

import Koa from 'koa';
import Session from 'koa-session';

import middlewares from './middlewares';
import router from './router/router';
import CONF from './config';

// Init Koa app
const app = new Koa();
app.keys = ['geoviewer secret keys']

// Init Session
const session = Session({
    maxAge: CONF.validity
}, app);

// Bind middlewares
app
    .use(middlewares.logger)
    .use(middlewares.headerSetter)
    .use(middlewares.bodyParser)
    .use(session)
    .use(middlewares.validator)
    .use(router.routes())
    .use(router.allowedMethods());

// Start web service
app.listen(CONF.port, CONF.ip, () => console.log(`Listening on port ${CONF.port}...`));
