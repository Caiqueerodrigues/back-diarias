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
    createAtendiment,
    deleteAtendiment,
}