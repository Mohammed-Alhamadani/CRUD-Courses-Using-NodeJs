const express = require('express');
const app = express();
const port = 3002;

const { validationResult } = require('express-validator');
const Controller = require('./controller');

const validationSchema = require('./validationSchema');

app.use(express.json());
const courseRouter = require('./routes');

app.use('/api/courses', courseRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
