const  pool  = require('./connection');

const getPayments = async () => {
    try {
        const result = await pool.query('SELECT * FROM pagamentos');
        const arrayDePagamentos = result.rows.map(pagamento => {
            return { ...pagamento, date_pagamento: new Date(pagamento.date_pagamento).toLocaleDateString() };
        });

        return arrayDePagamentos;
    } catch (error) {
        console.error('Erro ao obter pagamentos:', error.message);
        throw error;
    }
};

module.exports = {
    getPayments,
};
