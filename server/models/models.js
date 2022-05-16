//  этот файл запысывет все с бд
const Sequelize = require("sequelize");
const sequelize = new Sequelize("create_your_website", "sergey", "password", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false
  }
});
db = {};
db.sequelize = sequelize;//!подключение от базы данныx
db.Sequelize = Sequelize;
db.users = require('./user-model')(sequelize,Sequelize); 
db.tokens = require('./token-model')(sequelize,Sequelize); 
// db.computers = require('./ComputerModel')(sequelize,Sequelize); 
 
module.exports = db;
//!Таким образом объект db доступен в любом месте проекта. В данном файле мы делаем всю настройку касающуюся базы данных