/* Written by Ye Liu */

import { pg, st } from '../utils/postgresql.utils';
import { parseGeoJSON } from '../utils/data.utils';
import dataset from '../utils/dataset.util';
import CONF from '../config';

export default async ctx => {
    // Get request data
    var { id } = ctx.query;

    // Select data from postgis_db
    var res = await pg.select(st.asGeoJSON('geom').as('geometry'))
        .from(dataset[id])
        .timeout(CONF.timeout);

    // Parse GeoJSON
    res = parseGeoJSON(res);

    // Return result
    ctx.body = res;
};
