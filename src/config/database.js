const { connectionInfo } = require('./keys');
const { Pool } = require('pg');

/**
 * Generate connection with PostgreSQL to database 'expresssi2'
 */
const pool = new Pool(connectionInfo);
pool.connect();

module.exports = pool;