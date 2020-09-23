/* Written by Ye Liu */

import { pg } from '../utils/postgresql.utils';
import { checkEmptyObject } from '../utils/validation.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    const gid = ctx.parsed.gid;

    var newData = {};
    Object.keys(ctx.parsed).map(key => {
        if (key !== 'gid') {
            newData[key] = ctx.parsed[key];
        }
        return true;
    });

    // Return if nothing to update
    if (checkEmptyObject(newData)) {
        ctx.body = {
            succeed: false,
            errMsg: `Nothing to update.`
        };
        return;
    }

    // Update data in postgis_db
    const res = await pg('city')
        .where('gid', gid)
        .update(newData)
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
