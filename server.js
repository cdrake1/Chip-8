const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'web')));
app.use('/roms', express.static(path.join(__dirname, 'roms')));


//route for server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', './web/index.html'));
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
