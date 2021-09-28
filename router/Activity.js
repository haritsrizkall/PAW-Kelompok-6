const express = require('express');
const router = express.Router();
const Activity = require('../controllers/Activity');

router.post('/', Activity.addActivity);
router.get('/:id?', Activity.getActivity);
router.put('/:id', Activity.updateActivity);
router.delete('/:id', Activity.deleteActivity);
module.exports = router;