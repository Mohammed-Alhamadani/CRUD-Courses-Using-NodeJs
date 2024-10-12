const { validationResult } = require('express-validator');

// Importing Courses
let { courses } = require('./data');

const getAllCourses = (req, res) => {
    res.json(courses);
};

const getCourseById = (req, res) => {
    // console.log(req.params.id);
    let id = req.params.id;
    const course = courses.find((course) => course.id == id);
    if (!course) {
        res.status(404).json({ msg: 'Course Not Found' });
    }
    res.json(course);
};

const addNewCourse = (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.price);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    courses.push({
        id: courses.length + 1,
        ...req.body,
    });
    const course = { id: courses.length + 1, ...req.body };
    res.status(201).json(course);
};

const updateCourse = (req, res) => {
    let id = req.params.id;
    let course = courses.find((course) => course.id == id);
    if (!course) {
        res.status(404).json({ msg: 'Course Not Found' });
    }
    course = { ...course, ...req.body };
    res.status(200).json(course);
};

const deleteCourse = (req, res) => {
    let id = req.params.id;
    courses = courses.filter((course) => {
        course.id != id;
        // if (!id) {
        //     return res.status(404).json({ msg: 'Course Not Found' });
        // }
    });
    res.status(200).json({ success: 'Course Been Deleted' });
};
module.exports = {
    getAllCourses,
    getCourseById,
    addNewCourse,
    updateCourse,
    deleteCourse,
};
