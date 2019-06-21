/* Written by Ye Liu */

export default async ctx => {
    // Get username
    const username = ctx.session.user;

    // Delete session
    ctx.session = null;

    // Return success result
    ctx.body = {
        success: true,
        user: username
    };
};
