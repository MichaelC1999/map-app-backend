const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.post('/logs', controllers.postLog);

router.get('/markers', controllers.getMarkers);

router.get('/entry/:id', controllers.getEntry);

module.exports = router;