const uuid = require('uuid')
const path = require('path')
const Course = require('../models/course')
const CourseInfo = require('../models/course-info') 
const ApiError = require('../expections/api-error')

class CourseController {
    async create(req, res, next) {
        try {
            let { name, price, areaId, typeId, info } = req.body
            const { img } = req.files
            let filename = uuid.v4() + '.jpg'//генерация имени для файла, чтобы его можно было потом найти
            img.mv(path.resolve(__dirname, '..', 'static', filename)) //перемещение файла в static, для его хранения
            const course = await Course.create({ name, price, areaId, typeId, img: filename }) //ratinfg не указываем, он по дефолту 0

            if (info) {
                into = JSON.parse(info)
                info.forEach(i => CourseInfo.create({
                    title: i.title,
                    description: i.description,
                    courseId: course.id
                }))
            }

            return res.json(course)
        } catch (e) {
            next(ApiError.BadRequest(e.message)) //параметром передаем ошибку
        }
    }

    async getAll(req, res) {
        let { areaId, typeId, limit, page } = req.query //limit(количетсво дейвайсов отображаемых на одной странице) page для подстраничного вывода
        page = page || 1
        limit = limit || 9 //если лимит не указан, то по 9 видов курсов на одной странице
        let offset = page * limit - limit
        let courses;
        if (!areaId && !typeId) {
            courses = await Course.findAndCountAll({ limit, offset }) //findAndCountAll -чтобы знать общее кол-во товаров которые вернутся по опр запросу, чтобы на фронте было проще посчиать страницы
        }
        if (areaId && !typeId) {
            courses = await Course.findAndCountAll({ where: { areaId }, limit, offset })
        }
        if (!areaId && typeId) {
            courses = await Course.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (areaId && typeId) {
            courses = await Course.findAndCountAll({ where: { typeId, areaId }, limit, offset })
        }
        return res.json(courses)
    }

    async getOne(req, res) {
        const { id } = req.params //id который указывали в роутере
        const course = await Course.findOne(
            {
                where: {id},
                include: [{model: CourseInfo, as: 'info' }] //для получение массива характеристик, так как этот запрос будет срабывать при открытии страницы
            },
        )
        return res.json(course)
    }
}

module.exports = new CourseController()