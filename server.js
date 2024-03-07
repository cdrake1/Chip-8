const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Set your desired port number

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'web')));

// Middleware to set MIME types for JavaScript files
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
    }
    next();
});

// Middleware to set MIME types for CSS files
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './web/index.html')); // Assuming your index.html is in the root directory
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});