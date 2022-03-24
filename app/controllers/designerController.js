const { Designer } = require('../models');

const designerController = {
    async getAll(req, res, next) {
        try {
            const designers = await Designer.findAll();
            if(designers){
                return res.json(designers);
            }
            next();
        } catch(error) {
            next(error);
        }
    },
}

module.exports = designerController;