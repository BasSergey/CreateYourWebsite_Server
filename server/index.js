require('dotenv').config()
const express = require('express')
const cors  = require('cors')
const cookieParser  = require('cookie-parser')
const pg = require('pg')
const router = require('./router/index')
const PORT = process.env.PORT || 5080;
const app = express()
const errorMiddleware = require('./middlewares/error-middlewares')

app.use(express.json())
app.use(cookieParser())
app.use(cors()) //для взаимодействия с сервером и браузером
app.use('/api', router) //передаем маршрут по которому router будет отрабатывать 
app.use(errorMiddleware) //он должен быть в самом конце всей цепочки

const start = async ()=> {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT} `));
    }catch (e){
        console.log(e);
    }
}
start();
