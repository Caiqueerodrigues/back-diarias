const connection = require('./connection')

const getProcedures = async () => {
    const [procedures] = await connection.execute('SELECT * FROM procedures');
    return procedures;
};

module.exports = {
    getProcedures,
};