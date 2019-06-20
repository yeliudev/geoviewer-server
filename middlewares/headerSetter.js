/* Written by Ye Liu */

export default async (ctx, next) => {
    // Set request headers
    ctx.request.header['content-type'] = 'application/json;charset=utf-8';

    // Set response headers
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Content-Type', 'application/json;charset=utf-8');

    // Call next middleware
    await next();
};
