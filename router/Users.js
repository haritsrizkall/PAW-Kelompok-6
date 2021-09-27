const express = require('express');
const router = express.Router();
const User = require('../controllers/Users');

router.post('/', User.addUser);
router.get('/:id?', User.getUsers);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);
module.exports = router;