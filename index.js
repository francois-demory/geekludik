require('dotenv').config();

const express = require('express')
const router = require('./app/router');
const multer = require('multer');
const app = express();
const port = process.env.PORT ?? 3000;

const bodyParser = multer();

app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(bodyParser.none())
    .use(router)
    .use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({
          message: 'Something broke!',
          ok: false
        });
      });

app.listen(port, () => {
    console.log(`app is runinng http://localhost:${port}`);
    });