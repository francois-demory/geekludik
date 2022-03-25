const { Age } = require('../models');
const sanitizer = require('sanitizer');

const ageController = {
    async getAll(req, res, next) {
        try {
            const ages = await Age.findAll();
            if(ages){
                return res.json(ages);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByAge(req, res, next) {
        try {
            const boardgamesByAge = await Age.findOne({
                where: {
                    age: req.params.age
                },
                include: ['boardgames']
            });
            if(boardgamesByAge){
                return res.json(boardgamesByAge);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.body.age = sanitizer.sanitize(req.body.age);

            const foundAge = await Age.findOne({
                where: {
                    age: req.body.age
                }
            });
            if(foundAge){   
                return res.json(foundAge);
            }
            else {
                const newAge = await Age.create(req.body);
                return res.json(newAge);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.age = sanitizer.sanitize(req.body.age);
            
            const foundAge = await Age.findByPk(req.params.id);

            if(foundAge) {
                foundAge.update(req.body);
                res.json(foundAge);
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
            const result = await Age.destroy({
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

module.exports = ageController;