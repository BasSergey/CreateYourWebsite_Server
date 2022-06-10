const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const router = new Router();
const { body } = require('express-validator'); //для валидации тела запроса
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
    body('email').isEmail(), //указываеим какое поле хотим проверить
    body('password').isLength({ min: 3, max: 32 }), //указываеим какое поле хотим проверить, длина массива
    userController.registration) //указываем какие эндпойнты будут

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate) //для активации аккаунта по почте
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers) //получение список пользователей
// router.get('/auth', authMiddleware, userController.check) //получение список пользователей

// router.get('/auth', authMiddleware, userController.check)

module.exports = router