const { Author } = require('../models');
const sanitizer = require('sanitizer');

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
                    firstname: req.query.firstname,
                    lastname: req.query.lastname
                },
                include: ['boardgames'],
            });
            if(boardgamesByAuthor){
                return res.json(boardgamesByAuthor);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.query.firstname = sanitizer.sanitize(req.query.firstname);
            req.query.lastname = sanitizer.sanitize(req.query.lastname);

            const foundAuthor = await Author.findOne({
                where: {
                    firstname: req.query.firstname,
                    lastname: req.query.lastname
                }
            });
            if(foundAuthor){   
                return res.json(foundAuthor);
            }
            else {
                const newAuthor = await Author.create(req.query);
                return res.json(newAuthor);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.firstname = sanitizer.sanitize(req.body.firstname);
            req.body.lastname = sanitizer.sanitize(req.body.lastname);

            const foundAuthor = await Author.findByPk(req.params.id);
            if(foundAuthor){
                foundAuthor.update(req.body);
                res.json(foundAuthor);
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
            const result = await Author.destroy({
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

module.exports = authorController;