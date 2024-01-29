const  pool  = require('./connection');

const getPayments = async () => {
    try {
        const result = await pool.query('SELECT * FROM pagamentos');
        return result.rows;
    } catch (error) {
        console.error('Erro ao obter pagamentos:', error.message);
        throw error;
    }
};

module.exports = {
    getPayments,
};
