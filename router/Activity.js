const express = require('express');
const router = express.Router();
const Activity = require('../controllers/Activity');
const Authorization = require('../middleware/authorization');

router.post('/', Authorization, Activity.addActivity);
router.get('/:id?', Authorization, Activity.getActivity);
router.patch('/:id', Authorization, Activity.updateActivity);
router.delete('/:id', Authorization, Activity.deleteActivity);
module.exports = router;