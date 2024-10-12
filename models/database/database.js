const pg = require('pg');
const pool = new pg.Pool({
host: 'localhost',
user: 'postgres',
password: 'password',
database: 'testdb'
});
pool.query('SELECT * FROM vehicles', (error, results) => {
    if (error) throw error;
    console.log(results.rows);
});
module.exports = {
    get: async (tableName, id) => {
    const results = await pool.query(
    SELECT * FROM `${tableName}`, WHERE `${id}`= $1,
    [id]
);
return results.rows;
},
count: async (tableName) => {
    const results = await pool.query(SELECT `COUNT(*) FROM ${tableName}`);
    return results.rows[0].count;
    }
};