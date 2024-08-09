export {};

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


// Define your routes
router.post('/mangaRecommendations', apiController.mangaRecommendations);
router.post('/animeRecommendations', apiController.animeRecommendations);


module.exports = router;