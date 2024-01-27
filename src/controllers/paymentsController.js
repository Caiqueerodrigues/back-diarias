const paymentsModel = require('../models/paymentsModel');

const getPayments = async (req, res) => {
    try {
        const pagamentos = await paymentsModel.getPayments();
        return res.status(200).json(pagamentos);
    } catch (error) {
        return res.status(500).json({ message: "Desculpe, houve um erro no servidor", error: error.message });
    }
};

module.exports = {
    getPayments,
};