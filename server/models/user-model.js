module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING,
            unique: true,
            required: true,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
        },
        activationLink: {
            type: Sequelize.STRING
        }
    });
    return User
}