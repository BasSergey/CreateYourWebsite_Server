const { sequelize } = require('../db')
const Sequelize = require("sequelize");
db = {};
db.sequelize = sequelize; //!подключение от базы данныx
db.Sequelize = Sequelize;
db.users = require('./user-model');
db.tokens = require('./token-model');
db.basket = require('./basket');
db.course_rating = require('./course-rating');
db.basket_course = require('./basket-course');
db.course = require('./course');
db.course_area = require('./course-area');
db.course_info = require('./course-info');
db.course_type = require('./course-type');
db.type_area = require('./type-area');

// db.users.hasOne(db.tokens)
// db.tokens.belongsTo(db.users) 

db.users.hasOne(db.basket)
db.basket.belongsTo(db.users)

db.users.hasMany(db.course_rating)
db.course_rating.belongsTo(db.users)

db.basket.hasMany(db.basket_course)
db.basket_course.belongsTo(db.basket)

db.course_type.hasMany(db.course)
db.course.belongsTo(db.course_type)

db.course_area.hasMany(db.course)
db.course.belongsTo(db.course_area)

db.course.hasMany(db.course_rating)
db.course_rating.belongsTo(db.course)

db.course.hasMany(db.basket_course)
db.basket_course.belongsTo(db.course)

db.course.hasMany(db.course_info, {as:'info'}) //info название поле для массива характеристик
db.course_info.belongsTo(db.course)

db.course_type.belongsToMany(db.course_area, { through: db.type_area })
db.course_area.belongsToMany(db.course_type, { through: db.type_area })

module.exports = db;
//!Таким образом объект db доступен в любом месте проекта. В данном файле мы делаем все что касается с подкл к таблицам и тд