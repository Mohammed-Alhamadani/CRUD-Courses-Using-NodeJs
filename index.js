const express = require("express");
const app = express();
const cors = require("cors");
const httpStatus = require("./httpStatus");
// const { MongoClient } = require('mongodb');
const dotenv = require("dotenv").config();
const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;
const path = require("path");
// const client = new MongoClient(url);

// //  connect mongo db
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

// connect mongo db using Mongoose

const mongoose = require("mongoose");

mongoose.connect(url).then(() => console.log("Database Connected!"));

const { validationResult } = require("express-validator");
const Controller = require("./controllers/courses.controller");

// const validationSchema = require('./validationSchema');

app.use(express.json());
app.use(cors());

const courseRouter = require("./routes/course.routes");
const usersRouter = require("./routes/user.routes");

// Load HTML Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// For serving static files (js/css/images all should be inside public folder)
app.use(express.static("public"));
app.use("/api/courses", courseRouter);
app.use("/api/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://0.0.0.0:${process.env.PORT}`);
});
