const Router = require('express').Router;
const router = new Router();
const TypeController = require('../controllers/type-controller')
const checkRole = require('../middlewares/check-role-middleware')

// router.post('/',checkRole('ADMIN'),TypeController.create)
router.post('/',TypeController.create)
router.get('/',TypeController.getAll)

module.exports = router