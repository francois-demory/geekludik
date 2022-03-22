const { Author } = require('../models');

const authorController = {
    async getAll(req, res, next) {
        try {
            const authors = await Author.findAll();
            if(authors){
                return res.json(authors);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByAuthor(req, res, next) {
        try {
            const boardgamesByAuthor = await Author.findOne({
                where: {
                    author_name: req.params.author
                },
                include: ['boardgames']
            });
            if(boardgamesByAuthor){
                return res.json(boardgamesByAuthor);
            }
            next();
        } catch(error) {
            next(error);
        }
    },
}

module.exports = authorController;