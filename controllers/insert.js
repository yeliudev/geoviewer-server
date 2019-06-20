/* Written by Ye Liu */

import { pg, st } from '../utils/postgresql.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    var { name, pinyin, introduction, image, geometry } = ctx.request.body;

    // Set new Gid
    const currentGid = await pg('res2_4m').max('gid').timeout(CONF.timeout);
    const gid = currentGid[0].max >= 1000 ? currentGid[0].max + 1 : 1000;

    // Insert data into postgis_db
    const res = await pg('res2_4m')
        .insert({
            gid: gid,
            name: name,
            pinyin: pinyin,
            introduction: introduction,
            image: JSON.stringify(image),
            geom: st.geomFromGeoJSON(geometry.geometry)
        })
        .timeout(CONF.timeout);

    // Return result
    ctx.body = res.rowCount > 0 ?
        ({
            success: true,
            gid: gid
        }) :
        ({
            success: false,
            errMsg: `Error: Insert object with Gid = '${gid}' failed.`
        });
};
