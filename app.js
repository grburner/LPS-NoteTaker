const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
});

app.post('/api/notes', async (req, res) => {
    let thisRecord = { "title": req.body.title, "text": req.body.text, "id": 1 }
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        let recordObj = JSON.parse(data)
        recordObj['records'].push(thisRecord)
        console.log(JSON.stringify(recordObj))
        console.log()
    });
    res.end()
});

app.delete('/api/notes/:id', (req, res) => {
    res.send('<h1>your at API</h1>')
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('/notes', (req, res) => {
    console.log(req.body)
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})

app.listen(3000, () => {
    console.log('The app is running on localhost:3000')
});

class NoteRecord{
    constructor(title, body, id) {
        this.title = title,
        this.body = body,
        this.id = id
    }
}



// let thisRecord = new NoteRecord(req.body.title, req.body.text, 1)
// console.log(thisRecord.title, thisRecord.body)
// let toWrite = []
// fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//     if (err) throw err;
//     if (!data) {
//         console.log('into if')
//         toWrite.push(thisRecord)
//         console.log(toWrite)
//         fs.writeFile('./db/db.json', toWrite, (err) => {
//             if (err) throw err;
//             console.log('file saved in if')
//         })
//     } else {
//         fs.writeFile('./db/db.json', toWrite, (err) => {
//             if (err) throw err;
//             console.log('file saved in else')
//     });
// res.end()
// };
// });