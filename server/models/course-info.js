// module.exports = (sequelize, Sequelize) => {
const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const CourseInfo = sequelize.define("course_info", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
// return CourseInfo;
// }
module.exports = CourseInfo