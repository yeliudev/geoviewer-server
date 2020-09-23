/* Written by Ye Liu */

export default async (ctx, next) => {
    // Check authorization
    if (!ctx.session.username) {
        ctx.body = {
            succeed: false,
            authError: true,
            errMsg: `Please login first.`
        };
        return;
    }

    // Call next middleware
    await next();
};
