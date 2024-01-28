const connection = require('./connection');

const updateAtendiment = async (id, total) => {
    const arrayDeIds = id.split(',').map(item => item.trim()).filter(item => item !== '');
    try {
        const [payment] = await connection.execute('INSERT INTO pagamentos (datePagamento, valorPagamento) VALUES(?, ?)',[new Date(), total]);
        const idPagamento = payment.insertId;

        for(let i = 0; i < arrayDeIds.length; i++) {
            const [update] = await connection.execute('UPDATE dailys SET pago = true, idPagamento = ? WHERE idRegister = ?', [idPagamento, arrayDeIds[i]]);
        }
    } catch (error) {
        console.error("Erro ao criar pagamento:", error.message);
        throw error;
    }
}

module.exports = {
    updateAtendiment,
}