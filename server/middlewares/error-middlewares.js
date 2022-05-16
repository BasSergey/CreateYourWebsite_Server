// На сервер отправляется req, для изменения данных. Middleware это некоторое связывающее звено, между запросом и функией(которая его будет обрабатывать). Прежде чем запрос попадет в функцию, он проходит через цепочку middleware. Например middleware может быть проверкой запроса на соответсвие cors, или токен доступа(для авторизированных пользователей)...И если токен валидный, тогда переходит в функцию. И только потом возвращается response.
//этот будет отвечать за обработку ошибок
const ApiError = require('../expections/api-error')
module.exports = function(err,req, res,next){
    console.log(err);
    if(err instanceof ApiError){
        return res.status(err.status).json({message:err.message, errors:err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}