const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const app = express()
app.use(express.json());

const activeTokens = [];
const hashUserPass = async (user, pass) => {
    return await bcrypt.hash(`${user}:${pass}`, 3);
}

const DB = [{ id: 1, name: "Book1" }, { id: 2, name: "Book2" }, { id: 3, name: "Book3" }]
const USERS = [{ id: 1, username: "user", password: "pass" }]


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (USERS.find(u => u.username === username && u.password === password)) {
        const token = await hashUserPass(username, password);
        activeTokens.push(token);
        res.json({ bearer: token });
    }
    else {
        res.status(401).json("Invalid credentials");
    }
});



router.get("/books", (req, res) => {
    const token = req.headers.authorization

    if (token && activeTokens.includes(token)) {
        res.json(DB);
    } else {
        res.status(401).json("Unauthorized");
    }
});


module.exports = router;