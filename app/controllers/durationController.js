const { Duration } = require('../models');

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

    async create(req, res, next) {
        try {
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
        }
        catch(error) {
            res.status(400).json({
                error: error.message
              });
        }
    }


}

module.exports = durationController;