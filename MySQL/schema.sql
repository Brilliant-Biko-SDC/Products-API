CREATE DATABASE products;

USE products;

DROP TABLE IF EXISTS `category`, `product`, `feature`, `product_features`, `style`, `photo`, `sku`;

CREATE TABLE `category` (
  `category_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `category` ENUM('Jackets', 'Pants', 'Kicks', 'Accessories') NOT NULL,

  PRIMARY KEY (`category_id`),
);

CREATE TABLE `product` (
  `product_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `campus` VARCHAR(10) NOT NULL,
  `product_name` VARCHAR(20) NOT NULL,
  `slogan` VARCHAR(120) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `default_price` DECIMAL(6,2) NOT NULL,
  `category_id` SMALLINT NOT NULL,
  `created_at` DATE DEFAULT CURRENT_DATE,
  `updated_at` DATE DEFAULT CURRENT_DATE,

  PRIMARY KEY (`product_id`),

  FOREIGN KEY (`category_id`)
    REFERENCES category (`category_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `feature` (
  `feature_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `feature` ENUM('Fabric', 'Buttons', 'Sole', 'Material') NOT NULL,
  `value` VARCHAR(50) DEFAULT NULL,

  PRIMARY KEY (`feature_id`),
);

CREATE TABLE `product_features` (
  `feature_id` SMALLINT NOT NULL,
  `product_id` SMALLINT NOT NULL,

  PRIMARY KEY (`feature_id`, `product_id`),
  INDEX (`product_id`, `feature_id`),
)

CREATE TABLE `style` (
  `style_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `style_name` VARCHAR(100) NOT NULL,
  `default?` BOOL DEFAULT 0,
  `original_price` DECIMAL(6,2) NOT NULL,
  `sale_price` DECIMAL(6,2) DEFAULT NULL,
  `product_id` SMALLINT NOT NULL,

  PRIMARY KEY (`style_id`),

  FOREIGN KEY (`product_id`)
    REFERENCES product (`product_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `photo` (
  `photo_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(250) NOT NULL,
  `thumbnail_url` VARCHAR(250) NOT NULL,
  `style_id` SMALLINT NOT NULL,

  PRIMARY KEY (`photo_id`),
  INDEX (`style_id`),

  FOREIGN KEY (`style_id`)
    REFERENCES style (`style_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `sku` (
  `sku_num` SMALLINT NOT NULL AUTO_INCREMENT,
  `quantity` TINYINT(7) NOT NULL,
  `size` ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5') NOT NULL,
  `style_id` SMALLINT NOT NULL,

  PRIMARY KEY(`sku_num`),

  FOREIGN KEY (`style_id`)
    REFERENCES style (`style_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);
