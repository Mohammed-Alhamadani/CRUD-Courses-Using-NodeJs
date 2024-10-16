const User = require('../models/user.model');
const httpStatus = require('../httpStatus');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    // console.log(users);
    res.json({ status: httpStatus.SUCCESS, data: { users } });
};
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res.status(400).json('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        status: httpStatus.SUCCESS,
        data: { courses: newUser },
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        res.json({
            status: httpStatus.ERROR,
            data: { message: 'You are No Registered' },
        });
    }
    const user = await User.findOne({ email: email });
    const matchPassword = bcrypt.compare(password, user.password);

    if (user && matchPassword) {
        res.json({
            status: httpStatus.SUCCESS,
            data: { user: 'Logged in successful' },
        });
    } else {
    }
};

module.exports = {
    getAllUsers,
    register,
    login,
};
