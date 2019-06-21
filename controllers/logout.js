/* Written by Ye Liu */

export default async ctx => {
    // Delete session
    ctx.session = null;

    // Return success result
    ctx.body = {
        success: true
    };
};
