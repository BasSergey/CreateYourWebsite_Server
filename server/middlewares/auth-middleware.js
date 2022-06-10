//только пользователи кто зарег
const ApiError = require('../expections/api-error')
const tokenService = require('../service/token-service')
module.exports = function (req, res, next) { //next вызывает следующие middleware, которые в цепочке

    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization; //так как токен помещается в header, нам нужно взать его
        if (!authorizationHeader) {
            // return next(ApiError.UnauthorizedError());
            return  next(new ApiError( 'Пользователь не авторизован 1'))
        }
        const accessToken = authorizationHeader.split(' ')[1] //сплит разбиваем, что не было слитно, токен достаем по первому индексу. Example: Bearer sdfngsjdhfbgsjhbdfi...
        if (!accessToken) {
            // return next(ApiError.UnauthorizedError());
            return  next( new ApiError('Пользователь не авторизован 2'))
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            // return next(ApiError.UnauthorizedError());
            return  next( new ApiError('Пользователь не авторизован 3'))
        }
        req.user = userData;
        next();
    } catch (e) {
        // return next(ApiError.UnauthorizedError())
        return  next( new ApiError('Пользователь не авторизован 4'))
    }
}
//мы отправляем запрос на получение пользователей и знаем что этот запрос доступен только авторизованным пользователям. Значит, нужно привязать к запросу токен, делается это через headers, заколовков http. И обычно токен указывает в заголовке Autorisation, сначала тип токен Bearer 