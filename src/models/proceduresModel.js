const pool = require('./connection'); 
const getProcedures = async () => {
    const query = 'SELECT * FROM procedures';
    const { rows: procedures } = await pool.query(query);
    return procedures;
};

module.exports = {
    getProcedures,
};
