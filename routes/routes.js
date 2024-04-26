// routes/routes.js
const express = require('express');
const router = express.Router();
const cifrarController = require('../controllers/cifrarController');

router.post('/cifrar', cifrarController.cifrarTexto);

module.exports = router;