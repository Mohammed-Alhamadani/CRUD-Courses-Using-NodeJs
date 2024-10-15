const express = require('express');
const { body } = require('express-validator');

const Controller = require('../controllers/courses.controller');

const router = express.Router();

// API to Get all Courses
router.get('/', Controller.getAllCourses);

// API to get a course by id
router.get(`/:id`, Controller.getCourseById);

// API to Create a New Course
router.post(
    '/',
    [
        body('title', 'Title Is Required').notEmpty().isLength({ min: 2 }),
        body('price', 'Price Is Required').notEmpty(),
    ],
    Controller.addNewCourse
);

// API to Update the course
router.patch('/:id', Controller.updateCourse);

// API to Delete a course
router.delete('/:id', Controller.deleteCourse);

module.exports = router;
