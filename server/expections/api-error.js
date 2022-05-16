module.exports = class ApiError extends Error{ //этот класс расширяет стандартный error
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);;
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(){ //static function, это функции которые можно использовать несоздавая экземпляр класса 
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors=[]){
        return new ApiError(401, message, errors);
    }
 
}