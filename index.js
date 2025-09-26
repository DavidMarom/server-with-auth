const cors = require('cors')
const express = require('express')
const routes = require('./routes/routes');

const app = express()


app.use(cors({
    origin: 'http://localhost:3001',      // must be the exact origin (no '*')
    credentials: true,                     // allow cookies/Authorization
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

app.use('/', routes);

app.listen(3000, () => { console.log(`=== SERVER STARTED ===`) })
