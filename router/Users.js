const express = require('express');
const router = express.Router();
const User = require('../controllers/Users');
const Authorization = require('../middleware/authorization');
const multer = require('multer')

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const upload = multer({storage}).single('avatar');

router.post('/', User.registerUser);
router.post('/login', User.loginUser);
router.get('/:id?', User.getUsers);
router.get('/:id/activities', Authorization, User.getUserActivities);
router.patch('/:id', Authorization, User.updateUser);
router.delete('/:id', Authorization, User.deleteUser);
router.post('/:id/avatar', Authorization, upload, User.uploadAvatar);
module.exports = router;