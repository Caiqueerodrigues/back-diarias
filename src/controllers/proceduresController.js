const proceduresModel = require('../models/proceduresModel')

const getProcedures = async (req, res) => {
    const procedures = await proceduresModel.getProcedures();

    return res.status(200).json(procedures)
};

module.exports = {
    getProcedures
}