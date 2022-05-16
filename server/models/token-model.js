module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", { 
        user: {
            type: Sequelize.STRING,
            ref: 'users'
        },
        refreshToken: {
            type: Sequelize.STRING,
            required: true,
        }
    });
    return Token
}
