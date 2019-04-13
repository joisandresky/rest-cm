const express = require('express');
const router = express.Router();
const controller = require('./cashIn.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;