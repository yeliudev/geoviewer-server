/* Written by Ye Liu */

import BodyParser from 'koa-bodyparser';

export default BodyParser({
    enableTypes: ['json'],
    jsonLimit: '10mb'
});
