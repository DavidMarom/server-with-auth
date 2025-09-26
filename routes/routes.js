const express = require('express');
const router = express.Router();
const app = express()

app.use(express.json());


router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "user" && password === "pass") {
        const token = "12345"; // replace with actual token generation logic

        // send the token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // prevents client-side JS from accessing the cookie
            secure: false, // set to true if using HTTPS
            sameSite: "lax", // prevents CSRF
            path: "/", // cookie is accessible on the entire site
            maxAge: 1000 * 10 * 60 // cookie expires in 10 minutes
        });
        res.json("Cookie has been set");
    }
    else {
        res.status(401).json("Invalid credentials");
    }
});


module.exports = router;