const express = require('express'); //import express
const path = require('path');   //module to assist in file directory/paths

const app = express();  //creates an instance of express/server
const PORT = process.env.PORT || 3000;  //checks if a port is available or defaults to port 3000

//static files... make these directories available to the server
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'web')));
app.use(express.static(path.join(__dirname, 'roms')));

//route for server to serve as entry point for web application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './web/index.html'));
});

//start server using port and listen for HTTP requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
