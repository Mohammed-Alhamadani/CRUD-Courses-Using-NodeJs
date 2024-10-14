const { validationResult } = require('express-validator');

const httpStatus = require('./httpStatus');

// Importing Courses
const Course = require('./course.model');
// get all courses from database using course model
const getAllCourses = async (req, res) => {
    const courses = await Course.find({}, { __v: false });
    console.log(courses);
    res.json({ status: httpStatus.SUCCESS, data: { courses } });
};

const getCourseById = async (req, res) => {
    try {
        // console.log(req.params.id);
        let id = req.params.id;
        // const courses = Course.find((course) => course.id == id);
        const courses = await Course.findById(id);
        if (!courses) {
            return res
                .status(404)
                .json({ status: httpStatus.FAIL, data: { courses: null } });
        } else {
            res.json({ status: httpStatus.SUCCESS, data: { courses } });
        }
    } catch (error) {
        return res.status(400).json({
            status: httpStatus.ERROR,
            data: null,
            message: error.message,
            code: 400,
        });
    }
};

const addNewCourse = async (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.price);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatus.FAIL,
            data: { errors: errors.array() },
        });
    }
    // courses.push({
    //     id: courses.length + 1,
    //     ...req.body,
    // });
    // const course = { id: courses.length + 1, ...req.body };
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({
        status: httpStatus.SUCCESS,
        data: { courses: newCourse },
    });
};

const updateCourse = async (req, res) => {
    try {
        let id = req.params.id;
        // let course = courses.find((course) => course.id == id);
        const updatedCourse = await Course.updateOne(
            { _id: id },
            {
                $set: { ...req.body },
            }
        );
        if (!Course) {
            return res
                .status(404)
                .json({ status: httpStatus.FAIL, data: errors.array() });
        }
        // course = { ...course, ...req.body };
        res.status(200).json({
            status: httpStatus.SUCCESS,
            data: { course: updatedCourse },
        });
    } catch (err) {
        return res
            .status(400)
            .json({ status: httpStatus.ERROR, message: err.message });
    }
};

const deleteCourse = async (req, res) => {
    let id = req.params.id;

    const deletedCourse = await Course.deleteOne({ _id: id }).then(() => {});
    // courses = courses.filter((course) => {
    //     course.id != id;
    //     // if (!id) {
    //     //     return res.status(404).json({ msg: 'Course Not Found' });
    //     // }
    // });
    res.status(200).json({ status: httpStatus.SUCCESS, data: null });
};
module.exports = {
    getAllCourses,
    getCourseById,
    addNewCourse,
    updateCourse,
    deleteCourse,
};
