DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

USE products;

DROP TABLE IF EXISTS product, related, features, styles, photos, skus;

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT NULL,
  slogan VARCHAR(120) DEFAULT NULL,
  description VARCHAR(500) DEFAULT NULL,
  category VARCHAR(30) DEFAULT NULL,
  default_price DECIMAL(11,2) DEFAULT 0,

  PRIMARY KEY (id)
);

CREATE TABLE related (
  id INT NOT NULL AUTO_INCREMENT,
  current_product_id INT DEFAULT NULL,
  related_product_id INT DEFAULT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE features (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT DEFAULT NULL,
  feature VARCHAR(30) DEFAULT NULL,
  value VARCHAR(30) DEFAULT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE styles (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT DEFAULT NULL,
  name VARCHAR(100) DEFAULT NULL,
  sale_price VARCHAR(20) DEFAULT NULL,
  original_price DECIMAL(11,2) DEFAULT NULL,
  default_style BOOL DEFAULT 0,

  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT DEFAULT NULL,
  url VARCHAR(500) DEFAULT NULL,
  thumbnail_url VARCHAR(500) DEFAULT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE skus (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT DEFAULT NULL,
  size VARCHAR(10) DEFAULT NULL,
  quantity SMALLINT DEFAULT NULL,

  PRIMARY KEY(id)
);

ALTER TABLE related ADD INDEX product_id_index (current_product_id);
ALTER TABLE features ADD INDEX product_id_index (product_id);
ALTER TABLE styles ADD INDEX product_id_index (product_id);
ALTER TABLE photos ADD INDEX style_id_index (style_id);
ALTER TABLE skus ADD INDEX style_id_index (style_id);

ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES product (id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (id);

LOAD DATA
  INFILE '../sdcdata/product.csv'
  INTO TABLE product
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA
  INFILE '../sdcdata/related.csv'
  INTO TABLE related
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA
  INFILE '../sdcdata/features.csv'
  INTO TABLE features
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA
  INFILE '../sdcdata/styles.csv'
  INTO TABLE styles
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA
  INFILE '../sdcdata/photos.csv'
  INTO TABLE photos
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

LOAD DATA
  INFILE '../sdcdata/skus.csv'
  INTO TABLE skus
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;
