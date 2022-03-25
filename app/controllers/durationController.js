const { Duration } = require('../models');
const sanitizer = require('sanitizer');

const durationController = {
    async getAll(req, res, next) {
        try {
            const durations = await Duration.findAll();
            if(durations){
                return res.json(durations);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByDuration(req, res, next) {
        try {
            const boardgamesByDuration = await Duration.findOne({
                where: {
                    duration: req.params.duration
                },
                include: ['boardgames']
            });
            if(boardgamesByDuration){
                return res.json(boardgamesByDuration);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.body.duration = sanitizer.sanitize(req.body.duration);

            const foundDuration = await Duration.findOne({
                where: {
                    duration: req.body.duration
                }
            });
            if(foundDuration){   
                return res.json(foundDuration);
            }
            else {
                const newDuration = await Duration.create(req.body);
                return res.json(newDuration);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.duration = sanitizer.sanitize(req.body.duration);
            
            const foundDuration = await Duration.findByPk(req.params.id);
            if(foundDuration){
                foundDuration.update(req.body);
                res.json(foundDuration);
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
            const result = await Duration.destroy({
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

module.exports = durationController;