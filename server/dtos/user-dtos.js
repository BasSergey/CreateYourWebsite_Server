// data transfer object
module.exports = class UserDto{
    emai;
    id;
    isActivated;
    
    constructor(model) {
        this.email = model.email;
        this.id = model.id; 
        this.isActivated = model.isActivated;
        
    }
}

    