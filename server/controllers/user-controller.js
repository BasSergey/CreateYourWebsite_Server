const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../expections/api-error')

class UserController{
    
    async registration(req, res, next){
        try{
            const errors = validationResult(req);//достается тело
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) //refreshToken будет хранится в куках, чтобы этот кук нельзя было изменять внутри браузера. httpOnly - чтобы нельзя было посмотретю, изменять кук в браузере
            return res.json(userData) //отправляем в браузер
        }catch (e){
            next(e) //если в next попадает ApiError то он будет обработан
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password) 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) //refreshToken будет хранится в куках, чтобы этот кук нельзя было изменять внутри браузера. httpOnly - чтобы нельзя было посмотретю, изменять кук в браузере
            return res.json(userData) //отправляем в браузер
        }catch (e){
            next(e)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken'); //удаление куки с refreshToken
            return res.json(token);
        }catch (e){
            next(e)
        }
    }

    async activate(req, res, next){
        try{
            const activationLink = req.params.link //из router
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)//отдаем на фронт
        }catch (e){
            next(e)
        }
    }

    
    async refresh(req, res, next){ //for refresh token
        try{  
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken) 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) //refreshToken будет хранится в куках, чтобы этот кук нельзя было изменять внутри браузера. httpOnly - чтобы нельзя было посмотретю, изменять кук в браузере
            return res.json(userData) //отправляем в браузер
        }catch (e){
            next(e)
        }
    }

    async getUsers(req, res, next){ //будет доступно только авторизованным пользователям 
        try{
            const users = await userService.getAllUsers();
            return res.json(users)
        }catch (e){
            next(e) 
        }
    }
}

module.exports = new UserController()//имрортируем экземпляр этого класса