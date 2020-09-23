/* Written by Ye Liu */

export default async ctx => {
    // Get username
    const username = String(ctx.session.username);

    // Delete session
    ctx.session = null;

    // Return success result
    ctx.body = {
        succeed: true,
        user: username
    };
};
