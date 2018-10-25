const express = require('express');
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');

const router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search)

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.get);

module.exports = router;