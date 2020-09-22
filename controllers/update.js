/* Written by Ye Liu */

import { pg } from '../utils/postgresql.utils';
import { checkEmptyObject } from '../utils/method.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    const gid = ctx.request.body.gid;

    var newData = {};
    Object.keys(ctx.request.body).map(key => {
        if (key !== 'gid') {
            newData[key] = ctx.request.body[key];
        }
        return true;
    });

    // Return if nothing to update
    if (checkEmptyObject(newData)) {
        ctx.body = {
            success: false,
            errMsg: `Nothing to update.`
        };
        return;
    }

    // Update data in postgis_db
    const res = await pg('spatial_info')
        .where('gid', gid)
        .update(newData)
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
