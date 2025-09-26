const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors({
    origin: 'http://localhost:3001',      // must be the exact origin (no '*')
    credentials: true,                     // allow cookies/Authorization
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
const port = 3000

app.get("/login", (req, res) => {
    res.cookie("token", "12345", {
        httpOnly: true, // prevents client-side JS from accessing the cookie
        secure: false, // set to true if using HTTPS
        sameSite: "lax", // prevents CSRF
        path: "/", // cookie is accessible on the entire site
        maxAge: 1000 * 10 * 60 // cookie expires in 10 minutes
    });
    res.json("Cookie has been set");
});


app.listen(port, () => { console.log(`Listening on port ${port}`) })
