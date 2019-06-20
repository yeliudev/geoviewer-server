/* Written by Ye Liu */

export default {
    // Server listening port
    port: '5757',

    // Server listening IP
    ip: '0.0.0.0',

    // Cookie expiry time (ms)
    validity: 604800000,

    // PostgreSQL
    pg_connection: {
        host: '134.175.186.17',
        port: '5432',
        user: '',
        password: '',
        database: ''
    },

    // Query waiting timeout
    timeout: 5000
};
