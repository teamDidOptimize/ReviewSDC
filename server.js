if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var pool = require('./database/insertData.js');
// setup express server
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

app.use(express.static('public'));

// // setup database connections
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('Connected to Mongoose'));

// set initial routes
// app.use('/', indexRouter);

app.get('/test', (req, res) => {


  pool.query(`SELECT * from reviewphotos;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
    }
  });
  res.send(200);
});


// setup port listening
app.listen(process.env.PORT || 3000);