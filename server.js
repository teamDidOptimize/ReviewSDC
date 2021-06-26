if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
var pool = require('./database/insertData.js');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
app.use(express.static('public'));

app.get('/fetchReviews', (req, res) => {
  let productId = req.query.productId;
  pool.query(`SELECT * FROM reviews
              LEFT JOIN (SELECT id AS photoId, review_id, url FROM reviewsphotos)reviewsphotos
              ON reviews.id = reviewsphotos.review_id WHERE reviews.product_id = ${productId};`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    } else {
      var resultObject = {
        product: productId,
        page: 0,
        count: 5,
        results: result.rows,
      };
    }

    var copyOfResults = resultObject.results.slice(0);
    for (let i = 0; i < copyOfResults.length; i++) {
      copyOfResults[i].photos = [];
    }

    for (let i = 0; i < copyOfResults.length; i++) {
      for (let j = 0; j < copyOfResults.length; j++) {
        if (resultObject.results[j].id === copyOfResults[i].id) {
          if (resultObject.results[j].url !== null) {
            var tempObject = {
              url: resultObject.results[j].url
            };
            copyOfResults[i].photos.push(tempObject);
          }
        }
      }
    }

    var seenBefore = {};
    var temp = [];

    for (let i = 0; i < copyOfResults.length; i++) {
      if (seenBefore[copyOfResults[i].id] === undefined) {
        temp.push(copyOfResults[i]);
        seenBefore[copyOfResults[i].id] = 1;
      }
    }
    res.send(temp);
  });
});




app.get('/meta', (req, res) => {
  let productId = req.query.productId;
  let rating = req.query.rating;
  pool.query(`SELECT * FROM characteristics, characteristicsreviews
             WHERE characteristics.product_id = ${productId}
             AND characteristics.id = characteristicsreviews.characteristic_id;`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    } else {

      var resultObject = {
        ratings: {},
        recommended: {},
        characteristics: {}
      };

      for (var i = 0; i < result.rows.length; i++) {
        for (var key in result.rows[i]) {
          var currentValue = result.rows[i][key];
          if (key === 'value') {
            if (resultObject['ratings'][currentValue] === undefined) {
              resultObject['ratings'][currentValue] = 1;
            } else {
              resultObject['ratings'][currentValue]++;
            }
          }

          if (key === 'name') {
            var charValue = result.rows[i].value;
            if (resultObject.characteristics[currentValue] === undefined) {
              resultObject.characteristics[currentValue] = {value: 0};
            }
            resultObject.characteristics[currentValue].value += charValue/5;
          }

        }
      }
      console.log(resultObject);
      res.send(result.rows);
    }
  });
});

app.put('/report', (req, res) => {
  let productId = req.query.productId;
  let reviewId = req.query.reviewId;
  pool.query(`UPDATE reviews
             SET reported = false
             WHERE reviews.product_id = ${productId} AND reviews.id = ${reviewId};`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(404);
    } else {
      console.log(reviewId);
      console.log(productId);
      res.send('Reported Review');
    }
  });
});


// // setup database connections
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('Connected to Mongoose'));

// set initial routes
// app.use('/', indexRouter);


// setup port listening
console.log('Nodemon listening on ' + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000);