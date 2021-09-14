/* Written by Ye Liu */

import { pg } from '../utils/postgresql.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    const gid = ctx.parsed.gid;

    // Delete data from postgis_db
    const res = await pg('city')
        .where('gid', gid)
        .del()
        .timeout(CONF.timeout);

    // Return result
    ctx.body = res > 0 ?
        ({
            succeed: true,
            count: res
        }) :
        ({
            succeed: false,
            errMsg: `Object with Gid = '${gid}' not found.`
        });
};
