const { Boardgame, Editor, Duration, Age, Player, Mechanic, Author, Designer, Review, Rule } = require('../models');
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

    async create(req, res) {
        try {
            Object.keys(req.body).forEach(key => {
                value = sanitizer.sanitize(req.body[key]);
                req.body[key] = value;
            });

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
                const body = req.body;

                boardgameController.addMechanic(newBoardgame, body);
                boardgameController.addAuthor(newBoardgame, body);
                boardgameController.addDesigner(newBoardgame, body);
                boardgameController.addReview(newBoardgame, body);
                boardgameController.addRule(newBoardgame, body);

                return res.json(newBoardgame);
            }
        } catch(error) {
            res.status(400).json({
                error: error.message
            });
        }
    },

    async update(req, res, next){
        try {
            Object.keys(req.body).forEach(key => {
                value = sanitizer.sanitize(req.body[key]);
                req.body[key] = value;
            });

            const foundBoardgame = await Boardgame.findByPk(req.params.id);

            if(foundBoardgame){
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

                foundBoardgame.update(req.body);

                boardgameController.updateMechanic(foundBoardgame, req.body);
                boardgameController.updateAuthor(foundBoardgame, req.body);
                // boardgameController.addDesigner(foundBoardgame, req.body);
                // boardgameController.addReview(foundBoardgame, req.body);
                // boardgameController.addRule(foundBoardgame, req.body);

                return res.json(foundBoardgame);
            }
            next();

        } catch(error) {
            res.status(400).json({
                error: error.message
            });            
        }
    },

    async addMechanic(boardgame, body){
        if(!body.mechanic)
            return;

        const mechanics = JSON.parse(body.mechanic);
        for (let mechanic of mechanics){
            mechanic = await Mechanic.findOrCreate({
                where: {
                    mechanic: mechanic.mechanic
                }
            });
    
            await boardgame.addMechanic(mechanic[0]);
            await boardgame.reload();
        }
    },

    async addAuthor(boardgame, body){
        if(!body.author)
            return;

        await boardgame.setAuthors([]);
        const authors = JSON.parse(body.author);
        for (let author of authors){
            author = await Author.findOrCreate({
                where: {
                    firstname: author.firstname,
                    lastname: author.lastname
                }
            });
            await boardgame.addAuthor(author[0]);
            await boardgame.reload();
        }
    },

    async addDesigner(boardgame, body){
        if(!body.designer)
            return;

        await boardgame.setDesigners([]);
        const designers = JSON.parse(body.designer);
        for (let designer of designers){
            designer = await Designer.findOrCreate({
                where: {
                    firstname: designer.firstname,
                    lastname: designer.lastname                    
                }
            });
            await boardgame.addDesigner(designer[0]);
            await boardgame.reload();
        }
    },

    async addReview(boardgame, body){
        if(!body.review)
            return;

        await boardgame.setReviews([]);
        const reviews = JSON.parse(body.review);
        for (let review of reviews){
            review = await Review.findOrCreate({
                where: {
                    boardgame_reviewed: review.boardgame_reviewed,
                    review_url: review.review_url                    
                }
            });
            await boardgame.addReview(review[0]);
            await boardgame.reload();
        }
    },

    async addRule(boardgame, body){
        if(!body.rule)
            return;

        await boardgame.setRules([]);
        const rules = JSON.parse(body.rule);
        for (let rule of rules){
            rule = await Rule.findOrCreate({
                where: {
                    boardgame_related: rule.boardgame_related,
                    rule_url: rule.rule_url                    
                }
            });
            await boardgame.addRule(rule[0]);
            await boardgame.reload();
        }
    },

    async delete(req, res, next) {
        try{
            const result = await Boardgame.destroy({
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
    },

    async updateMechanic(boardgame, body){
        let boardgameMechanics = [];
        const registeredMechanics = await boardgame.getMechanics();
        for (let mechanic of registeredMechanics){
            boardgameMechanics.push(mechanic.id);
        }

        let newMechanics = [];
        const mechanics = JSON.parse(body.mechanic);

        for (let mechanic of mechanics){
            mechanic = await Mechanic.findOrCreate({
                where: {
                    mechanic : mechanic.mechanic
                }
            });
            newMechanics.push(mechanic[0].id);
        }
        const mechanicToDelete = boardgameMechanics.filter(mechanic => !newMechanics.includes(mechanic));
        for (let mechanic of mechanicToDelete){
            await boardgame.removeMechanic(mechanic);
        }

        const mechanicToAdd = newMechanics.filter(mechanic => !boardgameMechanics.includes(mechanic));
        for (let mechanic of mechanicToAdd){
            await boardgame.addMechanic(mechanic);
        }
    },

    async updateAuthor(boardgame, body){
        let boardgameAuthors = [];
        const registeredAuthors = await boardgame.getAuthors();
        for (let author of registeredAuthors){
            boardgameAuthors.push(author.id);
        }

        let newAuthors = [];
        const authors = JSON.parse(body.author);

        for (let author of authors){
            author = await Author.findOrCreate({
                where: {
                    firstname : author.firstname,
                    lastname: author.lastname
                }
            });
            newAuthors.push(author[0].id);
        }

        const authorToDelete = boardgameAuthors.filter(author => !newAuthors.includes(author));
        for (let author of authorToDelete){
            await boardgame.removeAuthor(author);
        }

        const authorToAdd = newAuthors.filter(author => !boardgameAuthors.includes(author));
        for (let author of authorToAdd){
            await boardgame.addAuthor(author);
        }
    }
}

module.exports = boardgameController;