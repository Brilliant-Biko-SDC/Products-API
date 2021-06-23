CREATE DATABASE products;

USE products;

DROP TABLE IF EXISTS `product`, `related_product`, `feature`, `product_features`, `style`, `photo`, `sku`;

CREATE TABLE `product` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `campus` VARCHAR(10) NOT NULL,
  `product_name` VARCHAR(20) NOT NULL,
  `slogan` VARCHAR(120) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `default_price` DECIMAL(6,2) NOT NULL,
  `category` ENUM(
    'Backpack', 'Basketball Shoes', 'Boots', 'Cap', 'Coat', 'Dress Shoes', 'Dress', 'Hat', 'Heels', 'Hoodie', 'Jackets', 'Kicks', 'Pants', 'Romper', 'Shirt', 'Shoes', 'Shorts', 'Skirt', 'Slacks', 'Socks', 'Suit', 'Sunglasses', 'Sweater', 'Sweatpants', 'Tank Top', 'Trousers'
    ) NOT NULL,
  `created_at` DATE DEFAULT CURRENT_DATE,
  `updated_at` DATE DEFAULT CURRENT_DATE,

  PRIMARY KEY (`id`),
);

CREATE TABLE `related_product` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `related_product_id` SMALLINT NOT NULL,
  `product_id` SMALLINT NOT NULL,

  PRIMARY KEY (`id`),
  INDEX (`product_id`),

  FOREIGN KEY (`product_id`)
    REFERENCES product (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `feature` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `feature` ENUM(
    '5 Year Warranty', 'Buttons', 'Cut', 'Fabric', 'Fair Trade Certified', 'Frame', 'Frames', 'Green Leaf Certified', 'Lens', 'Lenses', 'Lifetime Guarantee', 'Material', 'Mid-Sole', 'Non-GMO', 'Satisfaction Guaranteed', 'Sole', 'Stitching', 'Sustainably Sourced', 'UV Protection'
    ) NOT NULL,
  `value` ENUM(
    '100% Cotton', '100% UV Protective', '80% Cotton', '95% Cotton', '99% Cotton 1% Elastic', 'AllLight Composition Resin', 'Armor Weave', 'Black Resin', 'Blue Resin', 'Brass', 'Canvas', 'Cashmere', 'Control Support Bridge', 'ControlSupport Arch Bridge', 'Cool Fit', 'Cross Stitch', 'Double Stitch', 'DuraResin', 'FullControl Skin', 'FullControlSkin', 'FullSupport Hybrid Compound', 'Ivory', 'LightCompose', 'Loose', 'Rubber Mesh', 'Rubber', 'Silk', 'Skinny', 'Straight', 'Striaght', 'Ultrasheen Basic', 'Ultrasheen Gold', 'Ultrasheen Silver', 'Ultrasheen', 'Velvet', 'White Resin', 'Wool'
    ) DEFAULT NULL,

  PRIMARY KEY (`id`),
);

CREATE TABLE `product_features` (
  `feature_id` SMALLINT NOT NULL,
  `product_id` SMALLINT NOT NULL,

  PRIMARY KEY (`feature_id`, `product_id`),
  INDEX (`product_id`, `feature_id`),
);

CREATE TABLE `style` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `style_name` VARCHAR(100) NOT NULL,
  `default_style` BOOL DEFAULT 0,
  `original_price` DECIMAL(6,2) NOT NULL,
  `sale_price` DECIMAL(6,2) DEFAULT NULL,
  `product_id` SMALLINT NOT NULL,

  PRIMARY KEY (`id`),
  INDEX (`product_id`),

  FOREIGN KEY (`product_id`)
    REFERENCES product (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `photo` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(250) NOT NULL,
  `thumbnail_url` VARCHAR(250) NOT NULL,
  `style_id` SMALLINT NOT NULL,

  PRIMARY KEY (`id`),
  INDEX (`style_id`),

  FOREIGN KEY (`style_id`)
    REFERENCES style (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `sku` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `quantity` SMALLINT NOT NULL,
  `size` ENUM(
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', 'One Size'
    ) NOT NULL,
  `style_id` SMALLINT NOT NULL,

  PRIMARY KEY(`id`),
  INDEX (`style_id`),

  FOREIGN KEY (`style_id`)
    REFERENCES style (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);
