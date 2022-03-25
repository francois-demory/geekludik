const { Player } = require('../models');
const sanitizer = require('sanitizer');

const playerController = {
    async getAll(req, res, next) {
        try {
            const players = await Player.findAll();
            if(players){
                return res.json(players);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByPlayer(req, res, next) {
        try {
            const boardgamesByPlayer = await Player.findOne({
                where: {
                    player: req.params.player,
                },
                include: ['boardgames'],
            });
            if(boardgamesByPlayer){
                return res.json(boardgamesByPlayer);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.body.player = sanitizer.sanitize(req.body.player);

            const foundPlayer = await Player.findOne({
                where: {
                    player: req.body.player,
                }
            });
            if(foundPlayer){   
                return res.json(foundPlayer);
            }
            else {
                const newPlayer = await Player.create(req.body);
                return res.json(newPlayer);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.player = sanitizer.sanitize(req.body.player);

            const foundPlayer = await Player.findByPk(req.params.id);
            if(foundPlayer){
                foundPlayer.update(req.body);
                res.json(foundPlayer);
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
            const result = await Player.destroy({
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

module.exports = playerController;