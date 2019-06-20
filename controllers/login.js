/* Written by Ye Liu */

import md5 from 'md5';

export default async ctx => {
    // Get request data
    const { username, password } = ctx.request.body;

    // Select salt from postgis_db
    const salt = await pg.select('salt').from('user').where('username', username).timeout(CONF.timeout);

    if (!salt.length) {
        ctx.body = {
            success: false,
            errMsg: `Error: User '${username}' not found.`
        };
    }

    // Validate password
    const res = await pg.select()
        .from('user')
        .where('username', username)
        .andWhere('password', md5(password + salt[0]))
        .timeout(CONF.timeout);

    if (res.length > 0) {
        // Create session
        ctx.session.user = username;

        ctx.body = {
            success: true
        };
    } else {
        ctx.body = {
            success: false,
            errMsg: `Error: Wrong username or password.`
        };
    }
};
