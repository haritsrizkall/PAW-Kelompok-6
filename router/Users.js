const express = require('express');
const router = express.Router();
const User = require('../controllers/Users');
const Authorization = require('../middleware/authorization');

router.post('/', User.registerUser);
router.post('/login', User.loginUser);
router.get('/:id?', User.getUsers);
router.get('/:id/activities', Authorization, User.getUserActivities);
router.patch('/:id', Authorization, User.updateUser);
router.delete('/:id', Authorization, User.deleteUser);
module.exports = router;