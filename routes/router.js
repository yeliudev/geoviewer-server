/* Written by Ye Liu */

import Router from 'koa-router';

import controllers from '../controllers';
import middlewares from '../middlewares';

// Init koa-router
const router = new Router({
    prefix: '/api'
});

// API list
router
    .post('/login', controllers.login)
    .post('/logout', controllers.logout)
    .get('/search', controllers.search)
    .post('/insert', middlewares.auth, controllers.insert)
    .post('/update', middlewares.auth, controllers.update)
    .post('/delete', middlewares.auth, controllers.delete);

export default router;
