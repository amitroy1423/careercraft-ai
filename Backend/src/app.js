const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

// using cookie parser
app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
// require all the routes here
const authRouter = require('./routes/auth.routes');

// define routes here => http://localhost:5000/api/auth/register, http://localhost:5000/api/auth/login
app.use('/api/auth', authRouter);

module.exports = app;


