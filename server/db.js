//  этот файл запысывет все с бд
const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: "localhost",
        define: {
            timestamps: false
        }
    }
);