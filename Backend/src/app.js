const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

// using cookie parser
app.use(cookieParser());

app.use(express.json());

// dynamic CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');


// define routes here => http://localhost:5000/api/auth/register, http://localhost:5000/api/auth/login
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Unified deployment: Serve static files from Frontend build if it exists
const frontendBuildPath = path.join(__dirname, '../../Frontend/dist');
if (fs.existsSync(frontendBuildPath)) {
    app.use(express.static(frontendBuildPath));
    
    // Serve React SPA index.html for any non-API routes
    app.get(/(.*)/, (req, res, next) => {
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

module.exports = app;


