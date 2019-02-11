const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const multer = require('multer')
const MongoClient = require('mongodb').MongoClient

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
    // send HTML file populated with quotes here
    res.send(result)
  })
});

app.post('/', upload.array(), function(req, res) {
    db.collection('states').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
  });

  
  
MongoClient.connect('mongodb://SECRET@ds331145.mlab.com:31145/tetris', (err, client) => {
    if (err) return console.log(err);
    db = client.db('tetris')
    app.listen(9000, ()=>{
        console.log('listening...');
    });
});