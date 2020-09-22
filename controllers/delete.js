/* Written by Ye Liu */

import { pg } from '../utils/postgresql.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    const gid = ctx.request.body.gid;

    // Delete data from postgis_db
    const res = await pg('spatial_info')
        .where('gid', gid)
        .del()
        .timeout(CONF.timeout);

    // Return result
    ctx.body = res > 0 ?
        ({
            success: true,
            count: res
        }) :
        ({
            success: false,
            errMsg: `Error: Object with Gid = '${gid}' not found.`
        });
};
