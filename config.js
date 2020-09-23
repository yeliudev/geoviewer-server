/* Written by Ye Liu */

export default {
    // Server listening port
    port: '5757',

    // Server listening IP
    ip: '0.0.0.0',

    // Session options
    session: {
        maxAge: 86400000,
        sameSite: 'none',
        secure: true,
        renew: true
    },

    // PostgreSQL
    pg_connection: {
        host: '127.0.0.1',
        port: '5432',
        user: '',
        password: '',
        database: ''
    },

    // Query waiting timeout
    timeout: 5000
};
