const { Rule } = require('../models');
const sanitizer = require('sanitizer');

const ruleController = {
    async getAll(req, res, next) {
        try {
            const rules = await Rule.findAll();
            if(rules){
                return res.json(rules);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res) {
        try {
            req.body.rule_url = sanitizer.sanitize(req.body.rule_url);
            req.body.boardgame_related = sanitizer.sanitize(boardgame_related);

            const foundRule = await Rule.findOne({
                where: {
                    rule_url: req.body.rule_url,
                }
            });
            if(foundRule){   
                return res.json(foundRule);
            }
            else {
                const newRule = await Rule.create(req.body);
                return res.json(newRule);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            req.body.rule_url = sanitizer.sanitize(req.body.rule_url);
            req.body.boardgame_related = sanitizer.sanitize(boardgame_related);
            
            const foundRule = await Rule.findByPk(req.params.id);
            if(foundRule){
                foundRule.update(req.body);
                res.json(foundRule);
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
            const result = await Rule.destroy({
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

module.exports = ruleController;