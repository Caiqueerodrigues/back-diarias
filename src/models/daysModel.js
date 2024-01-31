const pool = require('./connection'); 

const getDays = async (date) => {
    const proceduresQuery = 'SELECT * FROM procedures';
    const dailysQuery = 'SELECT * FROM dailys WHERE "date_register" = $1';

    try {
        const proceduresResult = await pool.query(proceduresQuery);
        const dailysResult = await pool.query(dailysQuery, [date.date]);

        const procedures = proceduresResult.rows;
        const rows = dailysResult.rows;

        let arrayDays = rows.map(row => ({ ...row }));
        arrayDays.forEach(novoId => {
            procedures.forEach(item => {
                if (item.id_procedure === novoId.id_procedure) {
                    novoId.name_procedure = item.name_procedure;
                    novoId.type_procedure = item.type_procedure;
                }
            });
        });
        return arrayDays;
    } catch (error) {
        console.error("Erro ao obter dias não pagos:", error.message);
        throw error;
    }
};

const getDaysNotPay = async () => {
    const query = 'SELECT * FROM dailys WHERE pago = $1';
    const result = await pool.query(query, [false]);

    let arrayDays = result.rows;
    let daysNotpay = null;

    try {
        daysNotpay = arrayDays.reduce((accumulator, registro) => {
            const date = new Date(registro.date_register).toLocaleDateString();
            const key = `${date}_${registro.pago}`;

            if (!accumulator[key]) {
                accumulator[key] = {
                    ids: [registro.id_register],
                    date: date,
                    total: parseFloat(registro.price.toFixed(2)),
                    status: registro.pago === '1' ? 'Pago' : 'Não Pago',
                };
            } else {
                if (!accumulator[key].ids) {
                    accumulator[key].ids = [];
                }
                const precoArredondado = parseFloat(registro.price.toFixed(2));
                accumulator[key].total += precoArredondado;
                accumulator[key].ids.push(registro.id_register);
            }
            return accumulator;
        }, {});

        daysNotpay = Object.values(daysNotpay).map(obj => ({ ...obj }));
        return daysNotpay;
    } catch (error) {
        console.error("Erro ao obter dias não pagos:", error.message);
        throw error;
    }
};

const createAtendiment = async ({ nsame, id_procedure, price }) => {
    const date = new Date();
    const dataFormatada = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    try {
        const values = [name, id_procedure, dataFormatada, false, null, price];
        const sql = `INSERT INTO dailys ("name_client", "id_procedure", "date_register", "pago", "id_pagamento", "price") VALUES ($1, $2, $3, $4, $5, $6)`;

        const result = await pool.query(sql, values);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar atendimento:", error.message);
        throw error;
    }
};

const deleteAtendiment = async (id) => {
    const query = 'DELETE FROM dailys WHERE "id_register" = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    getDays,
    getDaysNotPay,
    createAtendiment,
    deleteAtendiment,
};
