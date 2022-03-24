const { Editor } = require('../models');

const editorController = {
    async getAll(req, res, next) {
        try {
            const editors = await Editor.findAll();
            if(editors){
                return res.json(editors);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async getBoardgameByEditor(req, res, next) {
        try {
            const boardgamesByEditor = await Editor.findOne({
                where: {
                    editor_name: req.params.editor,
                },
                include: ['boardgames'],
            });
            if(boardgamesByEditor){
                return res.json(boardgamesByEditor);
            }
            next();
        } catch(error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const foundEditor = await Editor.findOne({
                where: {
                    editor_name: req.body.editor_name,
                }
            });
            if(foundEditor){   
                return res.json(foundEditor);
            }
            else {
                const newEditor = await Editor.create(req.body);
                return res.json(newEditor);
            }
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async update(req, res, next) {
        try {
            const foundEditor = await Editor.findByPk(req.params.id);

            foundEditor.update(req.body);

            res.json(foundEditor);
        } catch(error) {
            res.status(400).json({
              error: error.message
            });
        }
    },

    async delete(req, res, next) {
        try{
            const result = await Editor.destroy({
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

module.exports = editorController;