const { Boardgame, Editor, Duration, Age, Player } = require('../models');
const sanitizer = require('sanitizer');

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

    async getBoardgameByName(req, res, next) {
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
    },

    async create(req, res, next) {
        try {
            req.body.name = sanitizer.sanitize(req.body.name);
            req.body.editor_name = sanitizer.sanitize(req.body.editor_name);
            req.body.duration = sanitizer.sanitize(req.body.duration);
            req.body.age = sanitizer.sanitize(req.body.age);
            req.body.player_id = sanitizer.sanitize(req.body.player_id);
            req.body.steam_url = sanitizer.sanitize(req.body.steam_url);
            req.body.appstore_url = sanitizer.sanitize(req.body.appstore_url);
            req.body.playstore_url = sanitizer.sanitize(req.body.playstore_url);
            req.body.bga_url = sanitizer.sanitize(req.body.bga_url);
            req.body.gamepark_url = sanitizer.sanitize(req.body.gamepark_url);

            const foundBoardgame = await Boardgame.findOne({
                where: {
                    name: req.body.name
                }
            });
            if(foundBoardgame){   
                return res.json(foundBoardgame);
            }
            else {
                const foundEditor = await Editor.findOrCreate({
                    where: {
                        editor_name: req.body.editor_name
                    }
                });

                const foundDuration = await Duration.findOrCreate({
                    where: {
                        duration: req.body.duration
                    }
                });

                const foundAge = await Age.findOrCreate({
                    where: {
                        age: req.body.age
                    }
                });

                const foundPlayer = await Player.findOrCreate({
                    where: {
                        player: req.body.player
                    }
                });

                req.body.editor_id = foundEditor[0].id;
                req.body.duration_id = foundDuration[0].id;
                req.body.age_id = foundAge[0].id;
                req.body.player_id = foundPlayer[0].id;

                const newBoardgame = await Boardgame.create(req.body);

                return res.json(newBoardgame);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },
}

module.exports = boardgameController;