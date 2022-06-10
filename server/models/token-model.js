// module.exports = (sequelize, Sequelize) => {
// module.exports = (sequelize, Sequelize) => {
const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const Token = sequelize.define("tokens", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.INTEGER,
        ref: 'users'
    },
    refreshToken: {
        type: DataTypes.STRING,
        required: true,
    }
});
module.exports = Token
    // return Token
// }