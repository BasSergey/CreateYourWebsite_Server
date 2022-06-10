// module.exports = (sequelize, Sequelize) => {
const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const BasketCourse = sequelize.define("basket_course", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
// return BasketCourse
// } 
module.exports = BasketCourse