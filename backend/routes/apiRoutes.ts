export {};

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


// Define your routes
router.post('/mangaRecommendations', apiController.mangaRecommendations);

module.exports = router;