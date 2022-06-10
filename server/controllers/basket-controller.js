const Basket = require('../models/basket')
const BasketCourse = require('../models/basket-course')
const Course = require('../models/course')
const ApiError = require('../expections/api-error')
class BasketController {

    async addToBasket(req, res, next) {
        // try{
        // const user = req.user
        const { courseId } = req.body
        // const basket = await BasketCourse.create({basketId : user.id, courseId: courseId })
        const basket = await BasketCourse.create({ basketId: courseId, courseId: courseId })
        return res.json(basket)
        // }catch(e){
        //     next(new ApiError('ошибка в controller basket',e)) //параметром передаем ошибку
        // }
    }

    async getBasketUser(req, res) {
        // const { id } = req.user
        const basket = await BasketCourse.findAll({
            include: {
                model: Course
            }
            //  where: { basketId: id }
        })

        return res.json(basket)
    }

}

module.exports = new BasketController()