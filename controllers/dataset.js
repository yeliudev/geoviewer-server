/* Written by Ye Liu */

import { pg, st } from '../utils/postgresql.utils';
import { parseGeoJSON } from '../utils/data.utils';
import dataset from '../utils/datasets.util';
import CONF from '../config';

export default async ctx => {
    // Get request data
    var { id } = ctx.parsed;

    // Select data from postgis_db
    var res = await pg.select(st.asGeoJSON('geometry'))
        .from(dataset[id])
        .timeout(CONF.timeout);

    // Parse GeoJSON
    res = parseGeoJSON(res);

    // Return result
    ctx.body = {
        succeed: true,
        geometry: res
    };
};
