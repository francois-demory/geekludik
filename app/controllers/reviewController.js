const { Review } = require('../models');
const sanitizer = require('sanitizer');

const reviewController = {
    async getAll(req, res, next) {
        try {
            const reviews = await Review.findAll();
            if(reviews){
                return res.json(reviews);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {

            req.body.review_url = sanitizer.sanitize(req.body.review_url);
            req.body.boardgame_reviewed = sanitizer.sanitize(boardgame_reviewed);

            const foundReview = await Review.findOne({
                where: {
                    review_url: req.body.review_url,
                }
            });
            if(foundReview){   
                return res.json(foundReview);
            }
            else {
                const newReview = await Review.create(req.body);
                return res.json(newReview);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.review_url = sanitizer.sanitize(req.body.review_url);
            req.body.boardgame_reviewed = sanitizer.sanitize(boardgame_reviewed);

            const foundReview = await Review.findByPk(req.params.id);

            foundReview.update(req.body);

            res.json(foundReview);
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async delete(req, res, next) {
        try{
            const result = await Review.destroy({
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

module.exports = reviewController;