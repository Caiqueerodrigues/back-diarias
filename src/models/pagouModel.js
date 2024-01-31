const pool = require('./connection'); 

const updateAtendiment = async (id, total) => {
    const arrayDeIds = id.split(',').map(item => item.trim()).filter(item => item !== '');

    console.log( arrayDeIds, total + "TOTAL");
    try {
        let date = new Date().toLocaleDateString();
        let partesData = date.split('/');
        date = `${partesData[2].padStart(2, '0')}-${partesData[1].padStart(2, '0')}-${partesData[0].padStart(2, '0')}`;

        const paymentQuery = 'INSERT INTO pagamentos ("date_pagamento", "valor_pagamento") VALUES($1, $2) RETURNING "id_pagamento"';
        const paymentResult = await pool.query(paymentQuery, [date, total]);

        const idPagamento = paymentResult.rows[0].id_pagamento;

        for (let i = 0; i < arrayDeIds.length; i++) {
            const updateQuery = 'UPDATE dailys SET "pago" = true, "id_pagamento" = $1 WHERE "id_register" = $2';
            const updateResult = await pool.query(updateQuery, [idPagamento, arrayDeIds[i]]);
        }
    } catch (error) {
        console.error("Erro ao criar pagamento:", error.message);
        throw error;
    }
};

module.exports = {
    updateAtendiment,
};
