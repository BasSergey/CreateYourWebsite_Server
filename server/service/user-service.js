// const UserModel = require('../models/user-model')
const db = require('../models/models.js');
const UserModel = db.users
const bcrypt = require('bcrypt'); //для формирования ключа, используемая для защищенного хранения паролей
const uuid = require('uuid') //генерерует рандомные строки
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dtos');
const ApiError = require('../expections/api-error');
const Basket = require('../models/basket.js');

class UserService {  //вся логика прописывается в сервисах // этот сервис для работы с пользователем
    async registration(email, password, role) {
        const candidate = await UserModel.findOne({ where: { email: email } })//нет ли такого же пользователя с этим email
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3) //для хеширования пароля, чтобы в бд не хранить в открытом виде
        const activationLink = uuid.v4() //сылка для активации

        const user = await UserModel.create({ email, password: hashPassword, activationLink, role }); //сохраняем пользователя в бд
        await mailService.sendActivationMail(email, `http://localhost:8080/api/activate/${activationLink}`); //отправляется письмо для активации, и ссылку на эндпойнт, он переходит и акк активируется

        const basket = await Basket.create({ userId: user.id })

        const userDto = new UserDto(user); //отправка письма //id, email, isActivated. UserDto для того чтобы не помещать всю информацию о пользователе(простой класс, который обладает любыми полями), делаем те поля который нам нужны

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }

    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ where: { activationLink: activationLink } })
        if (!user) {
            throw ApiError.BadRequest("Неккоректная ссылка активации")
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: { email: email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        } //если есть с таким email нужно проверить password
        const isPassEquals = await bcrypt.compare(password, user.password) //второй пароль, это пароль из бд, compere помогает сравнить с паролем в бд
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неккоректный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto }); //генерация токена
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken) //удаление refresh token из бд
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError
        }
        //если не залогин то
        const user = await UserModel.findByPk(userData.id) //нахождение пользователя
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto }); //генерация токена
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}
module.exports = new UserService()
