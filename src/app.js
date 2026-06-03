require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production"
    }
}));

app.use("/api", routes);

const clientDistPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});

module.exports = app;