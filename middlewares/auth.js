/* Written by Ye Liu */

export default async (ctx, next) => {
    // Check authorization
    if (!ctx.session.user) {
        ctx.body = {
            success: false,
            authError: true,
            errMsg: `Error: Please login first.`
        };
        return;
    }

    // Call next middleware
    await next();
};
