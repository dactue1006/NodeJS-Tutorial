const express = require('express');
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', (req, res, next) => {
  res.cookie('user-id', 12345);
  res.send('hello');
})

router.get('/search', controller.search)

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.get);

module.exports = router;