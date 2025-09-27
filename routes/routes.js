const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { isAuthorized } = require('./middlewares');
const { isTokenActive, addActiveToken, removeActiveToken } = require('../services/activeTokens');

const app = express()
app.use(express.json());

const hashUserPass = async (user, pass) => {
    return await bcrypt.hash(`${user}:${pass}`, 3);
}

const DB = [{ id: 1, name: "Book1" }, { id: 2, name: "Book2" }, { id: 3, name: "Book3" }]
const USERS = [{ id: 1, username: "user", password: "$2b$04$iBaz4//U75Idqv6ioCYBEe2ImhTcW4mWpDqNIjS.PPaulBNMZ5CWy" }]


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);

    // If the username exists and the password matches:
    if (USERS.find(u => u.username === username && bcrypt.compareSync(`${username}:${password}`, u.password))) {
        const token = await hashUserPass(username, password);
        addActiveToken(token);
        res.json({ bearer: token });
    }
    else {
        res.status(401).json("Invalid credentials");
    }
});

router.post("/logout", (req, res) => {
    const token = req.headers.authorization
    removeActiveToken(token);
    res.json("Logged out");
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (USERS.find(u => u.username === username)) {
        res.status(409).json("Username already exists");
    } else {
        const hashedPass = await hashUserPass(username, password);
        USERS.push({ id: USERS.length + 1, username, password: hashedPass });
        res.json("User registered");
    }
});


router.get("/books", isAuthorized, async (req, res) => {
    const token = req.headers.authorization
    if (token && isTokenActive(token)) {
        res.json(DB);
    } else {
        res.status(401).json("Unauthorized");
    }
});

module.exports = router;