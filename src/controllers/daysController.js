const daysModel = require('../models/daysModel');

const getDays = async (req, res) => {
    try {
        const days = await daysModel.getDays();
        return res.status(200).json(days);
    } catch (error) {
        return res.status(500).json({ message: "Desculpe, houve um erro no servidor", error: error });
    }
};

const createAtendiment = async (req, res) => {
    try {
        await daysModel.createAtendiment(req.body);
        return res.status(201).json('Adicionado com sucesso');
    } catch (error) {
        return res.status(500).json({ message: "Desculpe, houve um erro no servidor", error: error.message });
    }
};

const deleteAtendiment = async (req, res) => {
    const { id } = req.params;
    try {
        await daysModel.deleteAtendiment(id);
        return res.status(200).json('Removido com sucesso');
    } catch (error) {
        return res.status(500).json({ message: "Desculpe, houve um erro no servidor", error: error.message });
    }
}

module.exports = {
    getDays,
    createAtendiment,
    deleteAtendiment,
};
