/* Written by Ye Liu */

import knex from 'knex';
import knexPostgis from 'knex-postgis';

import CONF from '../config';

// Connect to spatial database
const pg = new knex({
    client: 'pg',
    connection: CONF.pg_connection
});

// Init postgis plugin
const st = knexPostgis(pg);

export { pg, st };
