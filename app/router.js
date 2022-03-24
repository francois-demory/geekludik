const express = require('express');
const ageController = require('./controllers/ageController');
const authorController = require('./controllers/authorController');
const boardgameController = require('./controllers/boardgameController');
const designerController = require('./controllers/designerController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('all good');
})

router.get('/boardgames', boardgameController.getAll);
router.get('/boardgames/:name', boardgameController.getOneById);

router.get('/ages', ageController.getAll);
router.get('/ages/:age', ageController.getBoardgameByAge);
router.post('/ages', ageController.create);
router.delete('/ages/:id', ageController.delete);

router.get('/authors', authorController.getAll);
router.get('/authors/author', authorController.getBoardgameByAuthor);
router.post('/authors', authorController.create);
router.patch('/authors/:id', authorController.update);
router.delete('/authors/:id', authorController.delete);

router.get('/designers', designerController.getAll);

// 404
router.use((req, res) => {
    res.status(404).json({
      error: '404 not found'
    });
  });

module.exports = router;