/* Every time we run this schema, we want to drop it before so we don't get mixed up data */
DROP DATABASE IF EXISTS reviewsoverview;

CREATE DATABASE reviewsoverview;

/* \c means USE this database */
\c reviewsoverview;


/*Same statement as above about the schema*/
DROP TABLE IF EXISTS reviewsphotos;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristicsreviews;



/*Create tables as usual*/
CREATE TABLE reviewsphotos (
  id int PRIMARY KEY,
  review_id int,
  url varchar(255)
);

CREATE TABLE reviews (
  id int PRIMARY KEY,
  product_id int,
  rating int,
  date varchar(100),
  summary varchar(500),
  body varchar(2000),
  recommend boolean,
  reported boolean,
  reviewer_name varchar(255),
  reviewer_email varchar(255),
  response varchar(255),
  helpfulness int
);

CREATE TABLE characteristics (
  id int PRIMARY KEY,
  product_id int,
  name varchar(255)
);

CREATE TABLE characteristicsreviews (
  id int,
  characteristic_id int,
  review_id int,
  value int
);
