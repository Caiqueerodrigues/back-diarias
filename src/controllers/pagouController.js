const pagouModel = require('../models/pagouModel')

const updateAtendiment = async (req, res) => {
    const { ids, total } = req.body;
    try {
        await pagouModel.updateAtendiment(ids, total);
        return res.status(200).json('Alterado com sucesso');
    } catch (error) {
        return res.status(500).json({ message: "Desculpe, houve um erro no servidor", error: error.message });
    }
};

module.exports = {
    updateAtendiment,
}