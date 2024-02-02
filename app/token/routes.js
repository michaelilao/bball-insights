const router = require('express').Router();
const controller = require('./controller');
const schemas = require('./models');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

router.post('/validate', validate(schemas.token, 'body'), authenticate, controller.validateToken);
router.get('/', controller.getToken);

module.exports = router;
