const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('all good');
})

// router.route('/')
//     .get()

module.exports = router;