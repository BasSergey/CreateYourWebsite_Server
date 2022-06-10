// module.exports = (sequelize, Sequelize) => {
const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const Course = sequelize.define("course", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
//     return Course;
// }
module.exports = Course
