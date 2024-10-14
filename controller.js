const { validationResult } = require('express-validator');

// Importing Courses
const Course = require('./course.model');
// get all courses from database using course model
const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    console.log(courses);
    res.json(courses);
};

const getCourseById = async (req, res) => {
    try {
        // console.log(req.params.id);
        let id = req.params.id;
        // const courses = Course.find((course) => course.id == id);
        const courses = await Course.findById(id);
        if (!courses) {
            return res.status(404).json({ msg: 'Course Not Found' });
        } else {
            res.json(courses);
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Invalid Object Id' });
    }
};

const addNewCourse = async (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.price);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    // courses.push({
    //     id: courses.length + 1,
    //     ...req.body,
    // });
    // const course = { id: courses.length + 1, ...req.body };
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
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
            return res.status(404).json({ msg: 'Course Not Found' });
        }
        // course = { ...course, ...req.body };
        res.status(200).json(updatedCourse);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

const deleteCourse = async (req, res) => {
    let id = req.params.id;

    await Course.deleteOne({ _id: id }).then(() => {});
    // courses = courses.filter((course) => {
    //     course.id != id;
    //     // if (!id) {
    //     //     return res.status(404).json({ msg: 'Course Not Found' });
    //     // }
    // });
    res.status(200).json({ success: 'Course Been Deleted' });
};
module.exports = {
    getAllCourses,
    getCourseById,
    addNewCourse,
    updateCourse,
    deleteCourse,
};
