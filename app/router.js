const express = require('express');
const ageController = require('./controllers/ageController');
const boardgameController = require('./controllers/boardgameController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('all good');
})

router.get('/boardgames', boardgameController.getAll);
router.get('/boardgames/:name', boardgameController.getOneById);

router.get('/ages', ageController.getAll);
router.get('/ages/:age', ageController.getBoardgameByAge);
router.post('/ages', ageController.create);
router.delete('/ages', ageController.delete);

// 404
router.use((req, res) => {
    res.status(404).json({
      error: '404 not found'
    });
  });

module.exports = router;