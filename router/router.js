/* Written by Ye Liu */

import Router from 'koa-router';

import controllers from '../controllers';
import middlewares from '../middlewares';

// Init koa-router
const router = new Router();

// API list
router
    .post('/login', controllers.login)
    .post('/logout', controllers.logout)
    .post('/insert', middlewares.auth, controllers.insert)
    .post('/update', middlewares.auth, controllers.update)
    .post('/delete', middlewares.auth, controllers.delete)
    .get('/dataset', controllers.dataset)
    .get('/search', controllers.search);

export default router;
