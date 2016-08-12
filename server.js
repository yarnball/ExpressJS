console.log('May Node be with you')

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

// ejs.filters.last = function(obj) {
//   return obj[obj.length - 1];
// };

MongoClient.connect('mongodb://*****:*****@ds145325.mlab.com:45325/gigst-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.post('/actionhtmlref', (req, res) => {
  db.collection('db_area').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/templato', (req, res) => {
  db.collection('templato').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/test')
  })
})

app.get('/', (req, res) => {
  db.collection('db_area').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {db_areas: result})
  })
})

app.get('/test', (req, res) => {
  db.collection('templato').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index1.ejs', {templato: result})
  })
})

// app.put('/actionhtmlref', (req, res) => {
//   db.collection('db_area')
//   .findOneAndUpdate({name: 'Yoda'}, {
//     $set: {
//       name: req.body.name,
//       quote: req.body.quote
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.delete('/actionhtmlref', (req, res) => {
//   db.collection('db_area').findOneAndDelete({name: req.body.name}, 
//   (err, result) => {
//     if (err) return res.json(500, err)
//     res.json('A darth vadar quote got deleted')
//   })
// })


// db.collection('db_area').find().toArray(function(err, results) {
//   console.log(results)
//   // send HTML file populated with quotes here
// })
