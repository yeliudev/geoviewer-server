/* Written by Ye Liu */

import md5 from 'md5';

import { pg } from '../utils/postgresql.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    const { username, password } = ctx.parsed;

    // Select salt from postgis_db
    const salt = await pg.select('salt').from('user').where('username', username).timeout(CONF.timeout);

    if (!salt.length) {
        ctx.body = {
            succeed: false,
            errMsg: `User '${username}' not found.`
        };
        return;
    }

    // Validate password
    const res = await pg.select()
        .from('user')
        .where('username', username)
        .andWhere('password', md5(password + salt[0].salt))
        .timeout(CONF.timeout);

    if (res.length > 0) {
        // Create session
        ctx.session.username = username;

        // Return success result
        ctx.body = {
            succeed: true,
            user: username
        };
    } else {
        // Return failed result
        ctx.body = {
            succeed: false,
            errMsg: `Wrong username or password.`
        };
    }
};
