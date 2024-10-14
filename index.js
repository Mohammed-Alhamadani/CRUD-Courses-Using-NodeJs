const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
// const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config();
const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// const client = new MongoClient(url);

// // Old way to connect mongo db
// // Database Name
// const dbName = 'CoursesDb';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');

//     //choose the database
//     const db = client.db(dbName);
//     //choose the collection of the database
//     const collection = db.collection('Courses');
//     //get everything.
//     //get Query as find everything with find()& make it as array with toArray().
//     const data = await collection.find().toArray();
//     console.log('data', data);

//     // the following code examples can be pasted here...
// }
// main();

// New way to connect mongo db using Mongoose

const mongoose = require('mongoose');

mongoose.connect(url).then(() => console.log('Database Connected!'));

const { validationResult } = require('express-validator');
const Controller = require('./controller');

const validationSchema = require('./validationSchema');

app.use(express.json());
app.use(cors());
const courseRouter = require('./routes');

app.use('/api/courses', courseRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
