const jwt = require('jsonwebtoken')
const tokenModel = db.tokens
// const tokenModel = require('../models/token-model').Token
class TokenService{
    generateTokens(payload){ //генерация access, refresh token
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'}) //время жизни токена
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'}) //если не заходил на сервис 30 дней, то заново логинится
        return{
            accessToken,
            refreshToken
        }
    } 

    validateAccessToken(token){ //проверка на токен, что он не истек и тд Access token
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData;
        }catch(e){
            return null;
        }
    }

    validateRefreshToken(token){ //проверка на токен, что он не истек и тд
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData;
        }catch(e){
            return null
        }
    }

    async saveToken(userId, refreshToken) { //для сохр в бд по id пользователя//НЕБОЛЬШОЙ НЕДОСТАТОК: При таком подходе, в бд  у каждого юзера по одному токену. Если пользователь залогиниться на другом устройстве, с предыдущего устройства в котором был залогин, вас выкинет. Так как токен пезатрется и в бд, будет сохр новый токен. Можно сохранять по несколько токенов на юзера, но токены перезаписываются и переодически токены будут умирать. Если не продумать, то как удалять протухшие токены с бд, то бд будет слишком нагружена токенами.  
        const tokenData = await tokenModel.findOne({where:{user: userId}})
        if (tokenData){ //если в бд что-то нашли, то у этого поля перезаписываем refresh token
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        //если нет то 
        const token = await tokenModel.create({user:userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) { //для удаления
        const tokenData = await tokenModel.destroy({where:{refreshToken:refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) { //поиск токена в бд
        const tokenData = await tokenModel.findOne({where: {refreshToken: refreshToken}})
        return tokenData;
    }

}

module.exports = new TokenService()