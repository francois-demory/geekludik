const { Mechanic } = require('../models');
const sanitizer = require('sanitizer');

const mechanicController = {
    async getAll(req, res, next) {
        try {
            const mechanics = await Mechanic.findAll();
            if(mechanics){
                return res.json(mechanics);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByMehcanic(req, res, next) {
        try {
            const boardgamesByMechanic = await Mechanic.findOne({
                where: {
                    mechanic: req.params.mechanic,
                },
                include: ['boardgames'],
            });
            if(boardgamesByMechanic){
                return res.json(boardgamesByMechanic);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.body.mechanic = sanitizer.sanitize(req.body.mechanic);

            const foundMechanic = await Mechanic.findOne({
                where: {
                    mechanic: req.body.mechanic,
                }
            });
            if(foundMechanic){   
                return res.json(foundMechanic);
            }
            else {
                const newMechanic = await Mechanic.create(req.body);
                return res.json(newMechanic);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.mechanic = sanitizer.sanitize(req.body.mechanic);

            const foundMechanic = await Mechanic.findByPk(req.params.id);
            if(foundMechanic) {
                foundMechanic.update(req.body);
                res.json(foundMechanic);
            }
            next();
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async delete(req, res, next) {
        try{
            const result = await Mechanic.destroy({
                where: {
                    id: req.params.id
                }
            });
            if(result){
                return res.json({
                    ok: true
                })
            }
            next();
        }
        catch(error) {
            res.status(400).json({
                error: error.message
              });
        }
    }

}

module.exports = mechanicController;