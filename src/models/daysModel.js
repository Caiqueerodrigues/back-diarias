const connection = require('./connection');

const getDays = async () => {
    const [days] = await connection.execute('SELECT * FROM dailys');
    return days;
};

const createAtendiment = async ({ name, idProcedure, price }) => {
    try {
        const date = new Date();
        const values = [name, idProcedure, date, false, null, price];
        const sql = `INSERT INTO dailys (nameClient, idProcedure, dataRegister, pago, idPagamento, price) VALUES (?, ?, ?, ?, ?, ?)`;

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