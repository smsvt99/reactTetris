const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const multer = require('multer')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 9000
const db_uri = process.env.MONGODB_URI

let upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.get('/states', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*')
    console.log('get Req at states');
    db.collection('states').find().toArray(function(err, result) {
    // console.log(result);
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    result.sort(function(a, b){
        return b.score - a.score;
    })
    // send HTML file populated with quotes here
    res.send(result)
  })
});

app.post('/', upload.array(), function(req, res) {
    db.collection('states').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
  });

  
  
MongoClient.connect(db_uri, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db('tetris')
    app.listen(PORT, ()=>{
        console.log('listening...');
    });
});