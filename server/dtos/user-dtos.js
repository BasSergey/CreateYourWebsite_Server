// data transfer object
module.exports = class UserDto{
    emai;
    id;
    isActivated;
    role;
    
    constructor(model) {
        this.email = model.email;
        this.id = model.id; 
        this.isActivated = model.isActivated;
        this.role = model.role;
        
    }
}

    