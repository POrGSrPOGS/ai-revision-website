require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const routes = require("./routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

// routes
app.use("/api", routes);

module.exports = app;