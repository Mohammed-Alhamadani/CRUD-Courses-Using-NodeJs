const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/users.controller');

// API to Get all Users
router.get('/', userController.getAllUsers);

// API to register the user
router.post('/register', userController.register);

// API to login the user
router.post('/login', userController.login);

module.exports = router;
