const express = require('express');
const path = require('path'); 
const db = require('./db/db.json');
const fs = require('fs');

const app = express(); 

const PORT = process.env.PORT || 5000;   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/pages/notes.html')));
app.post('/notes', (req, res) => {
    if(req.body.title && req.body.text){
        alert('noticed');
        const nuNote = {
            "title": req.body.title, 
            "text": req.body.text
        }
        JSON.parse(res.json(db)).push(nuNote);
        console.log(res.json(db));
    }
});


app.get('/api/notes', (req, res) => { res.json(db) });

app.post('/api/notes', (req, res) => {

    const writeToFile = (destination, content) => {
        fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
        );
    }


    const update = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                writeToFile(file, parsedData);
            }
        });
    };

    if (req.body && req.body.title && req.body.text) {
        console.info(`${req.method} request received to upvote a review`);
        let newData = req.body;
        update(newData, './db/db.json');
    }else {
        res.status(500).json('Review ID not found');
    }
})

app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));