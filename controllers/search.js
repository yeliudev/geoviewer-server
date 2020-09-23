/* Written by Ye Liu */

import { pg, st } from '../utils/postgresql.utils';
import { parseGid, parseGeoJSON } from '../utils/data.utils';
import CONF from '../config';

export default async ctx => {
    // Get request data
    var { keyword, gid, name, pinyin, introduction } = ctx.parsed;

    // Select data from postgis_db
    const res = await pg.select('gid', 'name', 'pinyin', 'introduction', 'image', st.asGeoJSON('geometry'))
        .from('city')
        .where('gid', gid ? parseGid(keyword) : 0)
        .orWhere('name', 'like', name ? `%${keyword}%` : 'null')
        .orWhere('pinyin', 'like', pinyin ? `%${keyword}%` : 'null')
        .orWhere('introduction', 'like', introduction ? `%${keyword}%` : 'null')
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
            succeed: true,
            data: res
        }) :
        ({
            succeed: false,
            errMsg: `Object with keyword '${keyword}' not found.`
        });
};
