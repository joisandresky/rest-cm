const express = require('express');
const router = express.Router();
const controller = require('./employee.controller');

// Get All Data Jobs
router.get('/', controller.index);

// Show One Data Job
router.get('/:id', controller.show);

// Create Data Job
router.post('/', controller.create);

// Update data Job
router.put('/:id', controller.update);

// Delete Data Job
router.delete('/:id', controller.destroy);

module.exports = router;