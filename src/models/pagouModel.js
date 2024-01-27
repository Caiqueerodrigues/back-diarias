const connection = require('./connection');

const updateAtendiment = async (id) => {
    const arrayDeIds = id.split(' ');
    
    for(let i = 0; i < arrayDeIds.length; i++) {
        const [update] = await connection.execute('UPDATE dailys SET pago = true WHERE idRegister = ?', [arrayDeIds[i]]);
        return  update;
    }
}

module.exports = {
    updateAtendiment,
}