/* Written by Ye Liu */

import dateFormat from 'dateformat';

export default async (ctx, next) => {
    try {
        // Save request time
        const qt = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        const start = Date.now();

        // Call next middleware
        await next();

        // Calculate response time
        const rt = Date.now() - start;
        ctx.set('X-Response-Time', `${rt}ms`);

        // Log response time
        console.log(`${qt} ${ctx.request.ip} ${ctx.method} ${ctx.url} - ${rt}ms`);
    } catch (err) {
        // Log error
        console.error('Catch Error: %o', err && err.message ? err.message : err.toString());

        // Throw error
        ctx.throw(418);
    }
};
