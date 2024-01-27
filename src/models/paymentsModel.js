const connection = require('./connection');

const getPayments = async () => {
    const [pagamentos] = await connection.execute('SELECT * FROM pagamentos');
    return pagamentos;
};

module.exports = {
    getPayments,
};