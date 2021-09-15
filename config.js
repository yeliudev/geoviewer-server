/* Written by Ye Liu */

export default {
    // Listening port
    port: '5757',

    // Session options
    session: {
        maxAge: 86400000,
        sameSite: 'none',
        renew: true
    },

    // PostgreSQL
    pg_connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'geoviewer',
        password: 'geoviewer',
        database: 'geoviewer'
    },

    // Query waiting timeout
    timeout: 5000
};
