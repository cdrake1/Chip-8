const express = require('express'); //import express
const app = express();  //creates an instance of express/server
const path = require('path');   //module to assist in file directory/paths
const PORT = process.env.PORT || 3000;  //checks if a port is available or defaults to port 3000

//static files... make these directories available to the server
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'web')));
app.use(express.static(path.join(__dirname, 'roms')));

//route for server to serve as entry point for web application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './web/index.html'));
});

//post request to accept file input in browser
/*
app.post('/uploadFile',function(req,res){
    if(req.file){
        res.send('File uploaded successfully!');
    }
    else{
        res.status(404).send("An error occurred when uploading the file");
    }
})
*/

//post request to accept file input in browser/html
app.post('/uploadFile',function(req,res){
    const selectedROM = req.body.romSelect;

    const romPath = path.join('roms', `${selectedROM}`);
    res.send('ROM loaded and processed successfully!' + romPath);
})

//start server using port and listen for HTTP requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
