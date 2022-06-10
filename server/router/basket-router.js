const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basket-controller')
const authMiddleware = require('../middlewares/auth-middleware')

router.get('/',  basketController.getBasketUser)
router.post('/', basketController.addToBasket)

module.exports = router
