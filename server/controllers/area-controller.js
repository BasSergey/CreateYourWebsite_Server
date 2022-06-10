const Area = require('../models/course-area')
const ApiError = require('../expections/api-error')

class AreaController {

    async create(req, res) {
        const { name } = req.body
        const area = await Area.create({ name })
        return res.json(area)
    }

    async getAll(req, res) {
        const areas = await Area.findAll()
        return res.json(areas)
    }
}

module.exports = new AreaController()