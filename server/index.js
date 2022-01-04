import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded( {limit:"30mb", extended: true} ));

app.use(cors()) //must be above the imports for routes

app.use('/posts', postRoutes)
app.use("/users", userRoutes)

//test server deployment on heroku
app.get("/", (req,res) => {
    res.send("Welcome to moments-app API!, you'll get there, stay patient")
})

const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then (() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch ((error) => console.log(error.message))