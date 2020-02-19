const express = require('express');
const staticController = require('../controllers/StaticController');

const router = express.Router();

/**
 * Main Page
 */
router.get('/', staticController.index);

module.exports = router;
