require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const pg = require('pg')
const router = require('./router/index')
const PORT = process.env.PORT || 5080;
const app = express()
const errorMiddleware = require('./middlewares/error-middlewares')
const sequelize = require('./db')
const path = require('path')


app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static'))) //для того, чтобы можно было получать картинки
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
})) //для взаимодействия с сервером и браузером
app.use('/api', router) //передаем маршрут по которому router будет отрабатывать 
app.use(errorMiddleware) //он должен быть в самом конце всей цепочки, так как этот middleware замыкающий, не вызываем next

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT} `));
    } catch (e) {
        console.log(e);
    }
}
start();
