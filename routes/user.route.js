const express = require('express');
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');

const router = express.Router();

const multer = require('multer');
var upload = multer({ dest: './public/uploads/' })


router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
  res.cookie('user-id', 12345);
  res.send('hello');
})

router.get('/search', controller.search)

router.get('/create', controller.create);

router.post('/create', 
  upload.single('avatar'),
  validate.postCreate, 
  controller.postCreate
);

router.get('/:id', controller.get);

module.exports = router;