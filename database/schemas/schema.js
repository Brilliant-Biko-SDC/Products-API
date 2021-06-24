const productSchema = new Schema({
  'product_id': {
    type: Number,
    unique: true,
  },
  'campus': String,
  'product_name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': String,
  'created_at': Date,
  'updated_at': {
    type: Date,
    default: Date.now,
  },
  'features': [
    {
      'feature': String,
      'value': String,
    },
  ],
  'related_products': [ // a nested array of references to Product documents
    'product_id': Number, // reference to a related Product document
    'product_id': Number, // reference to a different related Product document
    'product_id': Number,
    'product_id': Number,
    // etc
  ]
});

// Variant Data Model
const stylesSchema = new Schema({
  'style_id': {
    type: Number,
    unique: true,
  },
  'product_id': { // Reference to a Product document
    type: Number,
    unique: true,
  },
  'style_name': String,
  'original_price': Number,
  'sale_price': Number, // value cast to a Number or null
  'default?': Boolean,
  'photos': [
    {
      'thumbnail_url': String,
      'url': String,
    },
  ],
});

const skuSchema = new Schema({
  'sku_id': {
    type: Number,
    unique: true,
  },
  'style_id': { // Reference to a Styles document
    type: Number,
    unique: true,
  },
  'quantity': Number,
  'size': String,
})
