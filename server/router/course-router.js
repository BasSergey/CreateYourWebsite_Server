const Router = require('express').Router;
const router = new Router();
const CourseController = require('../controllers/course-controller')

router.post('/',CourseController.create)
router.get('/',CourseController.getAll)
router.get('/:id',CourseController.getOne) 

module.exports = router