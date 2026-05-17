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
        
        // Dynamically allow local development origins and any Render subdomain out-of-the-box
        const isAllowed = allowedOrigins.indexOf(origin) !== -1 || 
                          allowedOrigins.includes("*") ||
                          origin.endsWith('.onrender.com') ||
                          origin.includes('localhost') || 
                          origin.includes('127.0.0.1');

        if (isAllowed) {
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

console.log("=== FRONTEND BUILD PATH VERIFICATION ===");
console.log("Expected Path:", frontendBuildPath);
const exists = fs.existsSync(frontendBuildPath);
console.log("Folder Exists:", exists);
if (exists) {
    try {
        console.log("Folder contents:", fs.readdirSync(frontendBuildPath));
        const assetsPath = path.join(frontendBuildPath, 'assets');
        if (fs.existsSync(assetsPath)) {
            console.log("Assets contents:", fs.readdirSync(assetsPath));
        } else {
            console.log("Assets directory does not exist!");
        }
    } catch (err) {
        console.error("Error listing files:", err.message);
    }
}
console.log("=========================================");

if (exists) {
    app.use(express.static(frontendBuildPath));
    
    // Serve React SPA index.html for any non-API routes
    app.get(/(.*)/, (req, res, next) => {
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
            if (err) {
                console.error("Error sending index.html:", err.message);
                next(err);
            }
        });
    });
}

// Global unhandled error logging middleware
app.use((err, req, res, next) => {
    console.error("=== UNHANDLED ROUTE ERROR ===");
    console.error("URL:", req.url);
    console.error("Method:", req.method);
    console.error(err.stack || err);
    console.log("=============================");
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

module.exports = app;


