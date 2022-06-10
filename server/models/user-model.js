// module.exports = (sequelize, Sequelize) => {
const sequelize  = require('../db')
const {DataTypes} = require('sequelize')
const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
    },
    activationLink: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    }
});
module.exports = User
//     return User
// }