const { Boardgame } = require('../models');

const boardgameController = {
    async getAll(req, res, next) {
        try {
            const boardgames = await Boardgame.findAll({
                include: ['editor', 'duration', 'age', 'player', 'mechanics', 'authors', 'designers', 'reviews', 'rules']
            });
            if(boardgames){
                return res.json(boardgames);
            }
            next();
        } catch (error) {
            next(error);
        }
    },

    async getOneById(req, res, next) {
        try {
            const boardgame = await Boardgame.findOne({
                where: {
                    name: req.params.name
                },
                include: ['editor', 'duration', 'age', 'player', 'mechanics', 'authors', 'designers', 'reviews', 'rules']
            });
            if(boardgame){
                return res.json(boardgame);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = boardgameController;