const Router = require('express').Router;
const router = new Router();
const AreaController = require('../controllers/area-controller')

router.post('/',AreaController.create)
router.get('/', AreaController.getAll)

module.exports = router