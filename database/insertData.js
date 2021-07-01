//Connects to our database

const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'Simon',
  database: 'reviewsoverview'
});

//If connected, console log connected to postgres
pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Postgres');
  }
});


/* EVERYTHING BELOW HERE IS COMMENTED OUT BECAUSE THE DATA IS ALREADY IN THE DB */



//Runs a query to copy into a table named 'reviewphotos' into columns (id, review_id, url) from currentDirectory/dataCSV/reviews_photos.csv
//if err, console log err and failed 'reviewsphotos'
//if not, console log successfully added 'reviewsphotos'
//Repeat process for all tables

// pool.query(`COPY reviewsphotos(id, review_id, url) FROM '${__dirname}/dataCSV/reviews_photos.csv' DELIMITER ',' CSV HEADER;`, (err, result) => {
//   if (err) {
//     console.log(err);
//     console.log('failed reviewsphotos');
//   } else {
//     console.log('successfully added reviewsphotos');
//   }
// });

// pool.query(`COPY reviews(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '${__dirname}/dataCSV/reviews.csv' DELIMITER ',' CSV HEADER;`, (err, result) => {
//   if (err) {
//     console.log(err);
//     console.log('failed reviews');

//   } else {
//     console.log('successfully added reviews');
//     console.log('finished all data importing');
//   }
// });

// pool.query(`COPY characteristics(id,product_id,name) FROM '${__dirname}/dataCSV/characteristics.csv' DELIMITER ',' CSV HEADER;`, (err, result) => {
//   if (err) {
//     console.log(err);
//     console.log('failed characteristics');

//   } else {
//     console.log('successfully added characteristics');
//   }
// });

// pool.query(`COPY characteristicsreviews(id,characteristic_id,review_id,value) FROM '${__dirname}/dataCSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;`, (err, result) => {
//   if (err) {
//     console.log(err);
//     console.log('failed characteristicreviews');

//   } else {
//     console.log('successfully added characteristicreviews');
//   }
// });

module.exports = pool;
