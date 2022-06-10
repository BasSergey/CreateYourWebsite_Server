module.exports = class ApiError extends Error{ //этот класс расширяет стандартный error
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);;
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(){ //static function, это функции которые можно вызывать без создания обьекте, тоесть можно вызывать через класс
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors=[]){
        return new ApiError(400, message, errors);
    }
    
    static forbidden(message){
        return new ApiError(403, message);
    }
}