const connection = require('./connection');

const getDays = async (date) => {
    const [procedures] = await connection.execute('SELECT * FROM procedures');
    const [rows] = await connection.execute('SELECT * FROM dailys WHERE dateRegister = ?', [date.date]);


    let arrayDays = rows.map(row => ({ ...row }));
    arrayDays.forEach(novoId => {
        procedures.forEach(item => {
            if(item.idProcedure === novoId.idProcedure) {
                novoId.nameProcedure = item.nameProcedure;
                novoId.typeProcedure = item.typeProcedure;
            } 
        })
    })
    return arrayDays
};

const getDaysNotPay = async () => {
    const [rows] = await connection.execute('SELECT * FROM dailys WHERE pago = ?', [false]);

    let arrayDays = rows.map(row => ({ ...row }));
    let daysNotpay = null;

    try {
        daysNotpay = arrayDays.reduce((accumulator, registro) => {
            const date = new Date(registro.dateRegister).toLocaleDateString();
            const key = `${date}_${registro.pago}`;

            if (!accumulator[key]) {
                accumulator[key] = {
                    ids: [registro.idRegister],
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
                accumulator[key].ids.push(registro.idRegister);
            }
            return accumulator;
        }, {});

        daysNotpay = Object.values(daysNotpay).map(obj => ({ ...obj }));
        return daysNotpay;
    } catch (error) {
    }
};

const createAtendiment = async ({ name, idProcedure, price }) => {
    try {
        const date = new Date();
        const values = [name, idProcedure, date, false, null, price];
        const sql = `INSERT INTO dailys (nameClient, idProcedure, dateRegister, pago, idPagamento, price) VALUES (?, ?, ?, ?, ?, ?)`;

        const [newAtendiment] = await connection.execute(sql, values);
        return newAtendiment;
    } catch (error) {
        console.error("Erro ao criar atendimento:", error.message);
        throw error;
    }
};

const deleteAtendiment = async (id) => {
    const [removeAtendiment] = await connection.execute('DELETE FROM dailys WHERE idRegister = ?', [id])
    return  removeAtendiment;
}

module.exports = {
    getDays,
    getDaysNotPay,
    createAtendiment,
    deleteAtendiment,
}