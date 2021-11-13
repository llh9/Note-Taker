const express = require('express');
const path = require('path'); 

const app = express(); 

const PORT = 3001;   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/pages/notes.html')));

app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));