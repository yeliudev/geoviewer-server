/* Written by Ye Liu */

import { pg, st } from '../utils/postgresql.utils';
import { parseGid, parseGeoJSON } from '../utils/data.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    var { keyword, options } = ctx.query;
    options = JSON.parse(options);

    // Select data from postgis_db
    const res = await pg.select('gid', 'name', 'pinyin', 'introduction', 'image', st.asGeoJSON('geom').as('geometry'))
        .from('res2_4m')
        .where('gid', options.gid ? parseGid(keyword) : 0)
        .orWhere('name', 'like', options.name ? `%${keyword}%` : '')
        .orWhere('pinyin', 'like', options.pinyin ? `%${keyword}%` : '')
        .orWhere('introduction', 'like', options.introduction ? `%${keyword}%` : 'none')
        .orderBy('gid')
        .timeout(CONF.timeout);

    // Parse GeoJSON
    res.map(item => {
        item.image = item.image ? JSON.parse(item.image) : undefined;
        item.geometry = parseGeoJSON(item.geometry);
    });

    // Return result
    ctx.body = res.length > 0 ?
        ({
            success: true,
            data: res
        }) :
        ({
            success: false,
            errMsg: `Error: Object with keyword = '${keyword}' not found.`
        });
};
