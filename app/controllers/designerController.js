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

    async getBoardgameByDesigner(req, res, next) {
        try {
            const boardgamesByDesigner = await Designer.findOne({
                where: {
                    firstname: req.query.firstname,
                    lastname: req.query.lastname
                },
                include: ['boardgames'],
            });
            if(boardgamesByDesigner){
                return res.json(boardgamesByDesigner);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const foundDesigner = await Designer.findOne({
                where: {
                    firstname: req.query.firstname,
                    lastname: req.query.lastname
                }
            });
            if(foundDesigner){   
                return res.json(foundDesigner);
            }
            else {
                const newDesigner = await Designer.create(req.query);
                return res.json(newDesigner);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            const foundDesigner = await Designer.findByPk(req.params.id);

            foundDesigner.update(req.body);

            res.json(foundDesigner);
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async delete(req, res, next) {
        try{
            const result = await Designer.destroy({
                where: {
                    id: req.params.id
                }
            });
            if(result){
                return res.json({
                    ok: true
                })
            }
        }
        catch(error) {
            res.status(400).json({
                error: error.message
              });
        }
    }
}

module.exports = designerController;